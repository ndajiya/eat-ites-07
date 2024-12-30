import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Security, SecurityClass, SecurityType } from "@/types/securities";

interface AddSecurityDialogProps {
  newSecurity: Omit<Security, "id">;
  onSecurityChange: (field: keyof Omit<Security, "id">, value: any) => void;
  onAddSecurity: () => void;
}

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
    <DialogContent className="sm:max-w-[425px] max-h-[90vh] p-0">
      <DialogHeader className="p-6 pb-0">
        <DialogTitle>Add New Security</DialogTitle>
      </DialogHeader>
      <ScrollArea className="px-6 pb-6">
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Name</label>
            <Input
              value={newSecurity.name}
              onChange={(e) => onSecurityChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label>Class</label>
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
            <label>Type</label>
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