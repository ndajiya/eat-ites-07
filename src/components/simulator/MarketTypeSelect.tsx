import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { MarketType } from "@/types/commodityTypes";

interface MarketTypeSelectProps {
  value: MarketType;
  onChange: (value: MarketType) => void;
}

const MARKET_TYPE_INFO = {
  Spot: {
    name: "Spot Market",
    description: "Spot markets involve the immediate exchange of commodities for cash, with delivery typically occurring within a few days.",
    characteristics: [
      "Immediate or near-immediate delivery",
      "Current market prices",
      "Direct physical trading",
      "Lower price volatility",
      "Suitable for immediate needs"
    ]
  },
  Futures: {
    name: "Futures Market",
    description: "Futures markets involve contracts for future delivery of commodities at predetermined prices, used for hedging and speculation.",
    characteristics: [
      "Future delivery dates",
      "Price locked in advance",
      "Standardized contracts",
      "Higher price volatility",
      "Used for risk management"
    ]
  }
};

export const MarketTypeSelect = ({ value, onChange }: MarketTypeSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select market type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Spot">Spot</SelectItem>
          <SelectItem value="Futures">Futures</SelectItem>
        </SelectContent>
      </Select>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Info className="h-4 w-4 cursor-help text-muted-foreground" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          {value && MARKET_TYPE_INFO[value] && (
            <div className="space-y-2">
              <h4 className="font-semibold">{MARKET_TYPE_INFO[value].name}</h4>
              <p className="text-sm">{MARKET_TYPE_INFO[value].description}</p>
              <div className="text-sm">
                <strong>Characteristics:</strong>
                <ul className="list-disc pl-4">
                  {MARKET_TYPE_INFO[value].characteristics.map((characteristic, index) => (
                    <li key={index}>{characteristic}</li>
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