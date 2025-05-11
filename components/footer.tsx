"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t pt-10 pb-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="flex items-center gap-x-2 text-xl sm:text-2xl lg:text-3xl font-sans">
            <Video size={36} />
            <Link href="/">Course App</Link>
          </h1>
          <div className="w-full md:w-1/2 max-w-md flex items-center space-x-2">
            <Input type="email" placeholder="Subscribe to our newsletter" />
            <Button variant="default">Subscribe</Button>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground border-t pt-4">
          &copy; {new Date().getFullYear()} Course App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
