/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-5 py-20 md:py-28">
      <div className="text-center">
        {/* Badge */}
        <span className="inline-block text-black px-4 py-2 mb-6 rounded-full bg-gray-100 text-sm font-medium border border-gray-200">
          🚀 No Signups • No Payments
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          The{" "}
          <span className="underline decoration-blue-400 decoration-4">
            Shortcut
          </span>{" "}
          to
          <br />
          Practical Tech Skills
        </h1>

        {/* Subhead */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
          Only the most effective free courses – filtered by industry pros so
          you {"don't"}waste time on fluff.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
          <Button
            size={"lg"}
            className="rounded cursor-pointer"
            variant={"outline"}
          >
            <Link href="/courses">
              Browse Courses
              <span className="ml-2">→</span>
            </Link>
          </Button>
          <Button size={"lg"} className="rounded cursor-pointer">
            Why Our Picks?
          </Button>
        </div>

        {/* Social Proof */}
        <div className="inline-flex items-center bg-gray-50 px-5 py-3 rounded-full border border-gray-200">
          <div className="flex -space-x-3 mr-3">
            {[
              "https://i.pravatar.cc/150?img=1",
              "https://i.pravatar.cc/150?img=5",
              "https://i.pravatar.cc/150?img=11",
              "https://i.pravatar.cc/150?img=7",
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="User avatar"
                className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-gray-700">
            Trusted by <strong>14,000+</strong> developers
          </span>
        </div>
      </div>
    </section>
  );
}
