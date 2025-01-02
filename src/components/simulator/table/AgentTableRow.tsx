import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2, BookOpen, Package, Trash2 } from "lucide-react";
import { Agent } from "@/types/simulator";
import { AgentEditDialog } from "../AgentEditDialog";
import { FinancialRecordsDialog } from "../FinancialRecordsDialog";
import { InventoryDialog } from "../InventoryDialog";
import { useState } from "react";

interface AgentTableRowProps {
  agent: Agent;
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
}

export const AgentTableRow = ({ agent, onAgentEdit, onAgentDelete }: AgentTableRowProps) => {
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [viewingLedger, setViewingLedger] = useState<Agent | null>(null);
  const [viewingInventory, setViewingInventory] = useState<Agent | null>(null);

  return (
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

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onAgentDelete(agent.name)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};