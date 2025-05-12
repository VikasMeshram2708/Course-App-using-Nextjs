import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    // Auth Check
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const total = await prisma.course.count();

    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return new Response(
      JSON.stringify({
        success: true,
        meta: {
          data: courses,
          total: total,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  } catch (e) {
    console.error(e);
    throw new Response(
      JSON.stringify({
        success: false,
        message:
          (e as Error).message ?? "Something went wrong. Please try again",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
