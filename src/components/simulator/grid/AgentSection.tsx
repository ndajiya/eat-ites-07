
import { Card } from "@/components/ui/card";
import { AgentTable } from "../AgentTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Agent } from "@/types/simulator";
import { AddAgentDialog } from "../AddAgentDialog";

interface AgentSectionProps {
  agents: Agent[];
  newAgent: Omit<Agent, "lastRoundDifference">;
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onAddAgent: () => void;
  onAgentNameChange: (value: string) => void;
  onAgentCashChange: (value: number) => void;
  onAgentClassChange: (value: string) => void;
}

export const AgentSection = ({
  agents,
  newAgent,
  onAgentEdit,
  onAgentDelete,
  onAddAgent,
  onAgentNameChange,
  onAgentCashChange,
  onAgentClassChange,
}: AgentSectionProps) => {
  return (
    <div className="glass-card p-6 space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold">Agent Information</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <AddAgentDialog
            newAgent={newAgent}
            onAgentNameChange={onAgentNameChange}
            onAgentCashChange={onAgentCashChange}
            onAgentClassChange={onAgentClassChange}
            onAddAgent={onAddAgent}
          />
        </Dialog>
      </div>
      <div className="min-w-[300px]">
        <AgentTable 
          agents={agents} 
          onAgentEdit={onAgentEdit} 
          onAgentDelete={onAgentDelete}
        />
      </div>
    </div>
  );
};
