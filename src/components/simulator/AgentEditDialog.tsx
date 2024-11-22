import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Agent, Inventory, Production } from "@/types/simulator";
import { AgentClassSelect } from "./AgentClassSelect";
import { Plus, Minus } from "lucide-react";

interface AgentEditDialogProps {
  agent: Agent | null;
  onAgentChange: (agent: Agent) => void;
  onSave: (agent: Agent) => void;
}

export const AgentEditDialog = ({ agent, onAgentChange, onSave }: AgentEditDialogProps) => {
  if (!agent) return null;

  const handleNameChange = (value: string) => {
    onAgentChange({ ...agent, name: value });
  };

  const handleCashChange = (value: number) => {
    onAgentChange({ ...agent, cash: value });
  };

  const handleClassChange = (value: string) => {
    onAgentChange({ ...agent, class: value });
  };

  const handleInventoryChange = (index: number, field: keyof Inventory, value: string | number) => {
    const newInventory = [...agent.inventory];
    newInventory[index] = { ...newInventory[index], [field]: value };
    onAgentChange({ ...agent, inventory: newInventory });
  };

  const addInventoryItem = () => {
    onAgentChange({
      ...agent,
      inventory: [...agent.inventory, { commodityName: "", quantity: 0, averagePurchasePrice: 0 }]
    });
  };

  const removeInventoryItem = (index: number) => {
    const newInventory = agent.inventory.filter((_, i) => i !== index);
    onAgentChange({ ...agent, inventory: newInventory });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Agent</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label>Name</label>
          <Input
            value={agent.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label>Cash</label>
          <Input
            type="number"
            value={agent.cash}
            onChange={(e) => handleCashChange(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label>Class</label>
          <AgentClassSelect
            value={agent.class}
            onChange={handleClassChange}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label>Inventory</label>
            <Button variant="outline" size="sm" onClick={addInventoryItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {agent.inventory.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Commodity"
                value={item.commodityName}
                onChange={(e) => handleInventoryChange(index, "commodityName", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleInventoryChange(index, "quantity", Number(e.target.value))}
              />
              <Input
                type="number"
                placeholder="Avg. Price"
                value={item.averagePurchasePrice}
                onChange={(e) => handleInventoryChange(index, "averagePurchasePrice", Number(e.target.value))}
              />
              <Button variant="ghost" size="icon" onClick={() => removeInventoryItem(index)}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => onSave(agent)}
        >
          Save Changes
        </Button>
      </div>
    </DialogContent>
  );
};