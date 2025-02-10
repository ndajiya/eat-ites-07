
import { TransactionDetails } from "./types";

export function generateTransactionDetails(agentClass: string, isPositiveChange: boolean): TransactionDetails {
  switch (agentClass) {
    case "Household":
      return isPositiveChange 
        ? {
            accountType: "Revenue",
            accountName: "Wage Income",
            description: "Monthly wage income",
            personalDataCategory: "Financial",
            accessLevel: "Private"
          }
        : {
            accountType: "Expenses",
            accountName: "Living Expenses",
            description: "Monthly household expenses",
            personalDataCategory: "Financial",
            accessLevel: "Private"
          };

    case "Firm":
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Sales Revenue",
            description: "Product sales revenue",
            personalDataCategory: "Financial",
            accessLevel: "Restricted"
          }
        : {
            accountType: "Expenses",
            accountName: "Operating Expenses",
            description: "Business operating costs",
            personalDataCategory: "Financial",
            accessLevel: "Restricted"
          };

    case "Government":
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Tax Revenue",
            description: "Tax collection",
            personalDataCategory: "Financial",
            accessLevel: "Public"
          }
        : {
            accountType: "Expenses",
            accountName: "Public Spending",
            description: "Government expenditure",
            personalDataCategory: "Financial",
            accessLevel: "Public"
          };

    case "CentralBanks":
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Interest Income",
            description: "Interest earned on securities",
            personalDataCategory: "Financial",
            accessLevel: "Public"
          }
        : {
            accountType: "Expenses",
            accountName: "Monetary Operations",
            description: "Cost of monetary operations",
            personalDataCategory: "Financial",
            accessLevel: "Public"
          };

    default:
      return isPositiveChange
        ? {
            accountType: "Revenue",
            accountName: "Trading Income",
            description: "General income",
            personalDataCategory: "None",
            accessLevel: "Private"
          }
        : {
            accountType: "Expenses",
            accountName: "Trading Expenses",
            description: "General expenses",
            personalDataCategory: "None",
            accessLevel: "Private"
          };
  }
}

