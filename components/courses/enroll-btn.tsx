"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IndianRupee } from "lucide-react";
import { purchaseCourse } from "@/dal/actions";
import Script from "next/script";

type EnrollBtnProps = {
  courseTitle: string;
  courseId: string;
  courseAmount: string;
};
export default function EnrollBtn({
  courseId,
  courseAmount,
  courseTitle,
}: EnrollBtnProps) {
  // console.log("cid", courseId);
  async function handleOrder() {
    try {
      const purchaseOptions = {
        courseId: courseId,
        amount: courseAmount.toString(),
        courseTitle: courseTitle,
      };
      const result = await purchaseCourse(purchaseOptions);
      // console.log("client-res", JSON.stringify(result));
      if (!result?.order?.id) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: "rzp_test_9hemX97P9JpPzr",
        amount: Number(result.order.amount) * 100,
        currency: result.order.currency,
        name: "Course Enrollment",
        description: courseTitle,
        order_id: result.order.id,
        handler: function (response: any) {
          // console.log("razor-pay-res", response);
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "Vikas Meshram",
          email: "vikas@gmail.com",
          contact: "9898989898",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      alert((e as Error).message ?? "Something went wrong. Please try again.");
      return;
    }
  }
  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>Enroll</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Course Enrollment</DialogTitle>
          <Button onClick={handleOrder}>
            <span className="flex items-center gap-1">
              <IndianRupee />
              {courseAmount}
            </span>
            Pay Now
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
