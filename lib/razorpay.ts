import Razorpay from "razorpay";

const { RAZOR_API_ID, RAZOR_API_SECRET } = process.env;

if (!RAZOR_API_ID || !RAZOR_API_SECRET) {
  throw new Error("Paywall Env variables not found");
}

export const razorInstance = new Razorpay({
  key_id: RAZOR_API_ID,
  key_secret: RAZOR_API_SECRET,
});
