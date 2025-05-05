import CourseGallery from "@/components/courses/course-gallery";
import CourseGalleryFallback from "@/components/courses/couse-gallery-fallback";

import { Input } from "@/components/ui/input";
import { courseSamples } from "@/data";
import { SearchIcon } from "lucide-react";
import { Suspense } from "react";

export default function CoursesPage() {
  return (
    <div className="min-h-screen w-full px-4 py-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold font-serif text-center md:text-left">
            Explore Hand-Picked Free Courses
          </h2>

          <div className="relative w-full md:max-w-sm">
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <Input
              id="course-search"
              type="text"
              placeholder="Search courses"
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5" />
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid gap-6">
          <Suspense fallback={<CourseGalleryFallback />}>
            {courseSamples.map((course, idx) => (
              <CourseGallery course={course} key={idx} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
