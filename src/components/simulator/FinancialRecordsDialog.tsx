import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "@/types/simulator";
import { LedgerTab } from "./FinancialRecords/LedgerTab";
import { BalanceSheetTab } from "./FinancialRecords/BalanceSheetTab";
import { IncomeStatementTab } from "./FinancialRecords/IncomeStatementTab";
import { CashFlowTab } from "./FinancialRecords/CashFlowTab";

interface FinancialRecordsDialogProps {
  agent: Agent | null;
}

export const FinancialRecordsDialog = ({ agent }: FinancialRecordsDialogProps) => {
  if (!agent) return null;

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{agent.name}'s Financial Records</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[600px]">
        <Tabs defaultValue="ledger" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ledger">Ledger</TabsTrigger>
            <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
            <TabsTrigger value="income">Income Statement</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flows</TabsTrigger>
          </TabsList>

          <TabsContent value="ledger" className="space-y-4">
            <LedgerTab agent={agent} />
          </TabsContent>

          <TabsContent value="balance" className="space-y-4">
            <BalanceSheetTab agent={agent} />
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            <IncomeStatementTab agent={agent} />
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-4">
            <CashFlowTab agent={agent} />
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </DialogContent>
  );
};