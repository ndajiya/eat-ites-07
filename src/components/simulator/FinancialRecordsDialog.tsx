import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "@/types/simulator";

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agent.bookkeeping.getLedger().map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell>${Math.abs(transaction.amount).toLocaleString()}</TableCell>
                    <TableCell>{transaction.entryType}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="balance" className="space-y-4">
            {(() => {
              const balanceSheet = agent.bookkeeping.generateBalanceSheet();
              return (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Assets</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {balanceSheet.assets.map(({ account, balance }) => (
                          <TableRow key={account}>
                            <TableCell>{account}</TableCell>
                            <TableCell>${balance.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Liabilities</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {balanceSheet.liabilities.map(({ account, balance }) => (
                          <TableRow key={account}>
                            <TableCell>{account}</TableCell>
                            <TableCell>${Math.abs(balance).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Equity</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {balanceSheet.equity.map(({ account, balance }) => (
                          <TableRow key={account}>
                            <TableCell>{account}</TableCell>
                            <TableCell>${Math.abs(balance).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              );
            })()}
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            {(() => {
              const income = agent.bookkeeping.generateIncomeStatement();
              return (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">Revenue</TableCell>
                      <TableCell>${income.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Expenses</TableCell>
                      <TableCell>${income.expenses.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Net Income</TableCell>
                      <TableCell className={income.netIncome >= 0 ? "text-green-500" : "text-red-500"}>
                        ${income.netIncome.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            })()}
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-4">
            {(() => {
              const cashFlows = agent.bookkeeping.generateCashFlows();
              return (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">Operating Activities</TableCell>
                      <TableCell>${cashFlows.operating.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Investing Activities</TableCell>
                      <TableCell>${cashFlows.investing.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Financing Activities</TableCell>
                      <TableCell>${cashFlows.financing.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Net Cash Flow</TableCell>
                      <TableCell className={cashFlows.netCashFlow >= 0 ? "text-green-500" : "text-red-500"}>
                        ${cashFlows.netCashFlow.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            })()}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </DialogContent>
  );
};