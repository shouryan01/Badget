import { currentUser } from "@clerk/nextjs";

import { dashboardConfig } from "@/config/dashboard";
import { normalizeUser } from "@/lib/utils";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import DashboardContainer from "@/components/dashboard/dashboardcontainer";
import { cookies } from "next/headers";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const clerkUser = await currentUser();
  const user = normalizeUser(clerkUser);

  const layout = cookies().get("react-resizable-panels:layout-accounts");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} items={dashboardConfig.mainNav} scroll={false} />
      <div className="flex-1">
        <DashboardContainer
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        >
          {children}
        </DashboardContainer>
      </div>
      <SiteFooter />
    </div>
  );
}
