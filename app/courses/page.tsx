import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { courseSamples } from "@/data";
import { EllipsisVertical, SearchIcon, Share2, TimerIcon } from "lucide-react";

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
          {courseSamples.map((course, idx) => (
            <Card key={idx} className="overflow-hidden rounded-2xl border">
              <CardContent>
                <div className="flex flex-col md:flex-row">
                  {/* Video */}
                  <div className="md:w-1/2 w-full">
                    <div className="aspect-video w-full">
                      <iframe
                        src={course.embededUrl}
                        title={course.title}
                        className="w-full h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="md:w-1/2 w-full flex flex-col justify-between">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-semibold">
                          {course.title}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-1 rounded hover:bg-accent">
                            <EllipsisVertical className="h-5 w-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2">
                              <Share2 className="h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <CardDescription className="text-sm leading-relaxed">
                        {course.description}
                      </CardDescription>

                      <div className="flex items-center gap-2 text-sm">
                        <TimerIcon className="w-4 h-4" />
                        <span>Duration: {course.duration}</span>
                      </div>

                      {course.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {course.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-xs rounded-full border"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
