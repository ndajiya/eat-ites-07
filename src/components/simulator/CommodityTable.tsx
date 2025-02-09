
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Edit2, ArrowUpRight, ArrowDownRight, Factory, Trash2 } from "lucide-react";
import { useState } from "react";
import { Commodity } from "@/types/simulator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TablePagination } from "./TablePagination";
import { CommodityEditDialog } from "./CommodityEditDialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface CommodityTableProps {
  commodities: Commodity[];
  onCommodityEdit: (commodity: Commodity) => void;
  onDelete: (commodityName: string) => void;
  agents?: Array<{ name: string; production?: Array<{ commodityName: string; rate: number }> }>;
}

export const CommodityTable = ({ commodities, onCommodityEdit, onDelete, agents = [] }: CommodityTableProps) => {
  const [editingCommodity, setEditingCommodity] = useState<Commodity | null>(null);
  const [deletingCommodity, setDeletingCommodity] = useState<string | null>(null);
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
                <TableCell className="space-x-2">
                  <Dialog open={editingCommodity?.name === commodity.name} onOpenChange={(open) => !open && setEditingCommodity(null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setEditingCommodity(commodity)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <CommodityEditDialog
                      commodity={editingCommodity}
                      onCommodityChange={setEditingCommodity}
                      onSave={onCommodityEdit}
                    />
                  </Dialog>

                  <AlertDialog open={deletingCommodity === commodity.name} onOpenChange={(open) => !open && setDeletingCommodity(null)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setDeletingCommodity(commodity.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Commodity</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {commodity.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingCommodity(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            onDelete(commodity.name);
                            setDeletingCommodity(null);
                          }}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
