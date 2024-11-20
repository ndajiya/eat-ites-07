import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { COMMODITY_CLASSES } from "@/types/commodityTypes";
import { Info } from "lucide-react";

interface CommodityClassSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CommodityClassSelect = ({ value, onChange }: CommodityClassSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select class" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(COMMODITY_CLASSES).map(([key, commodityClass]) => (
            <SelectItem key={key} value={key}>
              {commodityClass.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Info className="h-4 w-4 cursor-help text-muted-foreground" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          {value && COMMODITY_CLASSES[value as keyof typeof COMMODITY_CLASSES] && (
            <div className="space-y-2">
              <h4 className="font-semibold">{COMMODITY_CLASSES[value as keyof typeof COMMODITY_CLASSES].name}</h4>
              <p className="text-sm">{COMMODITY_CLASSES[value as keyof typeof COMMODITY_CLASSES].description}</p>
              <div className="text-sm">
                <strong>Characteristics:</strong>
                <ul className="list-disc pl-4">
                  {COMMODITY_CLASSES[value as keyof typeof COMMODITY_CLASSES].characteristics.map((characteristic, index) => (
                    <li key={index}>{characteristic}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <strong>Examples:</strong>
                <ul className="list-disc pl-4">
                  {COMMODITY_CLASSES[value as keyof typeof COMMODITY_CLASSES].examples.map((example, index) => (
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