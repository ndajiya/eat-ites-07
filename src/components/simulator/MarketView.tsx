import { Agent, Commodity } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { DataUploadDialog } from "./DataUploadDialog";
import { MarketHeader } from "./MarketHeader";
import { MarketTabsList } from "./tabs/MarketTabsList";
import { MarketTabsContent } from "./tabs/MarketTabsContent";

interface MarketViewProps {
  agents: Agent[];
  commodities: Commodity[];
  securities: Security[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: Commodity) => void;
  onSecurityTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  newCommodity: Commodity;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
  newSecurity: Security;
  onSecurityChange: (field: string, value: any) => void;
  onAddSecurity: () => void;
}

export const MarketView = ({
  agents,
  commodities,
  securities,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onSecurityTrade,
  newCommodity,
  onCommodityNameChange,
  onCommodityPriceChange,
  onAddCommodity,
  newSecurity,
  onSecurityChange,
  onAddSecurity,
}: MarketViewProps) => {
  const handleAgentUpload = (uploadedAgents: any[]) => {
    uploadedAgents.forEach(agent => {
      onAgentEdit(agent);
    });
  };

  const handleCommodityUpload = (uploadedCommodities: any[]) => {
    uploadedCommodities.forEach(commodity => {
      onCommodityEdit(commodity);
    });
  };

  const handleSecurityUpload = (uploadedSecurities: any[]) => {
    uploadedSecurities.forEach(security => {
      onSecurityChange("new", security);
    });
  };

  return (
    <div className="space-y-4">
      <MarketHeader />
      <DataUploadDialog
        onAgentUpload={handleAgentUpload}
        onCommodityUpload={handleCommodityUpload}
        onSecurityUpload={handleSecurityUpload}
      />

      <Tabs defaultValue="firms" className="w-full">
        <MarketTabsList />
        <MarketTabsContent
          agents={agents}
          commodities={commodities}
          securities={securities}
          onAgentEdit={onAgentEdit}
          onAgentDelete={onAgentDelete}
          onCommodityEdit={onCommodityEdit}
          onSecurityTrade={onSecurityTrade}
        />
      </Tabs>
    </div>
  );
};