import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AgentTable } from "@/components/simulator/AgentTable";
import { CommodityTable } from "@/components/simulator/CommodityTable";

interface Agent {
  name: string;
  cash: number;
  class: string;
  lastRoundDifference: number;
}

interface Commodity {
  name: string;
  averagePrice: number;
  priceTrend: "Up" | "Down";
}

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Economic Simulator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simulate market conditions and observe how agents react to changes in
            the economy.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={simulateRound}
            size="lg"
            className="glass-card hover:bg-white/30 transition-all duration-300 text-lg font-semibold shadow-lg border-2 border-white/20 px-8 py-6 h-auto"
          >
            <Play className="mr-2 h-5 w-5" />
            Simulate Round
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Agent Information</h2>
            <AgentTable agents={agents} onAgentEdit={handleAgentEdit} />
          </Card>

          <Card className="glass-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Commodity Information</h2>
            <CommodityTable commodities={commodities} onCommodityEdit={handleCommodityEdit} />
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;