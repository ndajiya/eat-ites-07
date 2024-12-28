import { SimulatorDashboard } from "@/components/simulator/SimulatorDashboard";
import { useSimulatorState } from "@/hooks/useSimulatorState";
import { useSimulatorActions } from "@/hooks/useSimulatorActions";
import { useNewEntityState } from "@/hooks/useNewEntityState";
import { useEntityHandlers } from "@/hooks/useEntityHandlers";

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
      onCommodityEdit={handleCommodityEdit}
      onSecurityTrade={handleSecurityTrade}
      onAddAgent={handleAddAgent}
      onAddCommodity={handleAddCommodity}
      onAddSecurity={handleAddSecurity}
      setNewAgent={setNewAgent}
      setNewCommodity={setNewCommodity}
      onSecurityChange={handleSecurityChange}
    />
  );
};

export default Index;