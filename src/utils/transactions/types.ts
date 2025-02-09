
export interface Transaction {
  agentId: string;
  cashChange: number;
  date: string;
  description: string;
  accountName: string;
  accountType: "Revenue" | "Expenses" | "Assets" | "Liabilities";
}

export interface TransactionDetails {
  accountType: "Revenue" | "Expenses" | "Assets" | "Liabilities";
  accountName: string;
  description: string;
}
