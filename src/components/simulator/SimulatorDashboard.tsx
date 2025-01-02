import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { MainContent } from "./dashboard/MainContent";
import { AnalyticsSection } from "./dashboard/AnalyticsSection";

interface SimulatorDashboardProps {
  agents: Agent[];
  commodities: Commodity[];
  securities: Security[];
  roundsHistory: RoundData[];
  newAgent: Omit<Agent, "lastRoundDifference">;
  newCommodity: Omit<Commodity, "priceTrend">;
  newSecurity: Omit<Security, "id">;
  onSimulate: () => Promise<void>;
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
}

export const SimulatorDashboard = ({
  agents,
  commodities,
  securities,
  roundsHistory,
  newAgent,
  newCommodity,
  newSecurity,
  onSimulate,
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
}: SimulatorDashboardProps) => {
  return (
    <div className="container mx-auto py-4 sm:py-8 max-w-7xl space-y-6 sm:space-y-8">
      <DashboardHeader onSimulate={onSimulate} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MainContent
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
        />
      </div>
      <AnalyticsSection
        agents={agents}
        commodities={commodities}
        roundsHistory={roundsHistory}
      />
    </div>
  );
};