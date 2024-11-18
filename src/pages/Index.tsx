import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Play, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
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

  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [editingCommodity, setEditingCommodity] = useState<Commodity | null>(null);

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
    setEditingAgent(null);
    toast({
      title: "Agent Updated",
      description: `${updatedAgent.name} has been updated successfully.`,
    });
  };

  const handleCommodityEdit = (updatedCommodity: Commodity) => {
    setCommodities(commodities.map(commodity => 
      commodity.name === updatedCommodity.name ? updatedCommodity : commodity
    ));
    setEditingCommodity(null);
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
            className="glass-card hover:bg-white/30 transition-all duration-300"
          >
            <Play className="mr-2 h-4 w-4" />
            Simulate Round
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Agent Information</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Cash</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Last Round</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.name}>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>${agent.cash.toLocaleString()}</TableCell>
                    <TableCell>{agent.class}</TableCell>
                    <TableCell
                      className={
                        agent.lastRoundDifference >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {agent.lastRoundDifference >= 0 ? "+" : ""}$
                      {agent.lastRoundDifference.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Dialog open={editingAgent?.name === agent.name} onOpenChange={(open) => !open && setEditingAgent(null)}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingAgent(agent)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Agent</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label>Name</label>
                              <Input
                                value={editingAgent?.name}
                                onChange={(e) =>
                                  setEditingAgent(prev => prev ? { ...prev, name: e.target.value } : null)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label>Cash</label>
                              <Input
                                type="number"
                                value={editingAgent?.cash}
                                onChange={(e) =>
                                  setEditingAgent(prev => prev ? { ...prev, cash: Number(e.target.value) } : null)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label>Class</label>
                              <Input
                                value={editingAgent?.class}
                                onChange={(e) =>
                                  setEditingAgent(prev => prev ? { ...prev, class: e.target.value } : null)
                                }
                              />
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={() => editingAgent && handleAgentEdit(editingAgent)}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="glass-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Commodity Information</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead>Average Price</TableHead>
                  <TableHead>Price Trend</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commodities.map((commodity) => (
                  <TableRow key={commodity.name}>
                    <TableCell>{commodity.name}</TableCell>
                    <TableCell>${commodity.averagePrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center ${
                          commodity.priceTrend === "Up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {commodity.priceTrend === "Up" ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {commodity.priceTrend}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Dialog open={editingCommodity?.name === commodity.name} onOpenChange={(open) => !open && setEditingCommodity(null)}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingCommodity(commodity)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Commodity</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label>Name</label>
                              <Input
                                value={editingCommodity?.name}
                                onChange={(e) =>
                                  setEditingCommodity(prev => prev ? { ...prev, name: e.target.value } : null)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label>Average Price</label>
                              <Input
                                type="number"
                                value={editingCommodity?.averagePrice}
                                onChange={(e) =>
                                  setEditingCommodity(prev => prev ? { ...prev, averagePrice: Number(e.target.value) } : null)
                                }
                              />
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={() => editingCommodity && handleCommodityEdit(editingCommodity)}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;