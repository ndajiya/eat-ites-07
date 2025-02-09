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
      agent.bookkeeping.recordTransaction({
        date: new Date().toISOString(),
        accountType: 'Assets',
        account: 'Cash',
        amount: agent.cash,
        entryType: 'Initial Balance',
        description: 'Initial cash balance'
      });

      // For central banks, record monetary policy settings
      if (agent.class === 'CentralBanks' && 'monetaryPolicy' in agent) {
        agent.bookkeeping.recordTransaction({
          date: new Date().toISOString(),
          accountType: 'Policy',
          account: 'Interest Rate',
          amount: agent.monetaryPolicy.interestRate,
          entryType: 'Policy Setting',
          description: 'Initial interest rate setting'
        });

        agent.bookkeeping.recordTransaction({
          date: new Date().toISOString(),
          accountType: 'Policy',
          account: 'Reserve Requirement',
          amount: agent.monetaryPolicy.reserveRequirement,
          entryType: 'Policy Setting',
          description: 'Initial reserve requirement setting'
        });
      }
    });

    setAgents(initializedAgents);
  }, [level]);

  return { agents, setAgents };
};
