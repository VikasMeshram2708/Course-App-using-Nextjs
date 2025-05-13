import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us | ClipCourse",
  description:
    "Learn more about ClipCourse — our mission, values, and the team behind curated, practical YouTube learning experiences.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
        </p>

        <Separator className="mb-6" />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Who We Are</h2>
          <p>
            ClipCourse is a platform built for tech learners who want
            **real-world, no-fluff knowledge** — without wasting time. We curate
            YouTube videos under Creative Commons licenses and organize them
            into practical learning paths so you can get job-ready, faster.
          </p>
          <p>
            Our mission is simple: bring structure, clarity, and premium
            experience to freely available but scattered learning content — and
            present it in a way that respects creators and empowers learners.
          </p>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">Why ClipCourse?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>No bloated courses — just focused, relevant knowledge.</li>
            <li>Pay once, access curated video content anytime.</li>
            <li>Handpicked by devs, not algorithms.</li>
            <li>Designed with UX-first principles using modern web tech.</li>
          </ul>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">How It Works</h2>
          <p>
            We license and organize publicly available videos from YouTube
            (under Creative Commons) into structured course journeys. You pay
            for the experience — not the content. Your payment supports platform
            development, discovery, UI/UX, and ongoing curation.
          </p>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">Meet the Maker</h2>
          <p>
            ClipCourse was created by passionate developers who’ve faced the
            same challenges: trying to learn quickly, only to be buried under a
            sea of low-quality, ad-filled content. We're solving that.
          </p>
          <p>
            Have feedback or ideas? Email us at{" "}
            <a
              href="mailto:tumeshram108@gmail.com"
              className="underline underline-offset-2"
            >
              tumeshram108@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
