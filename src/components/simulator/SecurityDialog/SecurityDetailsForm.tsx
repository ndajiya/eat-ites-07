import { Input } from "@/components/ui/input";
import { Security } from "@/types/securities";
import { Label } from "@/components/ui/label";

interface SecurityDetailsFormProps {
  newSecurity: Omit<Security, "id">;
  onSecurityChange: (field: keyof Omit<Security, "id">, value: any) => void;
}

export const SecurityDetailsForm = ({
  newSecurity,
  onSecurityChange,
}: SecurityDetailsFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="security-name">Name</Label>
        <Input
          id="security-name"
          value={newSecurity.name || ""}
          onChange={(e) => onSecurityChange("name", e.target.value)}
          placeholder="Enter security name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="security-price">Price</Label>
        <Input
          id="security-price"
          type="number"
          value={newSecurity.price}
          onChange={(e) => onSecurityChange("price", Number(e.target.value))}
          placeholder="Enter price"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="security-volatility">Volatility (0-1)</Label>
        <Input
          id="security-volatility"
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={newSecurity.volatility}
          onChange={(e) => onSecurityChange("volatility", Number(e.target.value))}
          placeholder="Enter volatility"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="security-quantity">Quantity</Label>
        <Input
          id="security-quantity"
          type="number"
          value={newSecurity.quantity}
          onChange={(e) => onSecurityChange("quantity", Number(e.target.value))}
          placeholder="Enter quantity"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="security-issuer">Issuer</Label>
        <Input
          id="security-issuer"
          value={newSecurity.issuer || ""}
          onChange={(e) => onSecurityChange("issuer", e.target.value)}
          placeholder="Enter issuer name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="security-description">Description</Label>
        <Input
          id="security-description"
          value={newSecurity.description || ""}
          onChange={(e) => onSecurityChange("description", e.target.value)}
          placeholder="Enter description"
        />
      </div>
    </>
  );
};