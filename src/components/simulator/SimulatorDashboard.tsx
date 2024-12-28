import { SimulationControls } from "./SimulationControls";
import { SimulatorGrid } from "./SimulatorGrid";
import { StatsDashboard } from "./StatsDashboard";
import { CompetitorAnalysis } from "./CompetitorAnalysis";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";

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
    <div className="min-h-screen bg-gradient-to-br from-mint-50/50 via-background to-mint-50/50 dark:from-background dark:via-mint-900/5 dark:to-background">
      <div className="container mx-auto py-4 sm:py-8 space-y-6 sm:space-y-8 px-4 sm:px-6">
        <SimulationControls onSimulate={onSimulate} />
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
        />
        <CompetitorAnalysis agents={agents} />
        {roundsHistory.length > 0 && (
          <>
            <PerformanceMonitor roundsHistory={roundsHistory} />
            <StatsDashboard
              roundsHistory={roundsHistory}
              agents={agents}
              commodities={commodities}
            />
          </>
        )}
      </div>
    </div>
  );
};