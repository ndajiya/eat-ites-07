import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, ArrowUpRight, ArrowDownRight, Factory } from "lucide-react";
import { useState } from "react";
import { CommodityClassSelect } from "./CommodityClassSelect";
import { CommodityTypeSelect } from "./CommodityTypeSelect";
import { MarketTypeSelect } from "./MarketTypeSelect";
import { Commodity } from "@/types/simulator";
import { CommodityClass, CommodityType, MarketType } from "@/types/commodityTypes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TablePagination } from "./TablePagination";

interface CommodityTableProps {
  commodities: Commodity[];
  onCommodityEdit: (commodity: Commodity) => void;
  agents?: Array<{ name: string; production?: Array<{ commodityName: string; rate: number }> }>;
}

export const CommodityTable = ({ commodities, onCommodityEdit, agents = [] }: CommodityTableProps) => {
  const [editingCommodity, setEditingCommodity] = useState<Commodity | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(commodities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCommodities = commodities.slice(startIndex, endIndex);

  const getProducers = (commodityName: string) => {
    return agents
      .filter(agent => agent.production?.some(p => p.commodityName === commodityName))
      .map(agent => ({
        name: agent.name,
        rate: agent.production?.find(p => p.commodityName === commodityName)?.rate || 0
      }));
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Commodity</TableHead>
            <TableHead>Average Price</TableHead>
            <TableHead>Price Trend</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Market</TableHead>
            <TableHead>Producers</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCommodities.map((commodity) => {
            const producers = getProducers(commodity.name);
            return (
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
                  {producers.length > 0 ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 cursor-help">
                          <Factory className="h-4 w-4" />
                          <span>{producers.length}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-2">
                          <p className="font-semibold">Producers:</p>
                          {producers.map((producer, idx) => (
                            <p key={idx}>
                              {producer.name}: {producer.rate} units/round
                            </p>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    "-"
                  )}
                </TableCell>
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
            );
          })}
        </TableBody>
      </Table>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};