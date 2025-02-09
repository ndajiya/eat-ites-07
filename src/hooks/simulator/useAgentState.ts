
import { useState, useEffect } from "react";
import { Agent, EducationLevel } from "@/types/simulator";
import { Bookkeeping } from "@/utils/Bookkeeping";
import associatesAgentData from "@/data/associates-agents.json";
import bachelorsAgentData from "@/data/bachelors-agents.json";

export const useAgentState = (level: EducationLevel) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Select the appropriate data based on education level
    const agentData = level === 'ASSOCIATES' ? associatesAgentData : bachelorsAgentData;
    
    // Initialize agents from JSON data
    const initializedAgents = agentData.agents.map(agent => ({
      ...agent,
      bookkeeping: new Bookkeeping(), // Reinitialize bookkeeping since it can't be serialized in JSON
    }));

    // Apply initial bookkeeping setup for each agent
    initializedAgents.forEach(agent => {
      // Record initial cash balance
      agent.bookkeeping.addTransaction(
        new Date().toISOString(),
        'Assets',
        'Cash',
        agent.cash,
        'Initial cash balance',
        'Increase'
      );

      // For central banks, record monetary policy settings
      if (agent.class === 'CentralBanks' && 'monetaryPolicy' in agent) {
        // Record interest rate as a monetary asset
        agent.bookkeeping.addTransaction(
          new Date().toISOString(),
          'Assets',
          'Interest Rate Reserve',
          agent.monetaryPolicy.interestRate * 100, // Convert to percentage for clearer display
          'Initial interest rate setting',
          'Increase'
        );

        // Record reserve requirement as a monetary asset
        agent.bookkeeping.addTransaction(
          new Date().toISOString(),
          'Assets',
          'Required Reserves',
          agent.monetaryPolicy.reserveRequirement * 100, // Convert to percentage for clearer display
          'Initial reserve requirement setting',
          'Increase'
        );
      }
    });

    setAgents(initializedAgents);
  }, [level]);

  return { agents, setAgents };
};
