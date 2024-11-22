import { SimulatorHeader } from "./SimulatorHeader";
import { SimulatorGrid } from "./SimulatorGrid";
import { StatsDashboard } from "./StatsDashboard";
import { CompetitorAnalysis } from "./CompetitorAnalysis";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";

interface SimulatorDashboardProps {
  agents: Agent[];
  commodities: Commodity[];
  securities: Security[];
  roundsHistory: RoundData[];
  newAgent: Omit<Agent, "lastRoundDifference">;
  newCommodity: Omit<Commodity, "priceTrend">;
  onSimulate: () => void;
  onAgentEdit: (agent: Agent) => void;
  onCommodityEdit: (commodity: Commodity) => void;
  onSecurityTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  onAddAgent: () => void;
  onAddCommodity: () => void;
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void;
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void;
}

export const SimulatorDashboard = ({
  agents,
  commodities,
  securities,
  roundsHistory,
  newAgent,
  newCommodity,
  onSimulate,
  onAgentEdit,
  onCommodityEdit,
  onSecurityTrade,
  onAddAgent,
  onAddCommodity,
  setNewAgent,
  setNewCommodity,
}: SimulatorDashboardProps) => {
  return (
    <div className="container mx-auto py-4 sm:py-8 max-w-7xl space-y-6 sm:space-y-8">
      <SimulatorHeader onSimulate={onSimulate} />
      <SimulatorGrid
        agents={agents}
        commodities={commodities}
        securities={securities}
        newAgent={newAgent}
        newCommodity={newCommodity}
        onAgentEdit={onAgentEdit}
        onCommodityEdit={onCommodityEdit}
        onSecurityTrade={onSecurityTrade}
        onAddAgent={onAddAgent}
        onAddCommodity={onAddCommodity}
        setNewAgent={setNewAgent}
        setNewCommodity={setNewCommodity}
      />
      <CompetitorAnalysis agents={agents} />
      {roundsHistory.length > 0 && (
        <StatsDashboard
          roundsHistory={roundsHistory}
          agents={agents}
          commodities={commodities}
        />
      )}
    </div>
  );
};