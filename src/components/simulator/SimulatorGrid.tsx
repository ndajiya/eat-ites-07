import { Card } from "@/components/ui/card";
import { AgentTable } from "./AgentTable";
import { CommodityTable } from "./CommodityTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Agent, Commodity } from "@/types/simulator";

interface SimulatorGridProps {
  agents: Agent[];
  commodities: Commodity[];
  newAgent: Omit<Agent, "lastRoundDifference">;
  newCommodity: Omit<Commodity, "priceTrend">;
  onAgentEdit: (agent: Agent) => void;
  onCommodityEdit: (commodity: Commodity) => void;
  onAddAgent: () => void;
  onAddCommodity: () => void;
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void;
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void;
}

export const SimulatorGrid = ({
  agents,
  commodities,
  newAgent,
  newCommodity,
  onAgentEdit,
  onCommodityEdit,
  onAddAgent,
  onAddCommodity,
  setNewAgent,
  setNewCommodity,
}: SimulatorGridProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0">
      <Card className="glass-card p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Agent Information</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Agent</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Name</label>
                  <Input
                    value={newAgent.name}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label>Cash</label>
                  <Input
                    type="number"
                    value={newAgent.cash}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, cash: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label>Class</label>
                  <Input
                    value={newAgent.class}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, class: e.target.value })
                    }
                  />
                </div>
                <Button className="w-full" onClick={onAddAgent}>
                  Add Agent
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="w-full">
          <div className="min-w-[600px]">
            <AgentTable agents={agents} onAgentEdit={onAgentEdit} />
          </div>
        </ScrollArea>
      </Card>

      <Card className="glass-card p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Commodity Information</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Commodity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Name</label>
                  <Input
                    value={newCommodity.name}
                    onChange={(e) =>
                      setNewCommodity({ ...newCommodity, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label>Average Price</label>
                  <Input
                    type="number"
                    value={newCommodity.averagePrice}
                    onChange={(e) =>
                      setNewCommodity({
                        ...newCommodity,
                        averagePrice: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <Button className="w-full" onClick={onAddCommodity}>
                  Add Commodity
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="w-full">
          <div className="min-w-[600px]">
            <CommodityTable commodities={commodities} onCommodityEdit={onCommodityEdit} />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};