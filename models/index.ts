import * as z from "zod";

export const purchaseCourseSchema = z.object({
  courseId: z.string().min(1, { message: "Course Id is required" }),
  amount: z.string().min(1, { message: "Amount Id is required" }),
  courseTitle: z.string().min(1, { message: "Course Title is required" }),
});

export type PurchaseCourseSchema = z.infer<typeof purchaseCourseSchema>;
