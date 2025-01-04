import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Commodity } from "@/types/simulator";
import { CommodityClassSelect } from "./CommodityClassSelect";
import { CommodityTypeSelect } from "./CommodityTypeSelect";
import { MarketTypeSelect } from "./MarketTypeSelect";
import { CommodityClass, CommodityType } from "@/types/commodityTypes";

interface CommodityEditDialogProps {
  commodity: Commodity | null;
  onCommodityChange: (commodity: Commodity) => void;
  onSave: (commodity: Commodity) => void;
}

export const CommodityEditDialog = ({
  commodity,
  onCommodityChange,
  onSave,
}: CommodityEditDialogProps) => {
  if (!commodity) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onCommodityChange({ ...commodity, name: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onCommodityChange({ ...commodity, averagePrice: Number(e.target.value) });
  };

  return (
    <DialogContent onClick={(e) => e.stopPropagation()}>
      <DialogHeader>
        <DialogTitle>Edit Commodity</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label>Name</label>
          <Input
            value={commodity.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="space-y-2">
          <label>Average Price</label>
          <Input
            type="number"
            value={commodity.averagePrice}
            onChange={handlePriceChange}
          />
        </div>
        <div className="space-y-2">
          <label>Class</label>
          <CommodityClassSelect
            value={commodity.class}
            onChange={(value) =>
              onCommodityChange({ ...commodity, class: value as CommodityClass })
            }
          />
        </div>
        <div className="space-y-2">
          <label>Type</label>
          <CommodityTypeSelect
            value={commodity.type}
            onChange={(value) =>
              onCommodityChange({ ...commodity, type: value as CommodityType })
            }
          />
        </div>
        <div className="space-y-2">
          <label>Market Type</label>
          <MarketTypeSelect
            value={commodity.marketType}
            onChange={(value) =>
              onCommodityChange({ ...commodity, marketType: value })
            }
          />
        </div>
        <Button className="w-full" onClick={() => onSave(commodity)}>
          Save Changes
        </Button>
      </div>
    </DialogContent>
  );
};