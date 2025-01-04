import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Security } from "@/types/securities";
import * as XLSX from "xlsx";

interface SecuritiesTabContentProps {
  onFileUpload: (file: File) => void;
}

export const SecuritiesTabContent = ({ onFileUpload }: SecuritiesTabContentProps) => {
  const downloadTemplate = () => {
    const headers = ["id", "name", "class", "type", "price", "volatility", "quantity", "issuer", "description"];
    const exampleData = [
      {
        id: "SEC001",
        name: "Example Security",
        class: "Equity",
        type: "CommonStock",
        price: 100,
        volatility: 0.15,
        quantity: 1000,
        issuer: "Example Corp",
        description: "Example security description",
      }
    ];

    const ws = XLSX.utils.json_to_sheet(exampleData, { header: headers });
    const dropdownWs = XLSX.utils.aoa_to_sheet([
      ["Valid Options for Securities"],
      ["Classes:", "Equity", "Debt", "Hybrid", "Derivative", "Government", "Fund"],
      ["Types:", "CommonStock", "PreferredStock", "CorporateBond", "GovernmentBond", "ConvertibleBond", "Future", "Option", "ETF", "MutualFund"]
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.utils.book_append_sheet(wb, dropdownWs, "Valid Options");
    
    XLSX.writeFile(wb, "securities_template.xlsx");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-sm text-muted-foreground">
        Upload an Excel or CSV file containing security data. Required columns: id, name, class, type, price, volatility, quantity, issuer, description
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
            if (file) onFileUpload(file);
          }}
          className="cursor-pointer flex-1"
        />
      </div>
    </div>
  );
};