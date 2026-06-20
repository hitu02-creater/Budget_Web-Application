import { useState } from 'react';
import './App.css'
import Balances from './Commponents/Balances'
import Header from './Commponents/Header'
import Summary from './Commponents/Summary';
import Transactions from './Commponents/Transactions';

function App() {

  const [transactions, setTransactions] = useState([
    {
      id: "1",
      description: "Monthly Salary",
      amount: 5000,
      category: "Salary",
      type: "income",
      date: "2024-12-01",
      month: "Dec 2024",
    },
    {
      id: "2",
      description: "Grocery Shopping",
      amount: 150,
      category: "Food",
      type: "expense",
      date: "2024-12-05",
      month: "Dec 2024",
    },
    {
      id: "3",
      description: "Gas",
      amount: 60,
      category: "Transportation",
      type: "expense",
      date: "2024-12-06",
      month: "Dec 2024",
    },
    {
      id: "4",
      description: "Movie Night",
      amount: 30,
      category: "Entertainment",
      type: "expense",
      date: "2024-12-08",
      month: "Dec 2024",
    },
    {
      id: "5",
      description: "Electricity Bill",
      amount: 120,
      category: "Utilities",
      type: "expense",
      date: "2024-12-10",
      month: "Dec 2024",
    },
    {
      id: "6",
      description: "Freelance Project",
      amount: 800,
      category: "Freelance",
      type: "income",
      date: "2024-12-12",
      month: "Dec 2024",
    },
    {
      id: "7",
      description: "Doctor Visit",
      amount: 200,
      category: "Healthcare",
      type: "expense",
      date: "2024-12-15",
      month: "Dec 2024",
    },
    {
      id: "8",
      description: "New Shoes",
      amount: 120,
      category: "Shopping",
      type: "expense",
      date: "2024-12-18",
      month: "Dec 2024",
    },
  ]);

  const formatCurrency = (value) => {
      return `Rs. ${value.toFixed(2)}`;
  };

  return (
    <>
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Balances transactions={transactions} formatCurrency={formatCurrency}/>
        <Summary transactions={transactions} formatCurrency={formatCurrency}/>
        <Transactions transactions={transactions} formatCurrency={formatCurrency}/>
      </div>
    </>
  )
}

export default App
