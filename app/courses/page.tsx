import CourseWrapper from "@/components/courses/course-wrapper";
import prisma from "@/lib/prisma";
export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return (
    <div className="min-h-screen w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <CourseWrapper courses={courses} />
      </div>
    </div>
  );
}
