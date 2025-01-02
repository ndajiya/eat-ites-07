import { Table, TableBody } from "@/components/ui/table";
import { Agent } from "@/types/simulator";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AgentTableHeader } from "./table/AgentTableHeader";
import { AgentTableRow } from "./table/AgentTableRow";
import { TablePagination } from "./TablePagination";

interface AgentTableProps {
  agents: Agent[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
}

export const AgentTable = ({ agents, onAgentEdit, onAgentDelete }: AgentTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 10;

  const totalPages = Math.ceil(agents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = agents.slice(startIndex, endIndex);

  const handleDelete = (agentName: string) => {
    onAgentDelete(agentName);
    toast({
      title: "Agent Deleted",
      description: `${agentName} has been removed from the simulation.`,
    });
  };

  return (
    <div className="space-y-4">
      <Table>
        <AgentTableHeader />
        <TableBody>
          {currentAgents.map((agent) => (
            <AgentTableRow
              key={agent.name}
              agent={agent}
              onAgentEdit={onAgentEdit}
              onAgentDelete={handleDelete}
            />
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