"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "./sidebar";
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardContainerProps {
  children: React.ReactNode;
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export default function DashboardContainer({
  children,
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardContainerProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout-accounts=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <Sidebar
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
        <ResizableHandle withHandle />
        <ResizablePanel>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
