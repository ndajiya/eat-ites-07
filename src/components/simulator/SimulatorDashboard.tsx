import { useState } from "react";
import { SimulatorHeader } from "./SimulatorHeader";
import { SimulatorGrid } from "./SimulatorGrid";
import { StatsDashboard } from "./StatsDashboard";
import { CompetitorAnalysis } from "./CompetitorAnalysis";
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
  onCommodityEdit,
  onSecurityTrade,
  onAddAgent,
  onAddCommodity,
  onAddSecurity,
  setNewAgent,
  setNewCommodity,
  onSecurityChange,
}: SimulatorDashboardProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();

  const handleSimulate = async () => {
    try {
      setIsSimulating(true);
      await onSimulate();
      toast({
        title: "Simulation Complete",
        description: "The market has been updated with new data.",
      });
    } catch (error) {
      toast({
        title: "Simulation Failed",
        description: "An error occurred during simulation.",
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="container mx-auto py-4 sm:py-8 max-w-7xl space-y-6 sm:space-y-8">
      <SimulatorHeader onSimulate={handleSimulate} isSimulating={isSimulating} />
      <SimulatorGrid
        agents={agents}
        commodities={commodities}
        securities={securities}
        newAgent={newAgent}
        newCommodity={newCommodity}
        newSecurity={newSecurity}
        onAgentEdit={onAgentEdit}
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
        <StatsDashboard
          roundsHistory={roundsHistory}
          agents={agents}
          commodities={commodities}
        />
      )}
    </div>
  );
};