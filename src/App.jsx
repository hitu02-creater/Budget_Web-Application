import { useState, useEffect } from 'react';
import './App.css'
import Balances from './Commponents/Balances'
import Header from './Commponents/Header'
import Summary from './Commponents/Summary';
import Transactions from './Commponents/Transactions';

function App() {

  const [monthlyHistory, setMonthlyHistory] = useState(() => {
    const saved = localStorage.getItem("monthlyHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "monthlyHistory",
      JSON.stringify(monthlyHistory)
    );
  }, [monthlyHistory]);

  const defaultTransactions = [];

  const [transactions, setTransactions] = useState(() => {

    try {
      const saved = localStorage.getItem("transactions");

      if (saved) {
        return JSON.parse(saved);
      }

      return defaultTransactions;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return defaultTransactions;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );

  const addTransaction = (newTransaction) => {

    setTransactions((prev) => [
      ...prev,
      {
        ...newTransaction,
        id: Date.now().toString(),
        amount: Number(newTransaction.amount),
        month: currentMonth
      },
    ]);
  };

  const formatCurrency = (value = 0) => {
    return `Rs. ${value.toFixed(2)}`;
  };

  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem("budgets");

    return savedBudgets
      ? JSON.parse(savedBudgets)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  return (
    <>
      <Header
        transactions={transactions}
        formData={formData}
        setFormData={setFormData}
        budgets={budgets}
        addTransaction={addTransaction}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Balances
          transactions={transactions}
          formatCurrency={formatCurrency}
        />
        <Summary
          transactions={transactions}
          budgets={budgets}
          setMonthlyHistory={setMonthlyHistory}
          monthlyHistory={monthlyHistory}
          setBudgets={setBudgets}
          formatCurrency={formatCurrency}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          setTransactions={setTransactions} />
        <Transactions
          transactions={transactions}
          setTransactions={setTransactions}
          formatCurrency={formatCurrency}
        />
      </div>
    </>
  )
}

export default App
