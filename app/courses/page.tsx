import SearchCourse from "@/components/courses/search-course";
export default function CoursesPage() {
  return (
    <div className="min-h-screen w-full px-4 py-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        {/* Search Bar */}
        <SearchCourse />
      </div>
    </div>
  );
}
