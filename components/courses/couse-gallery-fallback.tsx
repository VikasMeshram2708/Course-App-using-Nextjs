import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CourseGalleryFallback() {
  return (
    <ul className="space-y-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={idx}>
          <CardContent>
            <div className="flex flex-wrap justify-between gap-4">
              <Skeleton className="w-[615px] h-[346px]" />
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-1/9 h-5" />
                </div>
                <div className="my-5 space-y-1">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-full h-5" />
                </div>
                <Skeleton className="w-1/4 h-5" />
                <div className="flex items-center gap-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={idx} className="w-full h-5" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </ul>
  );
}
