import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MARKET_TABS } from "./marketTabs";

export const MarketTabsList = () => {
  return (
    <TabsList className="w-full justify-start border-b rounded-none h-12 bg-background">
      {MARKET_TABS.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};