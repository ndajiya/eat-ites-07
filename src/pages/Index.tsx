import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SimulatorHeader } from "@/components/simulator/SimulatorHeader";
import { SimulatorGrid } from "@/components/simulator/SimulatorGrid";
import { Agent, Commodity } from "@/types/simulator";

const Index = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([
    { name: "Agent1", cash: 1000, class: "ClassA", lastRoundDifference: 0 },
    { name: "Agent2", cash: 800, class: "ClassB", lastRoundDifference: 0 },
  ]);

  const [commodities, setCommodities] = useState<Commodity[]>([
    { name: "Commodity1", averagePrice: 50, priceTrend: "Up" },
    { name: "Commodity2", averagePrice: 30, priceTrend: "Down" },
  ]);

  const [newAgent, setNewAgent] = useState<Omit<Agent, "lastRoundDifference">>({
    name: "",
    cash: 1000,
    class: "",
  });

  const [newCommodity, setNewCommodity] = useState<Omit<Commodity, "priceTrend">>({
    name: "",
    averagePrice: 0,
  });

  const simulateRound = () => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) => {
        const cashChange = Math.floor(Math.random() * 201) - 100;
        return {
          ...agent,
          cash: agent.cash + cashChange,
          lastRoundDifference: cashChange,
        };
      })
    );

    setCommodities((prevCommodities) =>
      prevCommodities.map((commodity) => {
        const priceChange = Math.floor(Math.random() * 21) - 10;
        return {
          ...commodity,
          averagePrice: commodity.averagePrice + priceChange,
          priceTrend: priceChange >= 0 ? "Up" : "Down",
        };
      })
    );

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
    };

    setAgents([...agents, agent]);
    setNewAgent({ name: "", cash: 1000, class: "" });
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
    </div>
  );
};

export default Index;