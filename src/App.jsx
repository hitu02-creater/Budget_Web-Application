import './App.css'

import React, { useState, useEffect } from "react";

import {
  // BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Sidebar from "./Commponents/Layout/Slidebar";
import Navbar from "./Commponents/Layout/Navbar";

import Dashboard from './Commponents/Pages/Dashboard/Dashboard';
import BudgetSummary from "./Commponents/Pages/Budget/BudgetSummary";
import AllTransactions from "./Commponents/Pages/Transactions/AllTransactions";
import MonthlySummary from "./Commponents/Pages/Monthly Summary/MonthlySummary";
import TransactionHistory from "./Commponents/Pages/History Page/TransactionHistory";
import Setting from "./Commponents/Pages/Setting/Setting";

function App() {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const month = currentTime.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const formatCurrency = (value = 0) => {
    return `Rs. ${value.toFixed(2)}`;
  };

  const defaultTransactions = [{
    title: "",
    amount: 0,
    type: "",
    category: "",
    month: ""
  }];

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
    <div className="min-h-screen bg-[#050816]" id="dashboard">
      <Sidebar />
      <main className="ml-72">
        <Navbar />
        <div className="p-8 space-y-8">
          <Routes>

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={
                <>
                  <Dashboard
                    formatCurrency={formatCurrency}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    budgets={budgets}
                    setBudgets={setBudgets}
                    month={month}
                  />
                </>
              }
            />

            <Route
              path="/budget"
              element={
                <BudgetSummary
                  formatCurrency={formatCurrency}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  budgets={budgets}
                  setBudgets={setBudgets}
                  month={month}
                />
              }
            />

            <Route
              path="/transactions"
              element={
                <AllTransactions
                  formatCurrency={formatCurrency}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              }
            />

            <Route
              path="/analytics"
              element={
                <MonthlySummary
                  formatCurrency={formatCurrency}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  budgets={budgets}
                  setBudgets={setBudgets}
                  month={month}
                />
              }
            />

            <Route
              path="/history"
              element={
                <TransactionHistory
                  formatCurrency={formatCurrency}
                  transactions={transactions}
                  month={month}
                />
              }
            />

            <Route
              path="/settings"
              element={
                <Setting />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
