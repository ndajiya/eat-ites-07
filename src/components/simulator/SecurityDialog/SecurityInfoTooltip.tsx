import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface SecurityInfoTooltipProps {
  title: string;
  description: string;
  characteristics: string[];
}

export const SecurityInfoTooltip = ({
  title,
  description,
  characteristics
}: SecurityInfoTooltipProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Info className="h-4 w-4 cursor-help text-muted-foreground" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm">{description}</p>
          <div className="text-sm">
            <strong>Characteristics:</strong>
            <ul className="list-disc pl-4">
              {characteristics.map((characteristic, index) => (
                <li key={index}>{characteristic}</li>
              ))}
            </ul>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};