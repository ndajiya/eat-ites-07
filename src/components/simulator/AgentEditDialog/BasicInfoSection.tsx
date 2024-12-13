import { Input } from "@/components/ui/input";
import { AgentClassSelect } from "../AgentClassSelect";
import { Agent } from "@/types/simulator";

interface BasicInfoSectionProps {
  agent: Agent;
  onAgentChange: (agent: Agent) => void;
}

export const BasicInfoSection = ({ agent, onAgentChange }: BasicInfoSectionProps) => {
  const handleNameChange = (value: string) => {
    onAgentChange({ ...agent, name: value });
  };

  const handleCashChange = (value: number) => {
    onAgentChange({ ...agent, cash: value });
  };

  const handleClassChange = (value: string) => {
    onAgentChange({ ...agent, class: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label>Name</label>
        <Input
          value={agent.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label>Cash</label>
        <Input
          type="number"
          value={agent.cash}
          onChange={(e) => handleCashChange(Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <label>Class</label>
        <AgentClassSelect
          value={agent.class}
          onChange={handleClassChange}
        />
      </div>
    </div>
  );
};