import { courseSamples } from "@/data";
import prisma from "@/lib/prisma";

async function seed() {
  await prisma.course.createMany({
    data: courseSamples,
  });
}

seed()
  .then(() => console.log("DB seeded"))
  .catch((e) =>
    console.log(
      "Seed Failed",
      (e as Error).message ?? "Something went wrong. Try again"
    )
  );
