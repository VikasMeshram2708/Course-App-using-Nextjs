"use client";
import { SearchIcon } from "lucide-react";

import { Suspense, useEffect, useState } from "react";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/use-debounce";
import { courseSamples } from "@/data";
import CourseGalleryFallback from "./couse-gallery-fallback";
import CourseGallery from "./course-gallery";

export default function SearchCourse() {
  const [text, setText] = useState("");
  const [filteredCourse, setFilteredCourses] =
    useState<Course[]>(courseSamples);
  const debouncedQuery = useDebounce(text, 500);

  useEffect(() => {
    function filterCourses() {
      const filteredResult = courseSamples.filter((course) =>
        course.title
          .trim()
          .toLowerCase()
          .includes(debouncedQuery.trim().toLowerCase())
      );
      //   console.log("filteredResult", filteredResult);

      if (filteredResult.length > 0) {
        return setFilteredCourses(filteredResult);
      } else {
        return setFilteredCourses([]);
      }
    }
    if (debouncedQuery.length > 0) {
      filterCourses();
    } else {
      setFilteredCourses(courseSamples);
    }
  }, [debouncedQuery]);
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <div className="flex items-center w-full justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold font-serif text-center md:text-left">
          Explore Hand-Picked Free Courses
        </h2>
        <div className="relative w-full md:max-w-sm">
          <label htmlFor="course-search" className="sr-only">
            Search courses
          </label>
          <Input
            id="course-search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Search courses"
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-2 h-5 w-5" />
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Suspense fallback={<CourseGalleryFallback />}>
          {filteredCourse.map((course, idx) => (
            <CourseGallery course={course} key={idx} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
