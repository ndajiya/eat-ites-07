import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Commodity } from "@/types/simulator";

interface AddCommodityDialogProps {
  newCommodity: Omit<Commodity, "priceTrend">;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
}

export const AddCommodityDialog = ({
  newCommodity,
  onCommodityNameChange,
  onCommodityPriceChange,
  onAddCommodity,
}: AddCommodityDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Commodity</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label>Name</label>
          <Input
            value={newCommodity.name}
            onChange={(e) => onCommodityNameChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label>Average Price</label>
          <Input
            type="number"
            value={newCommodity.averagePrice}
            onChange={(e) => onCommodityPriceChange(Number(e.target.value))}
          />
        </div>
        <Button className="w-full" onClick={onAddCommodity}>
          Add Commodity
        </Button>
      </div>
    </DialogContent>
  );
};