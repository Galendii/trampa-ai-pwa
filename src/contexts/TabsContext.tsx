'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProviderProps {
  children: React.ReactNode;
  defaultTab: string;
}

export const TabsProvider: React.FC<TabsProviderProps> = ({
  children,
  defaultTab,
}) => {
  const [activeTab, setActiveTabState] = useState(defaultTab);

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabState(tabId);
  }, []);

  const value = {
    activeTab,
    setActiveTab,
  };

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};