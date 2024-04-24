class Transaction {
    constructor(type, amount) {
        this._type = type;
        this._amount = amount;
        this._timestamp = new Date();
    }

    // Getters
    get type() {
        return this._type;
    }

    get amount() {
        return this._amount;
    }

    get timestamp() {
        return this._timestamp;
    }
}

class BankAccount {
    constructor(accountNumber, firstName, lastName, dailyWithdrawalLimit) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._accountHolder = `${firstName} ${lastName}`;
        this._balance = 0;
        this._transactions = [];
        this._dailyWithdrawalLimit = dailyWithdrawalLimit;
        this._withdrawalAmountToday = 0; // Track total withdrawal amount for the day
    }

    // Getters
    get accountNumber() {
        return this._accountNumber;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get accountHolder() {
        return this._accountHolder;
    }

    get balance() {
        return this._balance;
    }

    // Methods
    deposit(amount) {
        // Deposit money into the account
        this._balance += amount;
        const transaction = new Transaction('Deposit', amount);
        this._transactions.push(transaction);
    }

    withdraw(amount) {
        // Check if withdrawal amount exceeds daily limit
        if (this._withdrawalAmountToday + amount > this._dailyWithdrawalLimit) {
            console.log("Daily withdrawal limit exceeded.");
            return;
        }

        // Withdraw money from the account
        if (this._balance >= amount) {
            this._balance -= amount;
            this._withdrawalAmountToday += amount; // Update daily withdrawal amount
            const transaction = new Transaction('Withdrawal', amount);
            this._transactions.push(transaction);
        } else {
            console.log("Insufficient funds.");
        }
    }

    getTransactions() {
        // View transaction history
        return this._transactions;
    }
}

// Create an instance of BankAccount
const myAccount = new BankAccount(2171396313, "Developer", "Kings", 6000); // Daily withdrawal limit is $10,000

// Deposit money into the account
myAccount.deposit(100000);

// Withdraw money from the account
myAccount.withdraw(7000);

// Get transaction history
const transactions = myAccount.getTransactions();

// Print account details and transaction history
console.log("Account Details:");
console.log("Account Holder:", myAccount.accountHolder);
console.log("Account Number:", myAccount.accountNumber);
console.log("Balance:", myAccount.balance);

console.log("\nTransaction History:");
transactions.forEach((transaction, index) => {
    console.log(`Transaction ${index + 1}:`);
    console.log("Type:", transaction.type);
    console.log("Amount:", transaction.amount);
    console.log("Timestamp:", transaction.timestamp);
    console.log("---------------------");
});
