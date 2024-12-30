import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SecurityType } from "@/types/securities";
import { SECURITY_TYPE_INFO } from "./securityInfo";
import { SecurityInfoTooltip } from "./SecurityInfoTooltip";

interface SecurityTypeSelectProps {
  value: SecurityType;
  onChange: (value: SecurityType) => void;
}

export const SecurityTypeSelect = ({ value, onChange }: SecurityTypeSelectProps) => {
  const securityTypes: SecurityType[] = [
    "CommonStock", "PreferredStock", "CorporateBond", "GovernmentBond",
    "ConvertibleBond", "Future", "Option", "ETF", "MutualFund"
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label>Type</label>
        {value && SECURITY_TYPE_INFO[value] && (
          <SecurityInfoTooltip
            title={value}
            description={SECURITY_TYPE_INFO[value].description}
            characteristics={SECURITY_TYPE_INFO[value].characteristics}
          />
        )}
      </div>
      <Select value={value} onValueChange={onChange}>
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
  );
};