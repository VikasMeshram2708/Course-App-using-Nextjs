"use client";
import React from "react";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

export default function ShareBtn({ courseId }: { courseId: string }) {
  function handleShare() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    console.log("baseUrl", baseUrl);
    const courseUrl = `${baseUrl}/courses/${courseId}`;
    window.navigator.clipboard.writeText(courseUrl);
    alert("Link Copied!");
    return;
  }
  return (
    <Button onClick={handleShare} variant={"ghost"} className="w-full">
      <Share2 />
      Share
    </Button>
  );
}
