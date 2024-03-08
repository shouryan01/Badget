import {
  BadgeDollarSign,
  BarChart,
  Briefcase,
  Building,
  CreditCard,
  DollarSign,
  HelpCircle,
  Layers,
  LayoutDashboard,
  PiggyBank,
  Repeat2,
  Settings,
  Sparkle,
  Sprout,
  Tag,
  Wallet,
} from "lucide-react";
import { WorkspaceSwitcher } from "@/app/(dashboard)/dashboard/_components/workspace-switcher";
import { Separator } from "../ui/separator";
import { Nav } from "./nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  defaultLayout: number[];
  defaultCollapsed: boolean;
  navCollapsedSize: number;
}

export default function Sidebar({
  defaultLayout = [20, 40, 40],
  defaultCollapsed,
  navCollapsedSize,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <>
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={(collapsed) => {
          setIsCollapsed(collapsed);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            collapsed,
          )}`;
        }}
        className={cn(
          isCollapsed &&
          "min-w-[50px] transition-all duration-300 ease-in-out",
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center px-2",
            isCollapsed ? "h-[52px]" : "px-2",
          )}
        >
          <WorkspaceSwitcher isCollapsed={isCollapsed} />
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Dashboard",
              label: "",
              icon: LayoutDashboard,
              link: "/dashboard",
            },
            {
              title: "Transactions",
              label: "9",
              icon: Layers,
              link: "/dashboard/transactions",
            },
            {
              title: "Accounts",
              label: "3",
              icon: CreditCard,
              link: "/dashboard/accounts",
            },
            {
              title: "Investments",
              label: "",
              icon: BarChart,
              link: "/dashboard/investments",
            },
            {
              title: "Categories",
              label: "",
              icon: Tag,
              link: "/dashboard/categories",
            },
            {
              title: "Recurring",
              label: "",
              icon: Repeat2,
              link: "/dashboard/recurring",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Ai Magic",
              label: "",
              icon: Sparkle,
              link: "/dashboard/aimagic",
            },
            {
              title: "Save Money",
              label: "",
              icon: Wallet,
              link: "/dashboard/savemoney",
            },
            {
              title: "Grow Assets",
              label: "",
              icon: Sprout,
              link: "/dashboard/",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Credit Card",
              label: "972",
              icon: CreditCard,
              link: "/dashboard/",
            },
            {
              title: "Credit Card",
              label: "342",
              icon: CreditCard,
              link: "/dashboard/",
            },
            {
              title: "Checking",
              label: "128",
              icon: DollarSign,
              link: "/dashboard/",
            },
            {
              title: "Savings",
              label: "8",
              icon: PiggyBank,
              link: "/dashboard/",
            },
            {
              title: "Banking",
              label: "21",
              icon: Building,
              link: "/dashboard/",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Funds",
              label: "483",
              icon: Briefcase,
              link: "/dashboard/",
            },
            {
              title: "Coinbase",
              label: "145",
              icon: BadgeDollarSign,
              link: "/dashboard/",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Get help",
              label: "",
              icon: HelpCircle,
              link: "/dashboard/",
            },
            {
              title: "Settings",
              label: "",
              icon: Settings,
              link: "/dashboard/settings",
            },
          ]}
        />
      </ResizablePanel>
    </>
  )
}
