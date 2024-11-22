import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Agent } from "@/types/simulator";

interface InventoryDialogProps {
  agent: Agent | null;
}

export const InventoryDialog = ({ agent }: InventoryDialogProps) => {
  if (!agent) return null;

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>{agent.name}'s Inventory</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commodity</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Avg. Purchase Price</TableHead>
              <TableHead>Total Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agent.inventory.map((item) => (
              <TableRow key={item.commodityName}>
                <TableCell>{item.commodityName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.averagePurchasePrice.toLocaleString()}</TableCell>
                <TableCell>
                  ${(item.quantity * item.averagePurchasePrice).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {agent.production && (
          <>
            <h3 className="font-semibold mt-6 mb-4">Production Capabilities</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead>Production Rate</TableHead>
                  <TableHead>Cost per Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agent.production.map((prod) => (
                  <TableRow key={prod.commodityName}>
                    <TableCell>{prod.commodityName}</TableCell>
                    <TableCell>{prod.rate} units/round</TableCell>
                    <TableCell>${prod.cost.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </DialogContent>
  );
};