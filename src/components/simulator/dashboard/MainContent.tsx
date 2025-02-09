
import { SimulatorGrid } from "../SimulatorGrid";
import { Agent, Commodity } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";

interface MainContentProps {
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

export const MainContent = ({
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
}: MainContentProps) => {
  return (
    <div className="lg:col-span-2">
      <SimulatorGrid
        agents={agents}
        commodities={commodities}
        securities={securities}
        newAgent={newAgent}
        newCommodity={newCommodity}
        newSecurity={newSecurity}
        onAgentEdit={onAgentEdit}
        onAgentDelete={onAgentDelete}
        onCommodityEdit={onCommodityEdit}
        onSecurityTrade={onSecurityTrade}
        onAddAgent={onAddAgent}
        onAddCommodity={onAddCommodity}
        onAddSecurity={onAddSecurity}
        setNewAgent={setNewAgent}
        setNewCommodity={setNewCommodity}
        onSecurityChange={onSecurityChange}
        onCommodityDelete={onCommodityDelete}
        onSecurityDelete={onSecurityDelete}
      />
    </div>
  );
};
