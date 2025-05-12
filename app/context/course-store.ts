// import { Course } from "@/types";
// import { create } from "zustand";

// interface CourseResponse {
//   meta: {
//     data: Course[];
//     total: number;
//   };
// }
// type CourseProps = {
//   getCourses: () => Promise<CourseResponse>;
// };
// export const courseStore = create<CourseProps>(() => ({
//   getCourses: async () => {
//     try {
//       const response = await fetch("/api/courses");
//       if (!response.ok) {
//         throw new Error("Failed to fetch the courses");
//       }
//       return response.json();
//     } catch (e) {
//       console.error(
//         (e as Error).message ?? "Something went wrong. Please try again."
//       );
//     }
//   },
// }));
