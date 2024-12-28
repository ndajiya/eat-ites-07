import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Edit2, BookOpen, Package } from "lucide-react";
import { useState } from "react";
import { Agent } from "@/types/simulator";
import { AgentEditDialog } from "./AgentEditDialog";
import { FinancialRecordsDialog } from "./FinancialRecordsDialog";
import { InventoryDialog } from "./InventoryDialog";
import { TablePagination } from "./TablePagination";

interface AgentTableProps {
  agents: Agent[];
  onAgentEdit: (agent: Agent) => void;
}

export const AgentTable = ({ agents, onAgentEdit }: AgentTableProps) => {
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [viewingLedger, setViewingLedger] = useState<Agent | null>(null);
  const [viewingInventory, setViewingInventory] = useState<Agent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(agents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = agents.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Cash</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Last Round</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAgents.map((agent) => (
            <TableRow key={agent.name}>
              <TableCell>{agent.name}</TableCell>
              <TableCell>${agent.cash.toLocaleString()}</TableCell>
              <TableCell>{agent.class}</TableCell>
              <TableCell
                className={
                  agent.lastRoundDifference >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {agent.lastRoundDifference >= 0 ? "+" : ""}$
                {agent.lastRoundDifference.toLocaleString()}
              </TableCell>
              <TableCell className="space-x-2">
                <Dialog open={editingAgent?.name === agent.name} onOpenChange={(open) => !open && setEditingAgent(null)}>
                  <Button variant="ghost" size="icon" onClick={() => setEditingAgent(agent)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <AgentEditDialog
                    agent={editingAgent}
                    onAgentChange={setEditingAgent}
                    onSave={onAgentEdit}
                  />
                </Dialog>

                <Dialog open={viewingLedger?.name === agent.name} onOpenChange={(open) => !open && setViewingLedger(null)}>
                  <Button variant="ghost" size="icon" onClick={() => setViewingLedger(agent)}>
                    <BookOpen className="h-4 w-4" />
                  </Button>
                  <FinancialRecordsDialog agent={viewingLedger} />
                </Dialog>

                <Dialog open={viewingInventory?.name === agent.name} onOpenChange={(open) => !open && setViewingInventory(null)}>
                  <Button variant="ghost" size="icon" onClick={() => setViewingInventory(agent)}>
                    <Package className="h-4 w-4" />
                  </Button>
                  <InventoryDialog agent={viewingInventory} />
                </Dialog>
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