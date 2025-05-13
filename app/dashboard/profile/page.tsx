import ProfileSummary from "@/components/dashboard/profile-summary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { LogOut, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

export default async function DashboardProfile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return notFound();

  const dbUser = await prisma.user.findUnique({
    where: {
      tenantId: user.id,
    },
  });

  // Use fallback values from Kinde if dbUser is not available
  const displayName = dbUser?.name ?? user?.given_name ?? "Anonymous";
  const email = user?.email ?? "No email provided";

  const joinedDate = dbUser?.createdAt
    ? new Date(dbUser.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen space-y-5">
      <Card className="w-full shadow-xl">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20 border">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.given_name as string
              )}&background=random&color=fff&rounded=true&bold=true`}
              alt={user?.given_name as string}
            />
            <AvatarFallback>
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-center text-xl font-semibold capitalize">
            {displayName}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Badge variant="secondary" className="gap-2">
            <Mail className="w-4 h-4" />
            {email}
          </Badge>
        </CardContent>

        <CardFooter className="justify-center">
          {joinedDate ? (
            <Badge variant="outline">Joined on: {joinedDate}</Badge>
          ) : (
            <Badge variant="outline">New User</Badge>
          )}
          {/* Summary section */}
        </CardFooter>
      </Card>
      <ProfileSummary />
      <LogoutLink>
        <Button variant={"destructive"} size={"lg"}>
          <LogOut />
          Logout
        </Button>
      </LogoutLink>
    </div>
  );
}
