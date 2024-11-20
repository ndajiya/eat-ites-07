import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { CommodityClassSelect } from "./CommodityClassSelect";
import { CommodityTypeSelect } from "./CommodityTypeSelect";
import { MarketTypeSelect } from "./MarketTypeSelect";
import { Commodity } from "@/types/simulator";
import { CommodityClass, CommodityType, MarketType } from "@/types/commodityTypes";

interface CommodityTableProps {
  commodities: Commodity[];
  onCommodityEdit: (commodity: Commodity) => void;
}

export const CommodityTable = ({ commodities, onCommodityEdit }: CommodityTableProps) => {
  const [editingCommodity, setEditingCommodity] = useState<Commodity | null>(null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Commodity</TableHead>
          <TableHead>Average Price</TableHead>
          <TableHead>Price Trend</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Market</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {commodities.map((commodity) => (
          <TableRow key={commodity.name}>
            <TableCell>{commodity.name}</TableCell>
            <TableCell>${commodity.averagePrice.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center ${
                  commodity.priceTrend === "Up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {commodity.priceTrend === "Up" ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {commodity.priceTrend}
              </span>
            </TableCell>
            <TableCell>{commodity.class}</TableCell>
            <TableCell>{commodity.type}</TableCell>
            <TableCell>{commodity.marketType}</TableCell>
            <TableCell>
              <Dialog open={editingCommodity?.name === commodity.name} onOpenChange={(open) => !open && setEditingCommodity(null)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setEditingCommodity(commodity)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Commodity</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label>Name</label>
                      <Input
                        value={editingCommodity?.name}
                        onChange={(e) =>
                          setEditingCommodity(prev => prev ? { ...prev, name: e.target.value } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Average Price</label>
                      <Input
                        type="number"
                        value={editingCommodity?.averagePrice}
                        onChange={(e) =>
                          setEditingCommodity(prev => prev ? { ...prev, averagePrice: Number(e.target.value) } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Class</label>
                      <CommodityClassSelect
                        value={editingCommodity?.class || ""}
                        onChange={(value) =>
                          setEditingCommodity(prev => prev ? { ...prev, class: value as CommodityClass } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Type</label>
                      <CommodityTypeSelect
                        value={editingCommodity?.type || ""}
                        onChange={(value) =>
                          setEditingCommodity(prev => prev ? { ...prev, type: value as CommodityType } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Market Type</label>
                      <MarketTypeSelect 
                        value={editingCommodity?.marketType || "Spot"}
                        onChange={(value) =>
                          setEditingCommodity(prev => prev ? { ...prev, marketType: value as MarketType } : null)
                        }
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => editingCommodity && onCommodityEdit(editingCommodity)}
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};