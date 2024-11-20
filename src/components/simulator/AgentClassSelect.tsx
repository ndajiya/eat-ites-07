import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AGENT_CLASSES } from "@/types/agentClasses";
import { Info } from "lucide-react";

interface AgentClassSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const AgentClassSelect = ({ value, onChange }: AgentClassSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select class" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(AGENT_CLASSES).map(([key, agentClass]) => (
            <SelectItem key={key} value={key}>
              {agentClass.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Info className="h-4 w-4 cursor-help text-muted-foreground" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          {value && AGENT_CLASSES[value as keyof typeof AGENT_CLASSES] && (
            <div className="space-y-2">
              <h4 className="font-semibold">{AGENT_CLASSES[value as keyof typeof AGENT_CLASSES].name}</h4>
              <p className="text-sm">{AGENT_CLASSES[value as keyof typeof AGENT_CLASSES].description}</p>
              <div className="text-sm">
                <strong>Roles:</strong>
                <ul className="list-disc pl-4">
                  {AGENT_CLASSES[value as keyof typeof AGENT_CLASSES].roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <strong>Examples:</strong>
                <ul className="list-disc pl-4">
                  {AGENT_CLASSES[value as keyof typeof AGENT_CLASSES].examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};