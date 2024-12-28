import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Security, Trade } from "@/types/securities";
import { Agent } from "@/types/simulator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface SecurityTradeDialogProps {
  security: Security | null;
  agents: Agent[];
  onTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
}

export const SecurityTradeDialog = ({
  security,
  agents,
  onTrade,
}: SecurityTradeDialogProps) => {
  const { toast } = useToast();
  const [buyerId, setBuyerId] = useState<string>("");
  const [sellerId, setSellerId] = useState<string>("");
  const [tradeQuantity, setTradeQuantity] = useState(0);

  if (!security) return null;

  const handleTrade = () => {
    if (!buyerId || !sellerId) {
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

    if (buyer.cash < security.price * tradeQuantity) {
      toast({
        title: "Insufficient Funds",
        description: "Buyer does not have enough cash for this trade",
        variant: "destructive",
      });
      return;
    }

    onTrade({
      securityId: security.id,
      buyerId,
      sellerId,
      quantity: tradeQuantity,
      price: security.price,
      type: "Buy",
    });

    toast({
      title: "Trade Executed",
      description: `Successfully traded ${tradeQuantity} shares of ${security.name}`,
    });

    setBuyerId("");
    setSellerId("");
    setTradeQuantity(0);
  };

  return (
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
        <Button className="w-full" onClick={handleTrade}>
          Execute Trade
        </Button>
      </div>
    </DialogContent>
  );
};
