import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/simulator";
import { BasicInfoSection } from "./BasicInfoSection";
import { InventorySection } from "./InventorySection";
import { MonetaryPolicySection } from "./MonetaryPolicySection";
import { StrategySection } from "./StrategySection";
import { LLMSection } from "./LLMSection";

interface AgentEditDialogProps {
  agent: Agent | null;
  onAgentChange: (agent: Agent) => void;
  onSave: (agent: Agent) => void;
}

export const AgentEditDialog = ({ agent, onAgentChange, onSave }: AgentEditDialogProps) => {
  if (!agent) return null;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Agent</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <BasicInfoSection agent={agent} onAgentChange={onAgentChange} />
        <InventorySection agent={agent} onAgentChange={onAgentChange} />
        {agent.class === "CentralBanks" && (
          <MonetaryPolicySection agent={agent} onAgentChange={onAgentChange} />
        )}
        <StrategySection 
          agentName={agent.name} 
          onSaveStrategy={(strategy) => {
            onAgentChange({
              ...agent,
              tradingStrategy: strategy
            });
          }} 
        />
        <LLMSection agent={agent} onAgentChange={onAgentChange} />
        <Button 
          className="w-full" 
          onClick={() => onSave(agent)}
        >
          Save Changes
        </Button>
      </div>
    </DialogContent>
  );
};