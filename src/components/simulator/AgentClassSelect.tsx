import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AGENT_CLASSES } from "@/types/agentClasses";

interface AgentClassSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const AgentClassSelect = ({ value, onChange }: AgentClassSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select agent class" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(AGENT_CLASSES).map((className) => (
          <SelectItem key={className} value={className}>
            {AGENT_CLASSES[className].name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};