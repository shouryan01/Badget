"use client";

import * as React from "react";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AddAssetButton } from "@/components/buttons/AddAssetButton";
import { AddRealEstateButton } from "@/components/buttons/AddRealEstateButton";

import { Mail } from "../data";
import { useMail } from "../use-mail";
import { CardsStats } from "./stats";
import { TopCategoriesTable } from "./top-categories-table";
import { TransactionsReviewTable } from "./transaction-review-table";

interface DashboardProps {
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

export function Dashboard({
  accounts,
  mails,
}: DashboardProps) {
  const [mail] = useMail();

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <ScrollArea className="h-fit min-h-screen">
          <div className="flex h-[52px] items-center justify-between px-4 py-2">
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <AddAssetButton />
              <AddRealEstateButton />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-4 p-4">
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form></form>
            </div>
            <CardsStats />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              <TransactionsReviewTable />
              <TopCategoriesTable />
            </div>
          </div>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
