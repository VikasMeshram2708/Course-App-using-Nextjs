"use server";

import { razorInstance } from "@/lib/razorpay";

export async function purchaseCourse({
  amount,
  courseTitle,
}: {
  amount: number;
  courseTitle: string;
}) {
  // console.log("incd", amount);

  if (!amount) return;

  const options = {
    amount: amount, // amount in subunit
    currency: "INR",
    receipt: `order_receipt_${Date.now()}`,
    notes: {
      courseTitle,
    },
  };

  try {
    const result = await razorInstance.orders.create(options);

    // console.log("res", JSON.stringify(result));

    return {
      success: true,
      message: "Course Purchased",
      order: result,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message:
        (e as Error).message ?? "Something went wrong. Please try again.",
    };
  }
}
