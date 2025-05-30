import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimerIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EnrollBtn from "./enroll-btn";
import { Course } from "@/types";

export default function CourseGallery({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden rounded-2xl transition-all hover:shadow-md p-0">
      <CardHeader className="p-0 relative aspect-video">
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          className="object-cover"
          fill
          sizes="100vw"
        />
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1 md:line-clamp-none">
            <Link
              href={`/courses/${course?.id}`}
              className="hover:underline text-foreground transition-colors"
            >
              {course.title}
            </Link>
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm justify-between">
          <div className="text-muted-foreground flex items-center gap-2">
            <TimerIcon className="w-4 h-4" />
            <span>Duration: {course.duration}</span>
          </div>
          <EnrollBtn
            courseTitle={course?.title}
            courseId={course?.id}
            courseAmount={course?.price}
          />
        </div>
      </CardContent>
    </Card>
  );
}
