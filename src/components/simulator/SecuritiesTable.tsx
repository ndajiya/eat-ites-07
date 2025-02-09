
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Security, Trade } from "@/types/securities";
import { Agent } from "@/types/simulator";
import { TablePagination } from "./TablePagination";
import { SecurityTradeDialog } from "./SecurityTradeDialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface SecuritiesTableProps {
  securities: Security[];
  agents: Agent[];
  onTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  onDelete: (securityId: string) => void;
}

export const SecuritiesTable = ({ securities, agents, onTrade, onDelete }: SecuritiesTableProps) => {
  const [selectedSecurity, setSelectedSecurity] = useState<Security | null>(null);
  const [deletingSecurity, setDeletingSecurity] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(securities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSecurities = securities.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Issuer</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSecurities.map((security) => (
            <TableRow key={security.id}>
              <TableCell>{security.name}</TableCell>
              <TableCell>{security.class}</TableCell>
              <TableCell>{security.type}</TableCell>
              <TableCell>${security.price.toLocaleString()}</TableCell>
              <TableCell>{security.issuer}</TableCell>
              <TableCell className="space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedSecurity(security)}
                    >
                      Trade
                    </Button>
                  </DialogTrigger>
                  <SecurityTradeDialog
                    security={selectedSecurity}
                    agents={agents}
                    onTrade={onTrade}
                  />
                </Dialog>

                <AlertDialog open={deletingSecurity === security.id} onOpenChange={(open) => !open && setDeletingSecurity(null)}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setDeletingSecurity(security.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Security</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {security.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setDeletingSecurity(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onDelete(security.id);
                          setDeletingSecurity(null);
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
          ))}
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
