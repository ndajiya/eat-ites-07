import { AgentTable } from "../AgentTable";
import { Agent } from "@/types/simulator";

interface AgentTabProps {
  agents: Agent[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
}

export const AgentTab = ({ agents, onAgentEdit, onAgentDelete }: AgentTabProps) => {
  return (
    <div className="mt-6">
      <AgentTable
        agents={agents}
        onAgentEdit={onAgentEdit}
        onAgentDelete={onAgentDelete}
      />
    </div>
  );
};