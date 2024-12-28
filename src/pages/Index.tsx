import { useToast } from "@/components/ui/use-toast";
import { SimulatorDashboard } from "@/components/simulator/SimulatorDashboard";
import { useSimulatorState } from "@/hooks/useSimulatorState";
import { useSimulatorActions } from "@/hooks/useSimulatorActions";
import { useNewEntityState } from "@/hooks/useNewEntityState";
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { Bookkeeping } from "@/utils/Bookkeeping";

const Index = () => {
  const { toast } = useToast();
  
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

  const handleAgentEdit = (updatedAgent: Agent) => {
    setAgents(agents.map(agent => 
      agent.name === updatedAgent.name ? updatedAgent : agent
    ));
    toast({
      title: "Agent Updated",
      description: `${updatedAgent.name} has been updated successfully.`,
    });
  };

  const handleCommodityEdit = (updatedCommodity: Commodity) => {
    setCommodities(commodities.map(commodity => 
      commodity.name === updatedCommodity.name ? updatedCommodity : commodity
    ));
    toast({
      title: "Commodity Updated",
      description: `${updatedCommodity.name} has been updated successfully.`,
    });
  };

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.class) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const agent: Agent = {
      ...newAgent,
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
    };

    setAgents([...agents, agent]);
    setNewAgent({ name: "", cash: 1000, class: "", bookkeeping: new Bookkeeping(), inventory: [], production: [] });
    toast({
      title: "Agent Added",
      description: `${agent.name} has been added successfully.`,
    });
  };

  const handleAddCommodity = () => {
    if (!newCommodity.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const commodity: Commodity = {
      ...newCommodity,
      priceTrend: "Up",
    };

    setCommodities([...commodities, commodity]);
    setNewCommodity({ 
      name: "", 
      averagePrice: 0,
      class: "Hard",
      type: "Industrial",
      marketType: "Spot"
    });
    toast({
      title: "Commodity Added",
      description: `${commodity.name} has been added successfully.`,
    });
  };

  const handleAddSecurity = () => {
    if (!newSecurity.name || !newSecurity.issuer) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const security: Security = {
      ...newSecurity,
      id: (securities.length + 1).toString(),
    };

    setSecurities([...securities, security]);
    setNewSecurity({
      name: "",
      class: "Equity",
      type: "CommonStock",
      price: 0,
      volatility: 0.3,
      quantity: 0,
      issuer: "",
      description: "",
    });

    toast({
      title: "Security Added",
      description: `${security.name} has been added successfully.`,
    });
  };

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