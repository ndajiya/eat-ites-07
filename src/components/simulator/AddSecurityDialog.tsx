import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { Security, SecurityClass, SecurityType } from "@/types/securities";

interface AddSecurityDialogProps {
  newSecurity: Omit<Security, "id">;
  onSecurityChange: (field: keyof Omit<Security, "id">, value: any) => void;
  onAddSecurity: () => void;
}

const SECURITY_CLASS_INFO: Record<SecurityClass, { description: string; characteristics: string[] }> = {
  Equity: {
    description: "Represents ownership in a company",
    characteristics: ["Voting rights", "Dividend potential", "Capital appreciation"]
  },
  Debt: {
    description: "Fixed income instruments that represent borrowed money",
    characteristics: ["Regular interest payments", "Principal repayment", "Credit risk"]
  },
  Hybrid: {
    description: "Securities that combine characteristics of both equity and debt",
    characteristics: ["Convertibility options", "Variable returns", "Complex structures"]
  },
  Derivative: {
    description: "Financial instruments whose value derives from underlying assets",
    characteristics: ["Leverage potential", "Risk hedging", "Time decay"]
  },
  Government: {
    description: "Securities issued by government entities",
    characteristics: ["High credit quality", "Regular interest payments", "Tax advantages"]
  },
  Fund: {
    description: "Pooled investment vehicles",
    characteristics: ["Professional management", "Diversification", "Economies of scale"]
  }
};

const SECURITY_TYPE_INFO: Record<SecurityType, { description: string; characteristics: string[] }> = {
  CommonStock: {
    description: "Basic ownership shares in a company",
    characteristics: ["Voting rights", "Variable dividends", "Residual claim on assets"]
  },
  PreferredStock: {
    description: "Higher-priority shares with fixed dividends",
    characteristics: ["Fixed dividends", "Priority over common stock", "Limited voting rights"]
  },
  CorporateBond: {
    description: "Debt issued by corporations",
    characteristics: ["Fixed interest payments", "Maturity date", "Credit risk exposure"]
  },
  GovernmentBond: {
    description: "Debt issued by government entities",
    characteristics: ["Sovereign backing", "Regular interest", "High liquidity"]
  },
  ConvertibleBond: {
    description: "Bonds that can be converted to equity",
    characteristics: ["Conversion option", "Fixed income", "Equity upside"]
  },
  Future: {
    description: "Contracts for future delivery of assets",
    characteristics: ["Standardized terms", "Leverage", "Daily settlement"]
  },
  Option: {
    description: "Rights to buy or sell assets at set prices",
    characteristics: ["Time decay", "Strike price", "Premium payment"]
  },
  ETF: {
    description: "Exchange-traded investment funds",
    characteristics: ["Intraday trading", "Index tracking", "Transparency"]
  },
  MutualFund: {
    description: "Professionally managed investment pools",
    characteristics: ["Daily NAV pricing", "Professional management", "Diversification"]
  }
};

export const AddSecurityDialog = ({
  newSecurity,
  onSecurityChange,
  onAddSecurity,
}: AddSecurityDialogProps) => {
  const securityClasses: SecurityClass[] = ["Equity", "Debt", "Hybrid", "Derivative", "Government", "Fund"];
  const securityTypes: SecurityType[] = [
    "CommonStock", "PreferredStock", "CorporateBond", "GovernmentBond",
    "ConvertibleBond", "Future", "Option", "ETF", "MutualFund"
  ];

  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Add New Security</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[calc(90vh-120px)] pr-4">
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Name</label>
            <Input
              value={newSecurity.name}
              onChange={(e) => onSecurityChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label>Class</label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  {newSecurity.class && SECURITY_CLASS_INFO[newSecurity.class] && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">{newSecurity.class}</h4>
                      <p className="text-sm">{SECURITY_CLASS_INFO[newSecurity.class].description}</p>
                      <div className="text-sm">
                        <strong>Characteristics:</strong>
                        <ul className="list-disc pl-4">
                          {SECURITY_CLASS_INFO[newSecurity.class].characteristics.map((characteristic, index) => (
                            <li key={index}>{characteristic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </HoverCardContent>
              </HoverCard>
            </div>
            <Select
              value={newSecurity.class}
              onValueChange={(value) => onSecurityChange("class", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {securityClasses.map((secClass) => (
                  <SelectItem key={secClass} value={secClass}>
                    {secClass}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label>Type</label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  {newSecurity.type && SECURITY_TYPE_INFO[newSecurity.type] && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">{newSecurity.type}</h4>
                      <p className="text-sm">{SECURITY_TYPE_INFO[newSecurity.type].description}</p>
                      <div className="text-sm">
                        <strong>Characteristics:</strong>
                        <ul className="list-disc pl-4">
                          {SECURITY_TYPE_INFO[newSecurity.type].characteristics.map((characteristic, index) => (
                            <li key={index}>{characteristic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </HoverCardContent>
              </HoverCard>
            </div>
            <Select
              value={newSecurity.type}
              onValueChange={(value) => onSecurityChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {securityTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Price</label>
            <Input
              type="number"
              value={newSecurity.price}
              onChange={(e) => onSecurityChange("price", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label>Volatility (0-1)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={newSecurity.volatility}
              onChange={(e) => onSecurityChange("volatility", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label>Quantity</label>
            <Input
              type="number"
              value={newSecurity.quantity}
              onChange={(e) => onSecurityChange("quantity", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label>Issuer</label>
            <Input
              value={newSecurity.issuer}
              onChange={(e) => onSecurityChange("issuer", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label>Description</label>
            <Input
              value={newSecurity.description}
              onChange={(e) => onSecurityChange("description", e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={onAddSecurity}>
            Add Security
          </Button>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};