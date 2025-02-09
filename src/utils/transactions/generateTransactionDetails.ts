
import { TransactionDetails } from "./types";

export function generateTransactionDetails(agentClass: string, isPositiveChange: boolean): TransactionDetails {
  switch (agentClass) {
    case "Household":
      return isPositiveChange 
        ? {
            accountType: "Revenue",
            accountName: "Wage Income",
            description: "Monthly wage income"
          }
        : {
            accountType: "Expenses",
            accountName: "Living Expenses",
            description: "Monthly household expenses"
          };

    case "Firm":
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Sales Revenue",
            description: "Product sales revenue"
          }
        : {
            accountType: "Expenses",
            accountName: "Operating Expenses",
            description: "Business operating costs"
          };

    case "Government":
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Tax Revenue",
            description: "Tax collection"
          }
        : {
            accountType: "Expenses",
            accountName: "Public Spending",
            description: "Government expenditure"
          };

    case "CentralBanks":
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Interest Income",
            description: "Interest earned on securities"
          }
        : {
            accountType: "Expenses",
            accountName: "Monetary Operations",
            description: "Cost of monetary operations"
          };

    default:
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Trading Income",
            description: "General income"
          }
        : {
            accountType: "Expenses",
            accountName: "Trading Expenses",
            description: "General expenses"
          };
  }
}
