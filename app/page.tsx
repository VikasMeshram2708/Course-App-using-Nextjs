import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <Hero />
      </div>
    </div>
  );
}
