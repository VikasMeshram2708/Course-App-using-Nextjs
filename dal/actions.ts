"use server";

import prisma from "@/lib/prisma";
import { razorInstance } from "@/lib/razorpay";
import { purchaseCourseSchema, PurchaseCourseSchema } from "@/models";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function purchaseCourse(data: PurchaseCourseSchema) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }

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

    // Check if the user already has an order for this course
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId: user?.id,
        courseId: courseId,
      },
    });

    if (existingOrder) {
      if (existingOrder.status === "PAID") {
        return {
          success: false,
          message: "You have already purchased this course.",
        };
      } else {
        // Optionally return the pending Razorpay order again
        return {
          success: true,
          message: "Pending order found",
          order: {
            id: existingOrder.orderId,
            amount: existingOrder.amount,
            currency: existingOrder.currency,
            receipt: existingOrder.receipt,
          },
        };
      }
    }

    // Create Razorpay order
    const timestamp = Date.now();
    const receipt = `order_receipt_${timestamp}`;
    const orderResult = await razorInstance.orders.create({
      amount: Number(amount) * 100, // amount in paise (e.g., 50000 = ₹500)
      currency: "INR",
      receipt,
      notes: {
        courseTitle,
      },
    });

    // Save order to DB
    await prisma.order.create({
      data: {
        amount: amount,
        courseId,
        orderId: orderResult.id,
        receipt,
        currency: "INR",
        userId: user?.id,
        status: "PENDING",
      },
    });

    return {
      success: true,
      message: "Course purchase initiated",
      order: orderResult,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message:
        (e as Error).message ??
        "Something went wrong. Failed to purchase course.",
    };
  }
}
