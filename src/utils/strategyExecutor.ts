import { Agent, Commodity } from "@/types/simulator";
import yaml from "js-yaml";

interface TradingDecision {
  action: 'buy' | 'sell' | 'hold';
  commodity?: string;
  quantity?: number;
}

interface StrategyData {
  language: "javascript" | "yaml";
  code: string;
}

const executeYamlStrategy = (yamlCode: string, agent: Agent, market: { commodities: Commodity[] }): TradingDecision => {
  try {
    const strategy = yaml.load(yamlCode) as any;
    
    if (!strategy.conditions) {
      return { action: 'hold' };
    }

    for (const condition of strategy.conditions) {
      if (condition.if) {
        // Parse simple conditions
        const conditionMet = new Function('agent', 'market', `return ${condition.if}`)(agent, market);
        if (conditionMet) {
          return condition.then as TradingDecision;
        }
      } else if (condition.else) {
        return condition.else as TradingDecision;
      }
    }

    return { action: 'hold' };
  } catch (error) {
    console.error("Error executing YAML strategy:", error);
    return { action: 'hold' };
  }
};

export const executeStrategy = (
  strategyCode: string,
  agent: Agent,
  commodities: Commodity[]
): TradingDecision => {
  try {
    const { language, code } = JSON.parse(strategyCode) as StrategyData;
    const market = { commodities };

    if (language === "yaml") {
      return executeYamlStrategy(code, agent, market);
    } else {
      const strategyFn = new Function("agent", "market", code);
      const decision = strategyFn(agent, market);
      
      if (!decision || !decision.action) {
        console.error("Invalid strategy result format");
        return { action: 'hold' };
      }
      
      return decision;
    }
  } catch (error) {
    console.error("Error executing strategy:", error);
    return { action: 'hold' };
  }
};