
import { SimulatorDashboard } from "@/components/simulator/SimulatorDashboard";
import { useSimulatorState } from "@/hooks/useSimulatorState";
import { useSimulatorActions } from "@/hooks/useSimulatorActions";
import { useNewEntityState } from "@/hooks/useNewEntityState";
import { useEntityHandlers } from "@/hooks/useEntityHandlers";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketView } from "@/components/simulator/MarketView";

const Dashboard = () => {
  const {
    agents,
    setAgents,
    commodities,
    setCommodities,
    securities,
    setSecurities
  } = useSimulatorState('BACHELORS');

  const {
    roundsHistory,
    simulateNewRound,
    handleSecurityTrade
  } = useSimulatorActions(agents, setAgents, commodities, setCommodities, securities, setSecurities);

  const {
    newAgent,
    setNewAgent,
    newCommodity,
    setNewCommodity,
    newSecurity,
    setNewSecurity,
    handleSecurityChange
  } = useNewEntityState();

  const {
    handleAgentEdit,
    handleAgentDelete,
    handleCommodityEdit,
    handleAddAgent,
    handleAddCommodity,
    handleAddSecurity,
    handleCommodityDelete,
    handleSecurityDelete,
  } = useEntityHandlers(
    setAgents,
    setCommodities,
    setSecurities,
    setNewAgent,
    setNewCommodity,
    setNewSecurity
  );

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Link to="/docs" className="absolute top-4 left-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Documentation
        </Button>
      </Link>
      <div className="container mx-auto pt-16">
        <MarketView 
          agents={agents}
          commodities={commodities}
          securities={securities}
          onAgentEdit={handleAgentEdit}
          onAgentDelete={handleAgentDelete}
          onCommodityEdit={handleCommodityEdit}
          onSecurityTrade={handleSecurityTrade}
          newCommodity={newCommodity}
          onCommodityNameChange={(value) => setNewCommodity({ ...newCommodity, name: value })}
          onCommodityPriceChange={(value) => setNewCommodity({ ...newCommodity, averagePrice: value })}
          onAddCommodity={handleAddCommodity}
          newSecurity={newSecurity}
          onSecurityChange={handleSecurityChange}
          onAddSecurity={handleAddSecurity}
          onCommodityDelete={handleCommodityDelete}
          onSecurityDelete={handleSecurityDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
