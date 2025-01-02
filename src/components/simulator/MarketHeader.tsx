import { Input } from "@/components/ui/input";
import { Search, Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddAgentDialog } from "./AddAgentDialog";
import { Agent } from "@/types/simulator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EnvironmentalControls } from "./EnvironmentalControls";

interface MarketHeaderProps {
  newAgent: Omit<Agent, "lastRoundDifference">;
  onAgentNameChange: (value: string) => void;
  onAgentCashChange: (value: number) => void;
  onAgentClassChange: (value: string) => void;
  onAddAgent: () => void;
}

export const MarketHeader = ({
  newAgent,
  onAgentNameChange,
  onAgentCashChange,
  onAgentClassChange,
  onAddAgent,
}: MarketHeaderProps) => {
  const handleEnvironmentalFactorChange = (factor: string, value: number) => {
    // Handle environmental factor changes
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold tracking-tight">Market Simulator</h2>
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <EnvironmentalControls onFactorChange={handleEnvironmentalFactorChange} />
          </PopoverContent>
        </Popover>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
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
      </div>
    </div>
  );
};