import {
  Calendar,
  Home,
  LogOut,
  PersonStanding,
  Search,
  Settings,
  Video,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: PersonStanding,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="flex items-center gap-x-2 text-base sm:text-lg font-sans">
              <Video size={24} />
              <Link href="/">Course App</Link>
            </h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button className="" variant={"destructive"}>
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
