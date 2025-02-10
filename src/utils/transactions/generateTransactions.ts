
import { Agent } from "@/types/simulator";
import { Transaction } from "./types";
import { generateTransactionDetails } from "./generateTransactionDetails";

export function generateTransactions(agents: Agent[], currentRound: number): Transaction[] {
  const defaultRetentionPeriod = 365; // 1 year retention by default
  const defaultDataController = "Educational Institution";

  return agents.map((agent) => {
    const baseChange = Math.floor(Math.random() * 201) - 100;
    const transactionDetails = generateTransactionDetails(agent.class, baseChange >= 0);
    const currentDate = new Date().toISOString();

    return {
      agentId: agent.name,
      cashChange: baseChange,
      date: currentDate.split('T')[0],
      description: `Round ${currentRound}: ${transactionDetails.description}`,
      accountName: transactionDetails.accountName,
      accountType: transactionDetails.accountType,
      dataRetentionPeriod: defaultRetentionPeriod,
      personalDataCategory: transactionDetails.personalDataCategory,
      accessLevel: transactionDetails.accessLevel,
      lastModified: currentDate,
      dataController: defaultDataController
    };
  });
}

