"use server";

import prisma from "@/lib/prisma";
import { razorInstance } from "@/lib/razorpay";
import { purchaseCourseSchema, PurchaseCourseSchema } from "@/models";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function purchaseCourse(data: PurchaseCourseSchema) {
  // Auth
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }

  // Sanitize the incoming data
  const parsed = purchaseCourseSchema.safeParse(data);
  if (!parsed.success) {
    const err = parsed.error.flatten().fieldErrors;
    const parseError =
      Object.values(err).flat().filter(Boolean)?.[0] ?? "Invalid input.";
    return {
      success: false,
      message: `Schema Validation Error - ${parseError}`,
    };
  }

  const { amount, courseId, courseTitle } = parsed.data;

  try {
    // find user if not exists store it
    const user = await getUser();
    // Upsert user
    await prisma.user.upsert({
      where: { tenantId: user?.id ?? "" },
      update: {
        email: user?.email ?? "",
        name: user?.given_name ?? "",
        picture: user?.picture ?? "",
      },
      create: {
        tenantId: user?.id ?? "",
        email: user?.email ?? "",
        name: user?.given_name ?? "",
        picture: user?.picture ?? "",
        role: "USER",
      },
    });

    // Create Order
    const timestamp = Date.now();
    const receipt = `order_receipt_${timestamp}`;
    const orderResult = await razorInstance.orders.create({
      amount: amount,
      currency: "INR",
      receipt,
      notes: {
        courseTitle,
      },
    });

    await prisma.order.create({
      data: {
        amount: amount,
        courseId: courseId,
        orderId: orderResult.id,
        receipt: receipt,
        currency: "INR",
        userId: user?.id,
        status: "PENDING",
      },
    });

    // Store the enrollment
    // await prisma.enrollment.create({
    //   data: {
    //     courseId: courseId ?? "",
    //     userId: user?.id ?? "",
    //   },
    // });

    return {
      success: true,
      message: "Course Purchased",
      order: orderResult,
    };
  } catch (e) {
    console.error(e);
    throw new Error(
      (e as Error).message ?? "Something went wrong. Failed to store user."
    );
  }
}
