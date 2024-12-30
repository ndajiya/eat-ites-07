import { Input } from "@/components/ui/input";
import { Security } from "@/types/securities";

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
        <label>Name</label>
        <Input
          value={newSecurity.name}
          onChange={(e) => onSecurityChange("name", e.target.value)}
        />
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
    </>
  );
};