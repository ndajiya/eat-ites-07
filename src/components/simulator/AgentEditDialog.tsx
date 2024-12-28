import { Agent } from "@/types/simulator";
import { AgentEditDialog as ModularAgentEditDialog } from "./AgentEditDialog/index";

interface AgentEditDialogProps {
  agent: Agent | null;
  onAgentChange: (agent: Agent) => void;
  onSave: (agent: Agent) => void;
}

export const AgentEditDialog = (props: AgentEditDialogProps) => {
  return <ModularAgentEditDialog {...props} />;
};