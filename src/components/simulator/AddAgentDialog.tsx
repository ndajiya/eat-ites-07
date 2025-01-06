import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/simulator";
import { useState, useEffect } from "react";
import { AgentClassSelect } from "./AgentClassSelect";

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
  const [localName, setLocalName] = useState(newAgent.name);

  useEffect(() => {
    setLocalName(newAgent.name);
  }, [newAgent.name]);

  const handleNameChange = (value: string) => {
    setLocalName(value);
    onAgentNameChange(value);
  };

  const handleSubmit = () => {
    if (localName.trim()) {
      onAddAgent();
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Agent</DialogTitle>
        <DialogDescription>
          Add a new agent to the simulation. Select the appropriate class for the agent's role.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label>Name</label>
          <Input
            value={localName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter agent name"
          />
        </div>
        <div className="space-y-2">
          <label>Cash</label>
          <Input
            type="number"
            value={newAgent.cash}
            onChange={(e) => onAgentCashChange(Number(e.target.value))}
            placeholder="Enter initial cash amount"
          />
        </div>
        <div className="space-y-2">
          <label>Class</label>
          <AgentClassSelect
            value={newAgent.class}
            onChange={onAgentClassChange}
          />
        </div>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={!localName.trim()}
        >
          Add Agent
        </Button>
      </div>
    </DialogContent>
  );
};