import { Card } from "@/components/ui/card";
import { AgentTable } from "./AgentTable";
import { CommodityTable } from "./CommodityTable";
import { SecuritiesTable } from "./SecuritiesTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Agent, Commodity } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";

interface SimulatorGridProps {
  agents: Agent[];
  commodities: Commodity[];
  securities: Security[];
  newAgent: Omit<Agent, "lastRoundDifference">;
  newCommodity: Omit<Commodity, "priceTrend">;
  onAgentEdit: (agent: Agent) => void;
  onCommodityEdit: (commodity: Commodity) => void;
  onSecurityTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  onAddAgent: () => void;
  onAddCommodity: () => void;
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void;
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void;
}

export const SimulatorGrid = ({
  agents,
  commodities,
  securities,
  newAgent,
  newCommodity,
  onAgentEdit,
  onCommodityEdit,
  onSecurityTrade,
  onAddAgent,
  onAddCommodity,
  setNewAgent,
  setNewCommodity,
}: SimulatorGridProps) => {
  const handleAgentNameChange = (value: string) => {
    setNewAgent({
      ...newAgent,
      name: value
    });
  };

  const handleAgentCashChange = (value: number) => {
    setNewAgent({
      ...newAgent,
      cash: value
    });
  };

  const handleAgentClassChange = (value: string) => {
    setNewAgent({
      ...newAgent,
      class: value
    });
  };

  const handleCommodityNameChange = (value: string) => {
    setNewCommodity({
      ...newCommodity,
      name: value
    });
  };

  const handleCommodityPriceChange = (value: number) => {
    setNewCommodity({
      ...newCommodity,
      averagePrice: value
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0">
      <Card className="glass-card p-4 sm:p-6 space-y-4 overflow-x-auto">
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
                    onChange={(e) => handleAgentNameChange(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label>Cash</label>
                  <Input
                    type="number"
                    value={newAgent.cash}
                    onChange={(e) => handleAgentCashChange(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label>Class</label>
                  <Input
                    value={newAgent.class}
                    onChange={(e) => handleAgentClassChange(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={onAddAgent}>
                  Add Agent
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="min-w-[300px]">
          <AgentTable agents={agents} onAgentEdit={onAgentEdit} />
        </div>
      </Card>

      <Card className="glass-card p-4 sm:p-6 space-y-4 overflow-x-auto">
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
                    onChange={(e) => handleCommodityNameChange(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label>Average Price</label>
                  <Input
                    type="number"
                    value={newCommodity.averagePrice}
                    onChange={(e) => handleCommodityPriceChange(Number(e.target.value))}
                  />
                </div>
                <Button className="w-full" onClick={onAddCommodity}>
                  Add Commodity
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="min-w-[300px]">
          <CommodityTable commodities={commodities} onCommodityEdit={onCommodityEdit} />
        </div>
      </Card>

      <Card className="glass-card p-4 sm:p-6 space-y-4 overflow-x-auto col-span-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Securities Market</h2>
        </div>
        <div className="min-w-[300px]">
          <SecuritiesTable 
            securities={securities} 
            agents={agents} 
            onTrade={onSecurityTrade}
          />
        </div>
      </Card>
    </div>
  );
};