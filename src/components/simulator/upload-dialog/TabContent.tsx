import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface TabContentProps {
  description: string;
  onFileUpload: (file: File) => void;
  onDownloadTemplate: () => void;
}

export const TabContent = ({ description, onFileUpload, onDownloadTemplate }: TabContentProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadTemplate}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download Template
        </Button>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileUpload(file);
          }}
          className="cursor-pointer flex-1"
        />
      </div>
    </div>
  );
};