export class Bookkeeping {
  transactions: Transaction[];
  accounts: { [key: string]: number };
  accountTypes: { [key: string]: string };

  constructor() {
    this.transactions = [];
    this.accounts = {};
    this.accountTypes = {};
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
      entryType,
      accountType 
    });

    if (!this.accounts[account]) {
      this.accounts[account] = 0;
      this.accountTypes[account] = accountType;
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

  generateBalanceSheet() {
    const assets: { account: string; balance: number }[] = [];
    const liabilities: { account: string; balance: number }[] = [];
    const equity: { account: string; balance: number }[] = [];

    for (const [account, balance] of Object.entries(this.accounts)) {
      const type = this.accountTypes[account];
      if (type === "Assets") assets.push({ account, balance });
      if (type === "Liabilities") liabilities.push({ account, balance });
      if (type === "Equity") equity.push({ account, balance });
    }

    return { assets, liabilities, equity };
  }

  generateIncomeStatement() {
    let revenue = 0;
    let expenses = 0;

    for (const [account, balance] of Object.entries(this.accounts)) {
      const type = this.accountTypes[account];
      if (type === "Revenue") revenue += Math.abs(balance);
      if (type === "Expenses") expenses += Math.abs(balance);
    }

    const netIncome = revenue - expenses;
    return { revenue, expenses, netIncome };
  }

  generateCashFlows() {
    let operating = 0;
    let investing = 0;
    let financing = 0;

    for (const transaction of this.transactions) {
      if (transaction.account === "Cash") {
        const { accountType, amount, description } = transaction;

        if (accountType === "Revenue" || accountType === "Expenses") {
          operating += amount;
        } else if (accountType === "Assets" && description.toLowerCase().includes("purchase")) {
          investing += amount;
        } else if (accountType === "Liabilities" || accountType === "Equity") {
          financing += amount;
        }
      }
    }

    const netCashFlow = operating + investing + financing;
    return { operating, investing, financing, netCashFlow };
  }
}

export interface Transaction {
  date: string;
  account: string;
  amount: number;
  description: string;
  entryType: string;
  accountType?: string;
}