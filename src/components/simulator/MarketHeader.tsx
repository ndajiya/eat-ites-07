import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Agent } from "@/types/simulator";
import { AddAgentDialog } from "./AddAgentDialog";
import { AddCommodityDialog } from "./AddCommodityDialog";
import { AddSecurityDialog } from "./AddSecurityDialog";

interface MarketHeaderProps {
  newAgent: Omit<Agent, "lastRoundDifference">;
  onAgentNameChange: (value: string) => void;
  onAgentCashChange: (value: number) => void;
  onAgentClassChange: (value: string) => void;
  onAddAgent: () => void;
  newCommodity: any;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
  newSecurity: any;
  onSecurityChange: (field: any, value: any) => void;
  onAddSecurity: () => void;
}

export const MarketHeader = ({
  newAgent,
  onAgentNameChange,
  onAgentCashChange,
  onAgentClassChange,
  onAddAgent,
  newCommodity,
  onCommodityNameChange,
  onCommodityPriceChange,
  onAddCommodity,
  newSecurity,
  onSecurityChange,
  onAddSecurity,
}: MarketHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Market Overview</h1>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Agent
            </Button>
          </DialogTrigger>
          <AddAgentDialog
            newAgent={newAgent}
            onAgentNameChange={onAgentNameChange}
            onAgentCashChange={onAgentCashChange}
            onAgentClassChange={onAgentClassChange}
            onAddAgent={onAddAgent}
          />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Commodity
            </Button>
          </DialogTrigger>
          <AddCommodityDialog
            newCommodity={newCommodity}
            onCommodityNameChange={onCommodityNameChange}
            onCommodityPriceChange={onCommodityPriceChange}
            onAddCommodity={onAddCommodity}
          />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Security
            </Button>
          </DialogTrigger>
          <AddSecurityDialog
            newSecurity={newSecurity}
            onSecurityChange={onSecurityChange}
            onAddSecurity={onAddSecurity}
          />
        </Dialog>
      </div>
    </div>
  );
};