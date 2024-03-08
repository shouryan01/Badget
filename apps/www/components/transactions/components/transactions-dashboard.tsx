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
  Search,
  Settings,
  Sparkle,
  Sprout,
  Tag,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WorkspaceSwitcher } from "@/app/(dashboard)/dashboard/_components/workspace-switcher";

import { Mail } from "../data";
import { useMail } from "../use-mail";
import { AccountsReviewTable2 } from "./accounts-review-table2";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { Nav } from "./nav";
import { TransactionsDisplay } from "./transactions-display";

interface TransactionsDashboardProps {
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

export function TransactionsDashboard({
  accounts,
  mails,
  defaultLayout = [20, 20, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: TransactionsDashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout-transactions=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full max-h-[1200px] items-stretch"
    >
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Tabs defaultValue="all">
          <div className="flex h-[52px] items-center px-4 py-2">
            <h1 className="text-xl font-bold">Transactions</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                All transactions
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" className="m-0">
            {/* @ts-ignore */}
            <AccountsReviewTable2 mailId={undefined} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={mails.filter((item) => !item.read)} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <TransactionsDisplay
          mail={mails.find((item) => item.id === mail.selected) || null}
        />
        {/* <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          /> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
