import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            <AgentsTabContent onFileUpload={(file) => {
              onAgentUpload(file);
              setOpen(false);
            }} />
          </TabsContent>
          <TabsContent value="commodities">
            <CommoditiesTabContent onFileUpload={(file) => {
              onCommodityUpload(file);
              setOpen(false);
            }} />
          </TabsContent>
          <TabsContent value="securities">
            <SecuritiesTabContent onFileUpload={(file) => {
              onSecurityUpload(file);
              setOpen(false);
            }} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};