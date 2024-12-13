import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Agent, Inventory } from "@/types/simulator";
import { Plus, Minus } from "lucide-react";

interface InventorySectionProps {
  agent: Agent;
  onAgentChange: (agent: Agent) => void;
}

export const InventorySection = ({ agent, onAgentChange }: InventorySectionProps) => {
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
  );
};