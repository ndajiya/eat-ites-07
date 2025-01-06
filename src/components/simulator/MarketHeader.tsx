import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Upload, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { DataUploadDialog } from "./DataUploadDialog";
import { AddAgentDialog } from "./AddAgentDialog";
import { AddCommodityDialog } from "./AddCommodityDialog";
import { AddSecurityDialog } from "./AddSecurityDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EnvironmentalControls } from "./EnvironmentalControls";

interface MarketHeaderProps {
  newAgent: Omit<Agent, "lastRoundDifference">;
  onAgentNameChange: (value: string) => void;
  onAgentCashChange: (value: number) => void;
  onAgentClassChange: (value: string) => void;
  onAddAgent: () => void;
  newCommodity: Omit<Commodity, "priceTrend">;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
  newSecurity: Omit<Security, "id">;
  onSecurityChange: (field: any, value: any) => void;
  onAddSecurity: () => void;
  onAgentUpload: (agents: Agent[]) => void;
  onCommodityUpload: (commodities: Commodity[]) => void;
  onSecurityUpload: (securities: Security[]) => void;
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
  onAgentUpload,
  onCommodityUpload,
  onSecurityUpload,
}: MarketHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Market Overview</h1>
      <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <DataUploadDialog
            onAgentUpload={onAgentUpload}
            onCommodityUpload={onCommodityUpload}
            onSecurityUpload={onSecurityUpload}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" title="Settings">
                <Settings2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <EnvironmentalControls onFactorChange={() => {}} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
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
              <Button variant="outline" size="sm" className="flex items-center gap-2">
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
              <Button variant="outline" size="sm" className="flex items-center gap-2">
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
    </div>
  );
};