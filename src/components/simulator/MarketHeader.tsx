import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { DataUploadDialog } from "./DataUploadDialog";

interface MarketHeaderProps {
  newAgent: Omit<Agent, "lastRoundDifference">;
  onAgentNameChange: (value: string) => void;
  onAgentCashChange: (value: number) => void;
  onAgentClassChange: (value: string) => void;
  onAddAgent: () => void;
  newCommodity: Omit<Commodity, "priceTrend">;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
  newSecurity: Omit<Security, "id">;
  onSecurityChange: (field: any, value: any) => void;
  onAddSecurity: () => void;
  onAgentUpload: (agents: Agent[]) => void;
  onCommodityUpload: (commodities: Commodity[]) => void;
  onSecurityUpload: (securities: Security[]) => void;
}

export const MarketHeader = ({
  newAgent,
  onAgentNameChange,
  onAgentCashChange,
  onAgentClassChange,
  onAddAgent,
  newCommodity,
  onCommodityNameChange,
  onCommodityPriceChange,
  onAddCommodity,
  newSecurity,
  onSecurityChange,
  onAddSecurity,
  onAgentUpload,
  onCommodityUpload,
  onSecurityUpload,
}: MarketHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Market Overview</h1>
      <div className="flex items-center gap-2">
        <DataUploadDialog
          onAgentUpload={onAgentUpload}
          onCommodityUpload={onCommodityUpload}
          onSecurityUpload={onSecurityUpload}
        />
      </div>
    </div>
  );
};