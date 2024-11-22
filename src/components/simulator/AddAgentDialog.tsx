import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AgentClassSelect } from "./AgentClassSelect";
import { Agent } from "@/types/simulator";

interface AddAgentDialogProps {
  newAgent: Omit<Agent, "lastRoundDifference">;
  onAgentNameChange: (value: string) => void;
  onAgentCashChange: (value: number) => void;
  onAgentClassChange: (value: string) => void;
  onAddAgent: () => void;
}

export const AddAgentDialog = ({
  newAgent,
  onAgentNameChange,
  onAgentCashChange,
  onAgentClassChange,
  onAddAgent,
}: AddAgentDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Agent</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label>Name</label>
          <Input
            value={newAgent.name}
            onChange={(e) => onAgentNameChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label>Cash</label>
          <Input
            type="number"
            value={newAgent.cash}
            onChange={(e) => onAgentCashChange(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label>Class</label>
          <AgentClassSelect
            value={newAgent.class}
            onChange={onAgentClassChange}
          />
        </div>
        <Button className="w-full" onClick={onAddAgent}>
          Add Agent
        </Button>
      </div>
    </DialogContent>
  );
};