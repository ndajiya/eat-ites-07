import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AGENT_CLASSES } from "@/types/agentClasses";
import { Agent } from "@/types/simulator";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

interface AgentsTabContentProps {
  onFileUpload: (agents: Agent[]) => void;
}

export const AgentsTabContent = ({ onFileUpload }: AgentsTabContentProps) => {
  const { toast } = useToast();

  const downloadTemplate = () => {
    const headers = ["name", "cash", "class"];
    const exampleData = [
      {
        name: "Example Agent",
        cash: 10000,
        class: Object.keys(AGENT_CLASSES)[0],
      }
    ];

    const ws = XLSX.utils.json_to_sheet(exampleData, { header: headers });
    const dropdownWs = XLSX.utils.aoa_to_sheet([
      ["Valid Classes for Agents"],
      ...Object.keys(AGENT_CLASSES).map(key => [key])
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.utils.book_append_sheet(wb, dropdownWs, "Valid Options");
    
    XLSX.writeFile(wb, "agents_template.xlsx");
  };

  const handleFileUpload = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const agents = jsonData.map((row: any) => ({
        name: row.name,
        cash: Number(row.cash),
        class: row.class,
        lastRoundDifference: 0,
        bookkeeping: new Bookkeeping(),
        inventory: []
      }));

      onFileUpload(agents);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse the uploaded file. Please check the format.",
        variant: "destructive",
      });
      console.error("File upload error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-sm text-muted-foreground">
        Upload an Excel or CSV file containing agent data. Required columns: name, cash, class
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={downloadTemplate}
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
            if (file) handleFileUpload(file);
          }}
          className="cursor-pointer flex-1"
        />
      </div>
    </div>
  );
};