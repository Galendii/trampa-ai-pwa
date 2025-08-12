"use client";

import * as React from "react";
import { useState, createContext, useContext, useMemo } from "react";
import { cn } from "../../lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useTabs } from "@/contexts/TabsContext";

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  defaultValue: string;
  children: React.ReactNode;
}

const Root = ({ defaultValue, children, ...props }: TabsProps) => {
  const [currentTab, setCurrentTab] = useState(defaultValue);

  const contextValue = useMemo(
    () => ({
      currentTab,
      setCurrentTab,
    }),
    [currentTab]
  );

  return (
    <TabsPrimitive.Root defaultValue={defaultValue} {...props}>
      {children}
    </TabsPrimitive.Root>
  );
};

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  children: React.ReactNode;
}

const List = ({ className, ...props }: TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  children: React.ReactNode;
}

const Trigger = ({ className, children, ...props }: TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
);

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  children: React.ReactNode;
}

const Content = ({ className, children, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Content>
);

export default { Root, Content, List, Trigger };
