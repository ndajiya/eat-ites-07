import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Commodity } from "@/types/simulator";
import { CommodityClassSelect } from "./CommodityClassSelect";
import { CommodityTypeSelect } from "./CommodityTypeSelect";
import { MarketTypeSelect } from "./MarketTypeSelect";

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
          <Label htmlFor="commodity-name">Name</Label>
          <Input
            id="commodity-name"
            value={newCommodity.name || ""}
            onChange={(e) => onCommodityNameChange(e.target.value)}
            placeholder="Enter commodity name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="commodity-price">Average Price</Label>
          <Input
            id="commodity-price"
            type="number"
            value={newCommodity.averagePrice || 0}
            onChange={(e) => onCommodityPriceChange(Number(e.target.value))}
            placeholder="Enter average price"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Class</Label>
          <CommodityClassSelect
            value={newCommodity.class}
            onChange={(value) => onCommodityNameChange(value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <CommodityTypeSelect
            value={newCommodity.type}
            onChange={(value) => onCommodityNameChange(value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Market Type</Label>
          <MarketTypeSelect
            value={newCommodity.marketType}
            onChange={(value) => onCommodityNameChange(value)}
          />
        </div>
        <Button className="w-full" onClick={onAddCommodity}>
          Add Commodity
        </Button>
      </div>
    </DialogContent>
  );
};