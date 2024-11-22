import { Agent, Inventory, Commodity } from "@/types/simulator";
import { calculateUtility } from "./rationalAgent/utilityCalculator";
import { UtilityParameters } from "./rationalAgent/types";

interface InventoryDecision {
  action: 'buy' | 'sell' | 'hold';
  quantity: number;
  expectedUtility: number;
}

export const calculateInventoryUtility = (
  currentInventory: Inventory[],
  cash: number,
  marketPrice: number,
  holdingCost: number = 0.1
): number => {
  const totalValue = currentInventory.reduce(
    (sum, item) => sum + item.quantity * item.averagePurchasePrice,
    0
  );
  
  const diversificationBonus = currentInventory.length > 1 ? 0.1 : 0;
  const cashReserveRatio = cash / (totalValue + cash);
  
  return totalValue * (1 - holdingCost) + (cash * cashReserveRatio) + (totalValue * diversificationBonus);
};

export const getOptimalInventoryDecision = (
  agent: Agent,
  commodity: Commodity,
  utilityParams: UtilityParameters
): InventoryDecision => {
  const currentHolding = agent.inventory.find(
    item => item.commodityName === commodity.name
  );
  
  const currentQuantity = currentHolding?.quantity || 0;
  const currentValue = calculateInventoryUtility(
    agent.inventory,
    agent.cash,
    commodity.averagePrice
  );

  // Calculate utility for buying
  const potentialBuyQuantity = Math.floor(agent.cash / commodity.averagePrice);
  const buyUtility = potentialBuyQuantity > 0 
    ? calculateUtility({
        ...utilityParams,
        values: {
          ...utilityParams.values,
          vasopressin: currentValue + (potentialBuyQuantity * commodity.averagePrice),
          GABA: agent.cash - (potentialBuyQuantity * commodity.averagePrice)
        }
      })
    : -Infinity;

  // Calculate utility for selling
  const sellUtility = currentQuantity > 0
    ? calculateUtility({
        ...utilityParams,
        values: {
          ...utilityParams.values,
          vasopressin: currentValue - (currentQuantity * commodity.averagePrice),
          GABA: agent.cash + (currentQuantity * commodity.averagePrice)
        }
      })
    : -Infinity;

  // Calculate utility for holding
  const holdUtility = calculateUtility(utilityParams);

  // Determine optimal action
  if (buyUtility > holdUtility && buyUtility > sellUtility) {
    return {
      action: 'buy',
      quantity: potentialBuyQuantity,
      expectedUtility: buyUtility
    };
  } else if (sellUtility > holdUtility && sellUtility > buyUtility) {
    return {
      action: 'sell',
      quantity: currentQuantity,
      expectedUtility: sellUtility
    };
  }

  return {
    action: 'hold',
    quantity: 0,
    expectedUtility: holdUtility
  };
};

export const getInventoryStats = (inventory: Inventory[]) => {
  return {
    totalItems: inventory.reduce((sum, item) => sum + item.quantity, 0),
    totalValue: inventory.reduce(
      (sum, item) => sum + item.quantity * item.averagePurchasePrice,
      0
    ),
    uniqueItems: inventory.length,
    averagePrice: inventory.reduce(
      (sum, item) => sum + item.averagePurchasePrice,
      0
    ) / inventory.length || 0
  };
};