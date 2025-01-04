import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { AGENT_CLASSES } from "@/types/agentClasses";
import { COMMODITY_CLASSES, COMMODITY_TYPES } from "@/types/commodityTypes";

interface DataUploadDialogProps {
  onAgentUpload: (agents: Agent[]) => void;
  onCommodityUpload: (commodities: Commodity[]) => void;
  onSecurityUpload: (securities: Security[]) => void;
}

export const DataUploadDialog = ({
  onAgentUpload,
  onCommodityUpload,
  onSecurityUpload,
}: DataUploadDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const downloadTemplate = (type: "agents" | "commodities" | "securities") => {
    let headers: string[] = [];
    let exampleData: any[] = [];

    switch (type) {
      case "agents":
        headers = ["name", "cash", "class"];
        exampleData = [
          {
            name: "Example Agent",
            cash: 10000,
            class: Object.keys(AGENT_CLASSES)[0],
          }
        ];
        break;

      case "commodities":
        headers = ["name", "averagePrice", "priceTrend", "class", "type", "marketType"];
        exampleData = [
          {
            name: "Example Commodity",
            averagePrice: 100,
            priceTrend: "Up",
            class: Object.keys(COMMODITY_CLASSES)[0],
            type: Object.keys(COMMODITY_TYPES)[0],
            marketType: "Spot",
          }
        ];
        break;

      case "securities":
        headers = ["id", "name", "class", "type", "price", "volatility", "quantity", "issuer", "description"];
        exampleData = [
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
        break;
    }

    const ws = XLSX.utils.json_to_sheet(exampleData, { header: headers });

    // Add dropdown options in a separate worksheet
    const dropdownWs = XLSX.utils.aoa_to_sheet([
      ["Valid Classes/Types for " + type],
      ...(type === "agents" 
        ? Object.keys(AGENT_CLASSES).map(key => [key])
        : type === "commodities"
        ? [
            ["Classes:", ...Object.keys(COMMODITY_CLASSES)],
            ["Types:", ...Object.keys(COMMODITY_TYPES)],
            ["Market Types:", "Spot", "Futures"]
          ]
        : [
            ["Classes:", "Equity", "Debt", "Hybrid", "Derivative", "Government", "Fund"],
            ["Types:", "CommonStock", "PreferredStock", "CorporateBond", "GovernmentBond", "ConvertibleBond", "Future", "Option", "ETF", "MutualFund"]
          ]
      )
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.utils.book_append_sheet(wb, dropdownWs, "Valid Options");
    
    XLSX.writeFile(wb, `${type}_template.xlsx`);
  };

  const handleFileUpload = (file: File, type: "agents" | "commodities" | "securities") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        switch (type) {
          case "agents":
            const agents = jsonData.map((item: any) => ({
              name: item.name,
              cash: Number(item.cash),
              class: item.class,
              lastRoundDifference: 0,
              bookkeeping: new Bookkeeping(),
              inventory: [],
              production: item.production ? JSON.parse(item.production) : undefined,
              monetaryPolicy: item.monetaryPolicy ? JSON.parse(item.monetaryPolicy) : undefined,
            }));
            onAgentUpload(agents);
            break;

          case "commodities":
            const commodities = jsonData.map((item: any) => ({
              name: item.name,
              averagePrice: Number(item.averagePrice),
              priceTrend: item.priceTrend as "Up" | "Down",
              class: item.class,
              type: item.type,
              marketType: item.marketType,
            }));
            onCommodityUpload(commodities);
            break;

          case "securities":
            const securities = jsonData.map((item: any) => ({
              id: item.id,
              name: item.name,
              class: item.class,
              type: item.type,
              price: Number(item.price),
              volatility: Number(item.volatility),
              quantity: Number(item.quantity),
              issuer: item.issuer,
              description: item.description,
              marketCap: item.marketCap ? Number(item.marketCap) : undefined,
              interestRate: item.interestRate ? Number(item.interestRate) : undefined,
              maturityDate: item.maturityDate,
              strikePrice: item.strikePrice ? Number(item.strikePrice) : undefined,
              underlyingAsset: item.underlyingAsset,
            }));
            onSecurityUpload(securities);
            break;
        }

        toast({
          title: "Upload Successful",
          description: `${type} data has been imported successfully.`,
        });
        setOpen(false);
      } catch (error) {
        console.error("Error parsing file:", error);
        toast({
          title: "Upload Failed",
          description: "There was an error processing your file. Please check the format and try again.",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          Import Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
          <DialogDescription>
            Upload Excel or CSV files to import agents, commodities, or securities data.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="securities">Securities</TabsTrigger>
          </TabsList>
          <TabsContent value="agents">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Upload an Excel or CSV file containing agent data. Required columns: name, cash, class
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadTemplate("agents")}
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
                    if (file) handleFileUpload(file, "agents");
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="commodities">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Upload an Excel or CSV file containing commodity data. Required columns: name, averagePrice, priceTrend, class, type, marketType
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadTemplate("commodities")}
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
                    if (file) handleFileUpload(file, "commodities");
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="securities">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Upload an Excel or CSV file containing security data. Required columns: id, name, class, type, price, volatility, quantity, issuer, description
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadTemplate("securities")}
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
                    if (file) handleFileUpload(file, "securities");
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};