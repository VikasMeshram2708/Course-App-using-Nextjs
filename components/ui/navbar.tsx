import Link from "next/link";
import { Button } from "./button";
import { Video } from "lucide-react";
import { ToggleMode } from "./toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function Navbar() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return (
      <nav className="w-full border-b-2 shadow p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="flex items-center gap-x-2 text-xl sm:text-2xl lg:text-3xl font-sans">
            <Video size={36} />
            <Link href="/">Course App</Link>
          </h1>
          <div className="flex items-center gap-x-4">
            <Button variant={"link"}>Login</Button>
            <Button>Register</Button>
            <ToggleMode />
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="w-full border-b-2 shadow p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="flex items-center gap-x-2 text-xl sm:text-2xl lg:text-3xl font-sans">
          <Video size={36} />
          <Link href="/">Course App</Link>
        </h1>
        <div className="flex items-center gap-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <ToggleMode />
        </div>
      </div>
    </nav>
  );
}
