import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SimulatorHeader } from "@/components/simulator/SimulatorHeader";
import { SimulatorGrid } from "@/components/simulator/SimulatorGrid";
import { StatsDashboard } from "@/components/simulator/StatsDashboard";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Bookkeeping } from "@/utils/Bookkeeping";

const Index = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([
    { 
      name: "Agent1", 
      cash: 1000, 
      class: "ClassA", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping()
    },
    { 
      name: "Agent2", 
      cash: 800, 
      class: "ClassB", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping()
    },
  ]);

  const [commodities, setCommodities] = useState<Commodity[]>([
    { name: "Commodity1", averagePrice: 50, priceTrend: "Up" as const },
    { name: "Commodity2", averagePrice: 30, priceTrend: "Down" as const },
  ]);

  const [roundsHistory, setRoundsHistory] = useState<RoundData[]>([]);
  const [currentRound, setCurrentRound] = useState(1);

  const [newAgent, setNewAgent] = useState<Omit<Agent, "lastRoundDifference">>({
    name: "",
    cash: 1000,
    class: "",
    bookkeeping: new Bookkeeping(),
  });

  const [newCommodity, setNewCommodity] = useState<Omit<Commodity, "priceTrend">>({
    name: "",
    averagePrice: 0,
  });

  const simulateRound = () => {
    const updatedAgents = agents.map((agent) => {
      const cashChange = Math.floor(Math.random() * 201) - 100;
      const newCash = agent.cash + cashChange;
      
      // Record the transaction in the agent's books
      agent.bookkeeping.addTransaction(
        new Date().toISOString().split('T')[0],
        cashChange >= 0 ? "Revenue" : "Expenses",
        cashChange >= 0 ? "Trading Income" : "Trading Expenses",
        Math.abs(cashChange),
        `Round ${currentRound} trading result`,
        "Increase"
      );

      // Update cash balance
      agent.bookkeeping.addTransaction(
        new Date().toISOString().split('T')[0],
        "Assets",
        "Cash",
        Math.abs(cashChange),
        `Round ${currentRound} cash adjustment`,
        cashChange >= 0 ? "Increase" : "Decrease"
      );

      return {
        ...agent,
        cash: newCash,
        lastRoundDifference: cashChange,
      };
    });

    // Record round history
    const roundData: RoundData = {
      round: currentRound,
      agents: updatedAgents.map(agent => ({
        name: agent.name,
        cash: agent.cash,
        difference: agent.lastRoundDifference,
      })),
      commodities: commodities.map(commodity => ({
        name: commodity.name,
        price: commodity.averagePrice,
      })),
    };

    setRoundsHistory(prev => [...prev, roundData]);
    setCurrentRound(prev => prev + 1);
    setAgents(updatedAgents);
    setCommodities(commodities);

    toast({
      title: "Simulation Round Complete",
      description: "Market conditions have been updated.",
    });
  };

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
    setNewAgent({ name: "", cash: 1000, class: "", bookkeeping: new Bookkeeping() });
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
    setNewCommodity({ name: "", averagePrice: 0 });
    toast({
      title: "Commodity Added",
      description: `${commodity.name} has been added successfully.`,
    });
  };

  return (
    <div className="container mx-auto py-4 sm:py-8 max-w-7xl space-y-6 sm:space-y-8">
      <SimulatorHeader onSimulate={simulateRound} />
      <SimulatorGrid
        agents={agents}
        commodities={commodities}
        newAgent={newAgent}
        newCommodity={newCommodity}
        onAgentEdit={handleAgentEdit}
        onCommodityEdit={handleCommodityEdit}
        onAddAgent={handleAddAgent}
        onAddCommodity={handleAddCommodity}
        setNewAgent={setNewAgent}
        setNewCommodity={setNewCommodity}
      />
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

export default Index;
