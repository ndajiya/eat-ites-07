
import { Agent } from "@/types/simulator";
import { Transaction } from "./types";
import { generateTransactionDetails } from "./generateTransactionDetails";

export function generateTransactions(agents: Agent[], currentRound: number): Transaction[] {
  return agents.map((agent) => {
    const baseChange = Math.floor(Math.random() * 201) - 100;
    const transactionDetails = generateTransactionDetails(agent.class, baseChange >= 0);

    return {
      agentId: agent.name,
      cashChange: baseChange,
      date: new Date().toISOString().split('T')[0],
      description: `Round ${currentRound}: ${transactionDetails.description}`,
      accountName: transactionDetails.accountName,
      accountType: transactionDetails.accountType
    };
  });
}
