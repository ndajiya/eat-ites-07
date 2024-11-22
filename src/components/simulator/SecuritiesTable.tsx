import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Security, Trade } from "@/types/securities";
import { Agent } from "@/types/simulator";
import { useToast } from "@/components/ui/use-toast";

interface SecuritiesTableProps {
  securities: Security[];
  agents: Agent[];
  onTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
}

export const SecuritiesTable = ({ securities, agents, onTrade }: SecuritiesTableProps) => {
  const { toast } = useToast();
  const [selectedSecurity, setSelectedSecurity] = useState<Security | null>(null);
  const [tradeQuantity, setTradeQuantity] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<string>("");

  const handleTrade = (type: "Buy" | "Sell") => {
    if (!selectedSecurity || !selectedAgent) {
      toast({
        title: "Error",
        description: "Please select an agent and security to trade",
        variant: "destructive",
      });
      return;
    }

    const agent = agents.find(a => a.name === selectedAgent);
    if (!agent) return;

    if (type === "Buy" && agent.cash < selectedSecurity.price * tradeQuantity) {
      toast({
        title: "Insufficient Funds",
        description: "Agent does not have enough cash for this trade",
        variant: "destructive",
      });
      return;
    }

    onTrade({
      securityId: selectedSecurity.id,
      buyerId: type === "Buy" ? selectedAgent : "MARKET",
      sellerId: type === "Sell" ? selectedAgent : "MARKET",
      quantity: tradeQuantity,
      price: selectedSecurity.price,
      type,
    });

    toast({
      title: "Trade Executed",
      description: `Successfully ${type.toLowerCase()}ed ${tradeQuantity} shares of ${selectedSecurity.name}`,
    });
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Issuer</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {securities.map((security) => (
            <TableRow key={security.id}>
              <TableCell>{security.name}</TableCell>
              <TableCell>{security.class}</TableCell>
              <TableCell>{security.type}</TableCell>
              <TableCell>${security.price.toLocaleString()}</TableCell>
              <TableCell>{security.issuer}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedSecurity(security)}
                    >
                      Trade
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Trade {security.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label>Select Agent</label>
                        <select 
                          className="w-full p-2 border rounded"
                          value={selectedAgent}
                          onChange={(e) => setSelectedAgent(e.target.value)}
                        >
                          <option value="">Select an agent...</option>
                          {agents.map((agent) => (
                            <option key={agent.name} value={agent.name}>
                              {agent.name} (${agent.cash.toLocaleString()})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label>Quantity</label>
                        <Input
                          type="number"
                          min="0"
                          value={tradeQuantity}
                          onChange={(e) => setTradeQuantity(Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <p>Total Cost: ${(security.price * tradeQuantity).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1" 
                          onClick={() => handleTrade("Buy")}
                        >
                          Buy
                        </Button>
                        <Button 
                          className="flex-1" 
                          variant="secondary"
                          onClick={() => handleTrade("Sell")}
                        >
                          Sell
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};