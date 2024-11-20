import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { COMMODITY_TYPES } from "@/types/commodityTypes";
import { Info } from "lucide-react";

interface CommodityTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CommodityTypeSelect = ({ value, onChange }: CommodityTypeSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(COMMODITY_TYPES).map(([key, commodityType]) => (
            <SelectItem key={key} value={key}>
              {commodityType.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Info className="h-4 w-4 cursor-help text-muted-foreground" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          {value && COMMODITY_TYPES[value as keyof typeof COMMODITY_TYPES] && (
            <div className="space-y-2">
              <h4 className="font-semibold">{COMMODITY_TYPES[value as keyof typeof COMMODITY_TYPES].name}</h4>
              <p className="text-sm">{COMMODITY_TYPES[value as keyof typeof COMMODITY_TYPES].description}</p>
              <div className="text-sm">
                <strong>Market Characteristics:</strong>
                <ul className="list-disc pl-4">
                  {COMMODITY_TYPES[value as keyof typeof COMMODITY_TYPES].marketCharacteristics.map((characteristic, index) => (
                    <li key={index}>{characteristic}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <strong>Examples:</strong>
                <ul className="list-disc pl-4">
                  {COMMODITY_TYPES[value as keyof typeof COMMODITY_TYPES].examples.map((example, index) => (
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