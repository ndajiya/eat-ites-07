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
  const [buyerId, setBuyerId] = useState<string>("");
  const [sellerId, setSellerId] = useState<string>("");

  const handleTrade = () => {
    if (!selectedSecurity || !buyerId || !sellerId) {
      toast({
        title: "Error",
        description: "Please select both a buyer and seller to trade",
        variant: "destructive",
      });
      return;
    }

    if (buyerId === sellerId) {
      toast({
        title: "Error",
        description: "Buyer and seller cannot be the same agent",
        variant: "destructive",
      });
      return;
    }

    const buyer = agents.find(a => a.name === buyerId);
    if (!buyer) return;

    if (buyer.cash < selectedSecurity.price * tradeQuantity) {
      toast({
        title: "Insufficient Funds",
        description: "Buyer does not have enough cash for this trade",
        variant: "destructive",
      });
      return;
    }

    onTrade({
      securityId: selectedSecurity.id,
      buyerId,
      sellerId,
      quantity: tradeQuantity,
      price: selectedSecurity.price,
      type: "Trade",
    });

    toast({
      title: "Trade Executed",
      description: `Successfully traded ${tradeQuantity} shares of ${selectedSecurity.name}`,
    });

    // Reset form
    setBuyerId("");
    setSellerId("");
    setTradeQuantity(0);
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
                        <label>Select Buyer</label>
                        <select 
                          className="w-full p-2 border rounded bg-background text-foreground dark:bg-secondary dark:text-secondary-foreground"
                          value={buyerId}
                          onChange={(e) => setBuyerId(e.target.value)}
                        >
                          <option value="">Select buyer...</option>
                          {agents.map((agent) => (
                            <option key={agent.name} value={agent.name}>
                              {agent.name} (${agent.cash.toLocaleString()})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label>Select Seller</label>
                        <select 
                          className="w-full p-2 border rounded bg-background text-foreground dark:bg-secondary dark:text-secondary-foreground"
                          value={sellerId}
                          onChange={(e) => setSellerId(e.target.value)}
                        >
                          <option value="">Select seller...</option>
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
                      <Button 
                        className="w-full" 
                        onClick={handleTrade}
                      >
                        Execute Trade
                      </Button>
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