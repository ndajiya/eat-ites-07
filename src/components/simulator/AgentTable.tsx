import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, BookOpen } from "lucide-react";
import { useState } from "react";
import { Agent } from "@/types/simulator";
import { ScrollArea } from "@/components/ui/scroll-area";

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
                    <DialogTitle>{agent.name}'s Ledger</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Account Balances</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Account</TableHead>
                              <TableHead>Balance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {agent.bookkeeping.getAccountBalances().map(({ account, balance }) => (
                              <TableRow key={account}>
                                <TableCell>{account}</TableCell>
                                <TableCell>${balance.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Transaction History</h3>
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
                      </div>
                    </div>
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