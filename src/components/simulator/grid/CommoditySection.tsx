
import { Card } from "@/components/ui/card";
import { CommodityTable } from "../CommodityTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Commodity } from "@/types/simulator";
import { AddCommodityDialog } from "../AddCommodityDialog";

interface CommoditySectionProps {
  commodities: Commodity[];
  newCommodity: Omit<Commodity, "priceTrend">;
  onCommodityEdit: (commodity: Commodity) => void;
  onAddCommodity: () => void;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onDelete: (commodityName: string) => void;
}

export const CommoditySection = ({
  commodities,
  newCommodity,
  onCommodityEdit,
  onAddCommodity,
  onCommodityNameChange,
  onCommodityPriceChange,
  onDelete,
}: CommoditySectionProps) => {
  return (
    <div className="glass-card p-6 space-y-4 w-full">
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
            onCommodityNameChange={onCommodityNameChange}
            onCommodityPriceChange={onCommodityPriceChange}
            onAddCommodity={onAddCommodity}
          />
        </Dialog>
      </div>
      <div className="min-w-[300px]">
        <CommodityTable 
          commodities={commodities} 
          onCommodityEdit={onCommodityEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};
