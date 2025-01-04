import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { AgentsTabContent } from "./upload-dialog/AgentsTabContent";
import { CommoditiesTabContent } from "./upload-dialog/CommoditiesTabContent";
import { SecuritiesTabContent } from "./upload-dialog/SecuritiesTabContent";

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
      <DialogContent className="sm:max-w-[600px]">
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
            <AgentsTabContent onFileUpload={(file) => handleFileUpload(file, "agents")} />
          </TabsContent>
          <TabsContent value="commodities">
            <CommoditiesTabContent onFileUpload={(file) => handleFileUpload(file, "commodities")} />
          </TabsContent>
          <TabsContent value="securities">
            <SecuritiesTabContent onFileUpload={(file) => handleFileUpload(file, "securities")} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};