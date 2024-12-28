import { SimulatorDashboard } from "@/components/simulator/SimulatorDashboard";
import { useSimulatorState } from "@/hooks/useSimulatorState";
import { useSimulatorActions } from "@/hooks/useSimulatorActions";
import { useNewEntityState } from "@/hooks/useNewEntityState";
import { useEntityHandlers } from "@/hooks/useEntityHandlers";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const {
    agents,
    setAgents,
    commodities,
    setCommodities,
    securities,
    setSecurities
  } = useSimulatorState();

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
  } = useEntityHandlers(
    setAgents,
    setCommodities,
    setSecurities,
    setNewAgent,
    setNewCommodity,
    setNewSecurity
  );

  return (
    <div className="relative">
      <ThemeToggle />
      <SimulatorDashboard
        agents={agents}
        commodities={commodities}
        securities={securities}
        roundsHistory={roundsHistory}
        newAgent={newAgent}
        newCommodity={newCommodity}
        newSecurity={newSecurity}
        onSimulate={simulateNewRound}
        onAgentEdit={handleAgentEdit}
        onAgentDelete={handleAgentDelete}
        onCommodityEdit={handleCommodityEdit}
        onSecurityTrade={handleSecurityTrade}
        onAddAgent={handleAddAgent}
        onAddCommodity={handleAddCommodity}
        onAddSecurity={handleAddSecurity}
        setNewAgent={setNewAgent}
        setNewCommodity={setNewCommodity}
        onSecurityChange={handleSecurityChange}
      />
    </div>
  );
};

export default Index;