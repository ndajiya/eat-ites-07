import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { COMMODITY_CLASSES, COMMODITY_TYPES } from "@/types/commodityTypes";
import { Commodity } from "@/types/simulator";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

interface CommoditiesTabContentProps {
  onFileUpload: (commodities: Commodity[]) => void;
}

export const CommoditiesTabContent = ({ onFileUpload }: CommoditiesTabContentProps) => {
  const { toast } = useToast();

  const downloadTemplate = () => {
    const headers = ["name", "averagePrice", "priceTrend", "class", "type", "marketType"];
    const exampleData = [
      {
        name: "Example Commodity",
        averagePrice: 100,
        priceTrend: "Up",
        class: Object.keys(COMMODITY_CLASSES)[0],
        type: Object.keys(COMMODITY_TYPES)[0],
        marketType: "Spot",
      }
    ];

    const ws = XLSX.utils.json_to_sheet(exampleData, { header: headers });
    const dropdownWs = XLSX.utils.aoa_to_sheet([
      ["Valid Options for Commodities"],
      ["Classes:", ...Object.keys(COMMODITY_CLASSES)],
      ["Types:", ...Object.keys(COMMODITY_TYPES)],
      ["Market Types:", "Spot", "Futures"]
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.utils.book_append_sheet(wb, dropdownWs, "Valid Options");
    
    XLSX.writeFile(wb, "commodities_template.xlsx");
  };

  const handleFileUpload = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const commodities = jsonData.map((row: any) => ({
        name: row.name,
        averagePrice: Number(row.averagePrice),
        priceTrend: row.priceTrend as "Up" | "Down",
        class: row.class,
        type: row.type,
        marketType: row.marketType,
      }));

      onFileUpload(commodities);
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
        Upload an Excel or CSV file containing commodity data. Required columns: name, averagePrice, priceTrend, class, type, marketType
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