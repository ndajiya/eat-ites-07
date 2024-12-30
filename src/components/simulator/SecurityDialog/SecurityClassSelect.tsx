import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SecurityClass } from "@/types/securities";
import { SECURITY_CLASS_INFO } from "./securityInfo";
import { SecurityInfoTooltip } from "./SecurityInfoTooltip";

interface SecurityClassSelectProps {
  value: SecurityClass;
  onChange: (value: SecurityClass) => void;
}

export const SecurityClassSelect = ({ value, onChange }: SecurityClassSelectProps) => {
  const securityClasses: SecurityClass[] = ["Equity", "Debt", "Hybrid", "Derivative", "Government", "Fund"];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label>Class</label>
        {value && SECURITY_CLASS_INFO[value] && (
          <SecurityInfoTooltip
            title={value}
            description={SECURITY_CLASS_INFO[value].description}
            characteristics={SECURITY_CLASS_INFO[value].characteristics}
          />
        )}
      </div>
      <Select value={value} onValueChange={onChange}>
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
  );
};