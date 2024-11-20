import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, BookOpen } from "lucide-react";
import { useState } from "react";
import { Agent } from "@/types/simulator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AgentTableProps {
  agents: Agent[];
  onAgentEdit: (agent: Agent) => void;
}

export const AgentTable = ({ agents, onAgentEdit }: AgentTableProps) => {
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [viewingLedger, setViewingLedger] = useState<Agent | null>(null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent</TableHead>
          <TableHead>Cash</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Last Round</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.name}>
            <TableCell>{agent.name}</TableCell>
            <TableCell>${agent.cash.toLocaleString()}</TableCell>
            <TableCell>{agent.class}</TableCell>
            <TableCell
              className={
                agent.lastRoundDifference >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {agent.lastRoundDifference >= 0 ? "+" : ""}$
              {agent.lastRoundDifference.toLocaleString()}
            </TableCell>
            <TableCell className="space-x-2">
              <Dialog open={editingAgent?.name === agent.name} onOpenChange={(open) => !open && setEditingAgent(null)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setEditingAgent(agent)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Agent</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label>Name</label>
                      <Input
                        value={editingAgent?.name}
                        onChange={(e) =>
                          setEditingAgent(prev => prev ? { ...prev, name: e.target.value } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Cash</label>
                      <Input
                        type="number"
                        value={editingAgent?.cash}
                        onChange={(e) =>
                          setEditingAgent(prev => prev ? { ...prev, cash: Number(e.target.value) } : null)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Class</label>
                      <Input
                        value={editingAgent?.class}
                        onChange={(e) =>
                          setEditingAgent(prev => prev ? { ...prev, class: e.target.value } : null)
                        }
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => editingAgent && onAgentEdit(editingAgent)}
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={viewingLedger?.name === agent.name} onOpenChange={(open) => !open && setViewingLedger(null)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setViewingLedger(agent)}>
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
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
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};