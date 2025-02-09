
import { Agent, Commodity } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { AgentSection } from "./grid/AgentSection";
import { CommoditySection } from "./grid/CommoditySection";
import { SecuritiesSection } from "./grid/SecuritiesSection";

interface SimulatorGridProps {
  agents: Agent[];
  commodities: Commodity[];
  securities: Security[];
  newAgent: Omit<Agent, "lastRoundDifference">;
  newCommodity: Omit<Commodity, "priceTrend">;
  newSecurity: Omit<Security, "id">;
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: Commodity) => void;
  onSecurityTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  onAddAgent: () => void;
  onAddCommodity: () => void;
  onAddSecurity: () => void;
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void;
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void;
  onSecurityChange: (field: keyof Omit<Security, "id">, value: any) => void;
  onCommodityDelete: (commodityName: string) => void;
  onSecurityDelete: (securityId: string) => void;
}

export const SimulatorGrid = ({
  agents,
  commodities,
  securities,
  newAgent,
  newCommodity,
  newSecurity,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onSecurityTrade,
  onAddAgent,
  onAddCommodity,
  onAddSecurity,
  setNewAgent,
  setNewCommodity,
  onSecurityChange,
  onCommodityDelete,
  onSecurityDelete,
}: SimulatorGridProps) => {
  const handleAgentNameChange = (value: string) => {
    setNewAgent({
      ...newAgent,
      name: value
    });
  };

  const handleAgentCashChange = (value: number) => {
    setNewAgent({
      ...newAgent,
      cash: value
    });
  };

  const handleAgentClassChange = (value: string) => {
    setNewAgent({
      ...newAgent,
      class: value
    });
  };

  const handleCommodityNameChange = (value: string) => {
    setNewCommodity({
      ...newCommodity,
      name: value
    });
  };

  const handleCommodityPriceChange = (value: number) => {
    setNewCommodity({
      ...newCommodity,
      averagePrice: value
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <AgentSection
        agents={agents}
        newAgent={newAgent}
        onAgentEdit={onAgentEdit}
        onAgentDelete={onAgentDelete}
        onAddAgent={onAddAgent}
        onAgentNameChange={handleAgentNameChange}
        onAgentCashChange={handleAgentCashChange}
        onAgentClassChange={handleAgentClassChange}
      />
      
      <CommoditySection
        commodities={commodities}
        newCommodity={newCommodity}
        onCommodityEdit={onCommodityEdit}
        onAddCommodity={onAddCommodity}
        onCommodityNameChange={handleCommodityNameChange}
        onCommodityPriceChange={handleCommodityPriceChange}
        onDelete={onCommodityDelete}
      />

      <SecuritiesSection
        securities={securities}
        agents={agents}
        newSecurity={newSecurity}
        onSecurityTrade={onSecurityTrade}
        onAddSecurity={onAddSecurity}
        onSecurityChange={onSecurityChange}
        onDelete={onSecurityDelete}
      />
    </div>
  );
};
