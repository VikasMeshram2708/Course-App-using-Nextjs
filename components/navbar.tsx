import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Video } from "lucide-react";
import { ToggleMode } from "./ui/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return (
      <nav className="w-full border-b-2 shadow p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="flex items-center gap-x-2 text-xl sm:text-2xl lg:text-3xl font-sans">
            <Video size={36} />
            <Link href="/">Course App</Link>
          </h1>
          <div className="flex items-center gap-x-4">
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button variant={"link"}>Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button>Register</Button>
            </RegisterLink>
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Welcome Back</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutLink className="flex items-center gap-2">
                  <LogOut />
                  Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ToggleMode />
        </div>
      </div>
    </nav>
  );
}
