import crypto from "crypto";
import prisma from "@/lib/prisma";

console.log("Webhook triggered");

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const razorpaySignature = req.headers.get("X-Razorpay-Signature") || "";
    const { WH_SECRET } = process.env;

    if (!WH_SECRET) {
      throw new Error("Webhook secret (WH_SECRET) is missing in environment.");
    }

    const expectedSignature = crypto
      .createHmac("sha256", WH_SECRET)
      .update(body)
      .digest("hex");

    if (razorpaySignature !== expectedSignature) {
      console.error("Invalid signature");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid Signature" }),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const razorOrderId = event.payload.payment.entity.order_id;

      // ✅ Fetch order details first
      const order = await prisma.order.findUnique({
        where: { orderId: razorOrderId },
      });

      if (order && order.status === "PENDING") {
        // ✅ Use transaction + upsert for safe enrollment
        await prisma.$transaction([
          prisma.order.update({
            where: { orderId: razorOrderId },
            data: { status: "PAID" },
          }),
          prisma.enrollment.upsert({
            where: {
              userId_courseId: {
                userId: order.userId as string,
                courseId: order.courseId,
              },
            },
            update: {}, // No update needed if already exists
            create: {
              userId: order.userId as string,
              courseId: order.courseId,
            },
          }),
        ]);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook Error:", e);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          e instanceof Error
            ? e.message
            : "Something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
