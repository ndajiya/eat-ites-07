import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/simulator";
import { AgentClassSelect } from "./AgentClassSelect";

interface AgentEditDialogProps {
  agent: Agent | null;
  onAgentChange: (agent: Agent | null) => void;
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
        <div className="space-y-2">
          <label>Name</label>
          <Input
            value={agent.name}
            onChange={(e) =>
              onAgentChange(prev => prev ? { ...prev, name: e.target.value } : null)
            }
          />
        </div>
        <div className="space-y-2">
          <label>Cash</label>
          <Input
            type="number"
            value={agent.cash}
            onChange={(e) =>
              onAgentChange(prev => prev ? { ...prev, cash: Number(e.target.value) } : null)
            }
          />
        </div>
        <div className="space-y-2">
          <label>Class</label>
          <AgentClassSelect
            value={agent.class}
            onChange={(value) =>
              onAgentChange(prev => prev ? { ...prev, class: value } : null)
            }
          />
        </div>
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