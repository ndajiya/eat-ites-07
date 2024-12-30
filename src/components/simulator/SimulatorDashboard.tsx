import { SimulationControls } from "./SimulationControls";
import { SimulatorGrid } from "./SimulatorGrid";
import { StatsDashboard } from "./StatsDashboard";
import { CompetitorAnalysis } from "./CompetitorAnalysis";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { EnvironmentalControls } from "./EnvironmentalControls";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const handleEnvironmentalFactorChange = (factor: string, value: number) => {
    toast({
      title: "Environmental Factor Updated",
      description: `${factor} has been set to ${value}%`,
    });
  };

  return (
    <div className="container mx-auto py-4 sm:py-8 max-w-7xl space-y-6 sm:space-y-8">
      <SimulationControls onSimulate={onSimulate} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          />
        </div>
        <div>
          <EnvironmentalControls onFactorChange={handleEnvironmentalFactorChange} />
        </div>
      </div>
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
  );
};