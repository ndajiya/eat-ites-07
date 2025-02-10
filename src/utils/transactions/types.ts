
export interface Transaction {
  agentId: string;
  cashChange: number;
  date: string;
  description: string;
  accountName: string;
  accountType: "Revenue" | "Expenses" | "Assets" | "Liabilities";
  dataRetentionPeriod?: number; // GDPR compliance: data retention period in days
  personalDataCategory?: "Financial" | "Educational" | "None"; // GDPR/FERPA data classification
  accessLevel?: "Public" | "Private" | "Restricted"; // SOC 2 access control
  lastModified?: string; // GDPR audit trail
  dataController?: string; // GDPR data controller information
}

export interface TransactionDetails {
  accountType: "Revenue" | "Expenses" | "Assets" | "Liabilities";
  accountName: string;
  description: string;
  personalDataCategory?: "Financial" | "Educational" | "None";
  accessLevel?: "Public" | "Private" | "Restricted";
}

// Compliance-related types
export interface DataPrivacySettings {
  retentionPeriod: number;
  dataController: string;
  processingPurpose: string;
  legalBasis: "Consent" | "Contract" | "LegalObligation" | "VitalInterests" | "PublicTask" | "LegitimateInterests";
}

