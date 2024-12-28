import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/simulator";
import { AGENT_CLASSES } from "@/types/agentClasses";
import { useState, useEffect } from "react";

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
          <label htmlFor="agent-class-select" className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <select
            id="agent-class-select"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={newAgent.class}
            onChange={(e) => onAgentClassChange(e.target.value)}
          >
            <option value="" disabled>
              Select Class
            </option>
            {Object.entries(AGENT_CLASSES).map(([key, agentClass]) => (
              <option key={key} value={key}>
                {agentClass.name}
              </option>
            ))}
          </select>
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