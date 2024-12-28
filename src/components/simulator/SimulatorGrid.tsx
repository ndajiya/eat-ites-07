import { Card } from "@/components/ui/card";
import { AgentTable } from "./AgentTable";
import { CommodityTable } from "./CommodityTable";
import { SecuritiesTable } from "./SecuritiesTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Agent, Commodity } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { AddAgentDialog } from "./AddAgentDialog";
import { AddCommodityDialog } from "./AddCommodityDialog";
import { AddSecurityDialog } from "./AddSecurityDialog";

interface SimulatorGridProps {
  agents: Agent[];
  commodities: Commodity[];
  securities: Security[];
  newAgent: Omit<Agent, "lastRoundDifference">;
  newCommodity: Omit<Commodity, "priceTrend">;
  newSecurity: Omit<Security, "id">;
  onAgentEdit: (agent: Agent) => void;
  onCommodityEdit: (commodity: Commodity) => void;
  onSecurityTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  onAddAgent: () => void;
  onAddCommodity: () => void;
  onAddSecurity: () => void;
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void;
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void;
  onSecurityChange: (field: keyof Omit<Security, "id">, value: any) => void;
}

export const SimulatorGrid = ({
  agents,
  commodities,
  securities,
  newAgent,
  newCommodity,
  newSecurity,
  onAgentEdit,
  onCommodityEdit,
  onSecurityTrade,
  onAddAgent,
  onAddCommodity,
  onAddSecurity,
  setNewAgent,
  setNewCommodity,
  onSecurityChange,
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
            <AddAgentDialog
              newAgent={newAgent}
              onAgentNameChange={handleAgentNameChange}
              onAgentCashChange={handleAgentCashChange}
              onAgentClassChange={handleAgentClassChange}
              onAddAgent={onAddAgent}
            />
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
            <AddCommodityDialog
              newCommodity={newCommodity}
              onCommodityNameChange={handleCommodityNameChange}
              onCommodityPriceChange={handleCommodityPriceChange}
              onAddCommodity={onAddCommodity}
            />
          </Dialog>
        </div>
        <div className="min-w-[300px]">
          <CommodityTable commodities={commodities} onCommodityEdit={onCommodityEdit} />
        </div>
      </Card>

      <Card className="glass-card p-4 sm:p-6 space-y-4 overflow-x-auto col-span-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Securities Market</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddSecurityDialog
              newSecurity={newSecurity}
              onSecurityChange={onSecurityChange}
              onAddSecurity={onAddSecurity}
            />
          </Dialog>
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