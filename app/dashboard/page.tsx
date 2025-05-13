import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PlayCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return notFound();

  // Step 1: Get all paid orders
  const paidOrders = await prisma.order.findMany({
    where: {
      status: "PAID",
      userId: user.id,
    },
    select: {
      courseId: true,
    },
  });

  const courseIds = paidOrders.map((order) => order.courseId);

  // Step 2: Get the course details using those IDs
  const purchasedCourses = await prisma.course.findMany({
    where: {
      id: { in: courseIds },
    },
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {purchasedCourses.length < 1 ? (
          <p>
            You have not purchased any courses yet.{" "}
            <Link href="/courses" className="underline text-blue-600">
              Browse Courses
            </Link>
          </p>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Your Purchased Courses
              </h2>
              <div className="relative">
                <Search className="absolute top-2 left-2.5 w-5 h-5" />
                <Input
                  className="w-96 pl-8.5"
                  placeholder="Search Course Name"
                />
              </div>
            </div>
            <ul className="grid gap-4 grid-cols-2">
              {purchasedCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent>
                    <div className="relative aspect-video">
                      <Image
                        fill
                        sizes="100vw"
                        src={course?.thumbnail}
                        alt={course?.title}
                        className="bg-primary-foreground object-cover bg-contain rounded-lg"
                      />
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link href={`/courses/${course?.id}`}>
                        <PlayCircle />
                        Start
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
