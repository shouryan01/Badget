"use client";

import * as React from "react";
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

import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopCategoriesTable } from "@/components/new-dashboard/components/top-categories-table";
import { CategoriesTable } from "@/components/recurring/components/allocation-table";
import { CategoriesDisplay } from "@/components/recurring/components/categories-display";
import { Investmentcards } from "@/components/recurring/components/investment-cards";
import { RecurringSpentSoFarCard } from "@/components/recurring/components/total-balance-card";
import { mails } from "@/components/recurring/data";
import { RecurringTableNext } from "@/components/transactions/components/allocation-table-next";
import { Nav } from "@/components/transactions/components/nav";
import { Mail } from "@/components/transactions/data";
import { useMail } from "@/components/transactions/use-mail";
import { WorkspaceSwitcher } from "@/app/(dashboard)/dashboard/_components/workspace-switcher";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function RecurringDashboard({
  accounts,
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout-recurring=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full max-h-[1200px] items-stretch"
    >
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {/* <Separator /> */}
        <RecurringSpentSoFarCard />
        <div>
          {/* <SmallInvestmentCard /> */}
          <CategoriesTable />
          <RecurringTableNext />
          {/* <HoldingsTable /> */}
        </div>
        <div>
          <Investmentcards items={mails} />
        </div>
        <TopCategoriesTable />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <CategoriesDisplay
          mail={mails.find((item) => item.id === mail.selected) || null}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
