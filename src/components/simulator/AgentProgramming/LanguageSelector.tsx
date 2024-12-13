import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  value: "javascript" | "yaml";
  onChange: (value: "javascript" | "yaml") => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="javascript">JavaScript</SelectItem>
        <SelectItem value="yaml">YAML</SelectItem>
      </SelectContent>
    </Select>
  );
};