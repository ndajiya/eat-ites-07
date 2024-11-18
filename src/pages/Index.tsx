import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AgentTable } from "@/components/simulator/AgentTable";
import { CommodityTable } from "@/components/simulator/CommodityTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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
            className="glass-card hover:bg-white/30 transition-all duration-300 text-lg font-semibold shadow-lg border-2 border-white/20 px-8 py-6 h-auto text-foreground"
          >
            <Play className="mr-2 h-5 w-5" />
            Simulate Round
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Agent Information</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Agent</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label>Name</label>
                      <Input
                        value={newAgent.name}
                        onChange={(e) =>
                          setNewAgent((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Cash</label>
                      <Input
                        type="number"
                        value={newAgent.cash}
                        onChange={(e) =>
                          setNewAgent((prev) => ({ ...prev, cash: Number(e.target.value) }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Class</label>
                      <Input
                        value={newAgent.class}
                        onChange={(e) =>
                          setNewAgent((prev) => ({ ...prev, class: e.target.value }))
                        }
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddAgent}>
                      Add Agent
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <AgentTable agents={agents} onAgentEdit={handleAgentEdit} />
          </Card>

          <Card className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Commodity Information</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Commodity</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label>Name</label>
                      <Input
                        value={newCommodity.name}
                        onChange={(e) =>
                          setNewCommodity((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Average Price</label>
                      <Input
                        type="number"
                        value={newCommodity.averagePrice}
                        onChange={(e) =>
                          setNewCommodity((prev) => ({
                            ...prev,
                            averagePrice: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <Button className="w-full" onClick={handleAddCommodity}>
                      Add Commodity
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <CommodityTable commodities={commodities} onCommodityEdit={handleCommodityEdit} />
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
