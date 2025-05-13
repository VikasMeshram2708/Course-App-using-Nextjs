import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProfileSummary() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return notFound();

  const [paidCount, pendingCount] = await Promise.all([
    prisma.order.count({
      where: {
        userId: user.id,
        status: "PAID",
      },
    }),
    prisma.order.count({
      where: {
        userId: user.id,
        status: "PENDING",
      },
    }),
  ]);

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-muted-foreground">
          Course Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <Tabs defaultValue="purchased" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="purchased">Purchased</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="purchased">
            <div className="text-3xl font-semibold text-foreground">
              {paidCount}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Successfully purchased courses
            </p>
          </TabsContent>

          <TabsContent value="pending">
            <div className="text-3xl font-semibold text-foreground">
              {pendingCount}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Courses awaiting payment or confirmation
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
