import { Card } from "@/components/ui/card";
import { SecuritiesTable } from "../SecuritiesTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Agent } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { AddSecurityDialog } from "../AddSecurityDialog";

interface SecuritiesSectionProps {
  securities: Security[];
  agents: Agent[];
  newSecurity: Omit<Security, "id">;
  onSecurityTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  onAddSecurity: () => void;
  onSecurityChange: (field: keyof Omit<Security, "id">, value: any) => void;
}

export const SecuritiesSection = ({
  securities,
  agents,
  newSecurity,
  onSecurityTrade,
  onAddSecurity,
  onSecurityChange,
}: SecuritiesSectionProps) => {
  return (
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
  );
};