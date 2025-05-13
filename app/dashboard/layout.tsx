import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashboardBreadcrumb from "@/components/dashboard/dashboard-breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />
      <div className="w-screen flex flex-col min-h-screen p-5">
        {/* Main Content */}
        {/* Sidebar Trigger */}

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </div>
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
