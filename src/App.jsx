import { useState , useEffect } from 'react';
import './App.css'
import Balances from './Commponents/Balances'
import Header from './Commponents/Header'
import Summary from './Commponents/Summary';
import Transactions from './Commponents/Transactions';

function App() {

  const defaultTransactions = [

  ];

  const [transactions, setTransactions] = useState(()=>{
    
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
  
    const addTransaction = (newTransaction) => {
     
      setTransactions((prev) => [
        ...prev,
        {
          ...newTransaction,
          id: Date.now().toString(),
          amount: Number(newTransaction.amount),
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
      <Header formData={formData} setFormData={setFormData} addTransaction={addTransaction}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Balances transactions={transactions} formatCurrency={formatCurrency}/>
        <Summary transactions={transactions}
          budgets={budgets}
          setBudgets={setBudgets}
          formatCurrency={formatCurrency}/>
        <Transactions transactions={transactions} setTransactions={setTransactions} formatCurrency={formatCurrency}/>
      </div>
    </>
  )
}

export default App
