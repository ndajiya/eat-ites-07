export class Bookkeeping {
  transactions: Transaction[];
  accounts: { [key: string]: number };

  constructor() {
    this.transactions = [];
    this.accounts = {};
  }

  static accountBehavior = {
    Assets: { increase: "Debit", decrease: "Credit" },
    Expenses: { increase: "Debit", decrease: "Credit" },
    Liabilities: { increase: "Credit", decrease: "Debit" },
    Equity: { increase: "Credit", decrease: "Debit" },
    Revenue: { increase: "Credit", decrease: "Debit" }
  };

  addTransaction(
    date: string,
    accountType: keyof typeof Bookkeeping.accountBehavior,
    account: string,
    amount: number,
    description: string,
    action: "Increase" | "Decrease"
  ) {
    const behavior = Bookkeeping.accountBehavior[accountType];
    if (!behavior) {
      throw new Error(`Invalid account type: ${accountType}`);
    }

    const entryType = behavior[action.toLowerCase() as "increase" | "decrease"];
    if (!entryType) {
      throw new Error(`Invalid action: ${action}. Use "Increase" or "Decrease".`);
    }

    const signedAmount = entryType === "Debit" ? amount : -amount;

    this.transactions.push({
      date,
      account,
      amount: signedAmount,
      description,
      entryType
    });

    if (!this.accounts[account]) {
      this.accounts[account] = 0;
    }
    this.accounts[account] += signedAmount;
  }

  getAccountBalances() {
    return Object.entries(this.accounts).map(([account, balance]) => ({
      account,
      balance
    }));
  }

  getLedger() {
    return this.transactions;
  }
}

export interface Transaction {
  date: string;
  account: string;
  amount: number;
  description: string;
  entryType: string;
}