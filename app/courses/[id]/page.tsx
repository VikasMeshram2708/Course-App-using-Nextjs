import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { courseSamples } from "@/data";
import { ChevronLeft, TimerIcon } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DetailedPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return courseSamples.map((course) => ({ id: course?.id }));
}

export async function generateMetadata({
  params,
}: DetailedPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courseSamples.find((course) => course.id === id);

  return {
    title: course?.title,
    description: course?.description,
    keywords: course?.tags?.map((tag) => tag),
    openGraph: {
      title: course?.title,
      description: course?.description,
      images: course?.thumbnail,
    },
    creator: course?.creator,
    authors: [
      {
        name: course?.author,
        url: `https://www.youtube.com/${course?.author}`,
      },
    ],
  };
}

export default async function DetailedPage({ params }: DetailedPageProps) {
  const { id } = await params;

  const course = courseSamples.find((course) => course.id === id);

  if (!course) return notFound();

  return (
    <div className="min-h-screen w-full px-4 py-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Button variant="outline" asChild>
          <Link href="/courses">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </Button>

        {/* Video */}
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            src={course.embeddedUrl}
            title={course.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Attribution */}
        <div className="text-sm text-muted-foreground mt-2">
          Video by{" "}
          <Link
            href={`https://www.youtube.com/${course.author}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition"
          >
            {course.creator}
          </Link>{" "}
          on{" "}
          <Link
            href={course.embeddedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition"
          >
            YouTube
          </Link>
          . Licensed under{" "}
          <Link
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition"
          >
            CC BY 4.0
          </Link>
          .
        </div>

        {/* Title & Meta */}
        <div className="space-y-4">
          <Card className="rounded-2xl border">
            <CardContent className="p-6 space-y-4">
              <CardTitle className="text-2xl font-semibold leading-tight">
                {course.title}
              </CardTitle>

              <div className="flex items-center gap-3 text-sm">
                <TimerIcon className="h-4 w-4" />
                <span>Duration: {course.duration}</span>
              </div>

              {course.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
          </Card>

          {/* Description */}
          <Card className="rounded-2xl border">
            <CardContent className="p-6">
              <CardDescription className="text-base leading-relaxed">
                {course.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
