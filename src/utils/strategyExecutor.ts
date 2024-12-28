import { Agent, Commodity } from "@/types/simulator";
import yaml from "js-yaml";

interface TradingDecision {
  action: 'buy' | 'sell' | 'hold';
  commodity?: string;
  quantity?: number;
}

interface StrategyData {
  language: "javascript" | "typescript" | "python" | "yaml";
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

const executePythonStrategy = async (pythonCode: string, agent: Agent, market: { commodities: Commodity[] }): Promise<TradingDecision> => {
  try {
    // Using Pyodide for Python execution in browser
    // Note: This is a simplified example. In production, you'd want to properly initialize Pyodide
    const pyodide = (window as any).pyodide;
    if (!pyodide) {
      console.error("Pyodide not loaded");
      return { action: 'hold' };
    }

    // Convert JS objects to Python
    await pyodide.runPythonAsync(`
      import json
      agent = json.loads('${JSON.stringify(agent)}')
      market = json.loads('${JSON.stringify({ commodities: market.commodities })}')
      ${pythonCode}
      result = trading_strategy(agent, market)
    `);

    const result = pyodide.globals.get('result').toJs();
    return result as TradingDecision;
  } catch (error) {
    console.error("Error executing Python strategy:", error);
    return { action: 'hold' };
  }
};

export const executeStrategy = async (
  strategyCode: string,
  agent: Agent,
  commodities: Commodity[]
): Promise<TradingDecision> => {
  try {
    const { language, code } = JSON.parse(strategyCode) as StrategyData;
    const market = { commodities };

    switch (language) {
      case "yaml":
        return executeYamlStrategy(code, agent, market);
      case "python":
        return await executePythonStrategy(code, agent, market);
      case "typescript":
      case "javascript":
        const strategyFn = new Function("agent", "market", code);
        const decision = strategyFn(agent, market);
        
        if (!decision || !decision.action) {
          console.error("Invalid strategy result format");
          return { action: 'hold' };
        }
        
        return decision;
      default:
        console.error("Unsupported language");
        return { action: 'hold' };
    }
  } catch (error) {
    console.error("Error executing strategy:", error);
    return { action: 'hold' };
  }
};