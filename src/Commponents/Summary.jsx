import React, { useState } from 'react';

import {
  PieChart as PieChartIcon,
  Plus,
  CalendarClock,
  Download
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Summary(props) {

  const COLORS = {
    Food: "#FF6B6B",
    Transportation: "#4ECDC4",
    Entertainment: "#FFE66D",
    Utilities: "#95E1D3",
    Healthcare: "#F38181",
    Shopping: "#AA96DA",
    Other: "#FCBAD3",
  };

  const currentMonth = props.currentMonth

  const currentMonthTransactions =
    props.transactions.filter(
      (transaction) =>
        transaction.month === currentMonth
    );

  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [budgetForm, setBudgetForm] = useState({
    category: "",
    amount: "",
  });

  const startNewMonth = () => {

    const confirmed = window.confirm(
      "Starting a new month will archive current budgets and transactions. Continue?"
    );

    if (!confirmed) return;

    const totalIncome = currentMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalBudget = props.budgets.reduce(
      (sum, b) => sum + Number(b.budget),
      0
    );

    const monthSnapshot = {
      id: Date.now(),
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),

      totalIncome,
      totalExpenses,
      totalBudget,
      remainingBudget: totalBudget - totalExpenses,

      budgets: [...props.budgets],
      transactions: [...currentMonthTransactions]
    };

    // Save History
    const updatedHistory = [
      monthSnapshot,
      ...props.monthlyHistory,
    ];

    props.setMonthlyHistory(updatedHistory);

    localStorage.setItem(
      "monthlyHistory",
      JSON.stringify(updatedHistory)
    );

    props.setBudgets([]);

    const incomeTransactions = props.transactions.filter(
      (transaction) => transaction.type === "income"
    );

    props.setTransactions(incomeTransactions);

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    props.setCurrentMonth(
      nextMonth.toLocaleString("default", {
        month: "short",
        year: "numeric",
      })
    );

    alert(
      "New Month Started Successfully!\nPrevious month saved in History."
    );
  };

  const createBudget = () => {
    if (!budgetForm.category || !budgetForm.amount) {
      alert("Please fill all fields");
      return;
    }

    const newBudget = {
      category: budgetForm.category,
      budget: Number(budgetForm.amount),
    };

    props.setBudgets((prev) => [...prev, newBudget]);

    setBudgetForm({
      category: "",
      amount: "",
    });

    setShowBudgetModal(false);
  };

  const budgetData = props.budgets.map((budget) => {
    const spent = currentMonthTransactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.category === budget.category
      )
      .reduce(
        (sum, transaction) =>
          sum + Number(transaction.amount),
        0
      );

    return {
      ...budget,
      spent,
    };
  });

  const expensesByCategory = Object.entries(
    currentMonthTransactions.filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => {
        const category = transaction.category;

        acc[category] =
          (acc[category] || 0) + Number(transaction.amount);

        return acc;
      }, {})
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const totalBudget = props.budgets.reduce(
    (sum, budget) => sum + Number(budget.budget),
    0
  );

  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // props.setTransactions(incomeTransactions);
  // props.setBudgets([]);
  // const nextMonth = new Date();
  // nextMonth.setMonth(nextMonth.getMonth() + 1);

  // props.setCurrentMonth(
  //   nextMonth.toLocaleString("default", {
  //     month: "short",
  //     year: "numeric",
  //   })
  // );

  const totalExpenses = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const remainingBudget = totalBudget - totalExpenses;

  const budgetUsedPercentage =
    totalBudget > 0
      ? ((totalExpenses / totalBudget) * 100).toFixed(1)
      : 0;

  const exportMonthReport = (monthData) => {

    // Sheet 1 - Budget vs Expense

    const budgetComparison = monthData.budgets.map(
      (budget) => {

        const spent = monthData.transactions
          .filter(
            (t) =>
              t.type === "expense" &&
              t.category === budget.category
          )
          .reduce(
            (sum, t) =>
              sum + Number(t.amount),
            0
          );

        return {
          Category: budget.category,
          Budget: budget.budget,
          ActualExpense: spent,
          Remaining:
            budget.budget - spent,

          UsagePercentage:
            budget.budget > 0
              ? `${(
                (spent / budget.budget) *
                100
              ).toFixed(2)}%`
              : "0%",

          Status:
            spent > budget.budget
              ? "Over Budget"
              : "Within Budget",
        };
      }
    );

    // Sheet 2 - Transactions

    const transactionComparison =
      monthData.transactions.map(
        (transaction) => {

          const categoryBudget =
            monthData.budgets.find(
              (b) =>
                b.category ===
                transaction.category
            );

          const totalSpentInCategory =
            monthData.transactions
              .filter(
                (t) =>
                  t.type ===
                  "expense" &&
                  t.category ===
                  transaction.category
              )
              .reduce(
                (sum, t) =>
                  sum +
                  Number(t.amount),
                0
              );

          return {
            Description:
              transaction.description,

            Category:
              transaction.category,

            Type:
              transaction.type,

            Amount:
              transaction.amount,

            Date:
              transaction.date || "",

            CategoryBudget:
              categoryBudget?.budget ??
              "N/A",

            TotalSpentInCategory:
              transaction.type ===
                "expense"
                ? totalSpentInCategory
                : "N/A",

            BudgetStatus:
              transaction.type ===
                "income"
                ? "Income"
                : totalSpentInCategory >
                  (categoryBudget?.budget ||
                    0)
                  ? "Over Budget"
                  : "Within Budget",
          };
        }
      );

    // Create Workbook

    const workbook =
      XLSX.utils.book_new();

    const budgetSheet =
      XLSX.utils.json_to_sheet(
        budgetComparison
      );

    const transactionSheet =
      XLSX.utils.json_to_sheet(
        transactionComparison
      );

    XLSX.utils.book_append_sheet(
      workbook,
      budgetSheet,
      "Budget_vs_Expenses"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      transactionSheet,
      "Transaction_Comparison"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    saveAs(
      file,
      `${monthData.month.replace(
        " ",
        "_"
      )}_Finance_Report.xlsx`
    );
  };

  const clearHistory = () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete all monthly history reports?"
    );

    if (!confirmed) return;

    props.setMonthlyHistory([]);

    localStorage.removeItem("monthlyHistory");

    setShowHistory(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Budget Planning */}
          <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
            <h1 className="text-3xl text-center font-bold text-slate-900 mb-8">
              Budget Details
            </h1>
            <div className="flex justify-between items-center mb-6">

              <button
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all text-sm font-medium text-white shadow-lg hover:shadow-xl"
              >
                📜 History
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Want to start a new month Budget? All budgets will be reset."
                    )
                  ) {
                    startNewMonth();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-medium text-white shadow-lg hover:shadow-xl"
              >
                <CalendarClock
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                />
                Start New Month
              </button>

              <button
                onClick={() => setShowBudgetModal(true)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium text-white shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Budget</span>
              </button>
            </div>

            {
              showBudgetModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">
                      Create Budget
                    </h2>

                    <select
                      value={budgetForm.category}
                      onChange={(e) =>
                        setBudgetForm({
                          ...budgetForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 mb-4"
                    >
                      <option value="">
                        Select Category
                      </option>

                      <option value="Food">Food</option>
                      <option value="Transportation">
                        Transportation
                      </option>
                      <option value="Entertainment">
                        Entertainment
                      </option>
                      <option value="Utilities">
                        Utilities
                      </option>
                      <option value="Healthcare">
                        Healthcare
                      </option>
                      <option value="Shopping">
                        Shopping
                      </option>
                    </select>

                    <input
                      type="number"
                      placeholder="Budget Amount"
                      value={budgetForm.amount}
                      onChange={(e) =>
                        setBudgetForm({
                          ...budgetForm,
                          amount: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 mb-4"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={createBudget}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg cursor-pointer"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setShowBudgetModal(false)
                        }
                        className="flex-1 bg-gray-200 py-2 rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
            <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-blue-600" />
                Budget Planning
              </h2>
              <div className="space-y-4">
                {budgetData.map((budget) => {
                  const percentage = (budget.spent / budget.budget) * 100;
                  const isOverBudget = budget.spent > budget.budget;

                  return (
                    <div key={budget.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">
                          {budget.category}
                        </span>
                        <span
                          className={`text-sm font-bold ${isOverBudget ? "text-red-600" : "text-green-600"
                            }`}
                        >
                          {props.formatCurrency(budget.spent)} /{" "}
                          {props.formatCurrency(budget.budget)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isOverBudget
                            ? "bg-linear-to-r from-red-500 to-red-600"
                            : "bg-linear-to-r from-green-500 to-emerald-600"
                            }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {
                  showHistory && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded-xl w-225 max-h-[80vh] overflow-y-auto">

                        <div className="flex justify-between mb-4">
                          <h2 className="text-2xl font-bold">
                            Monthly History
                          </h2>

                          <button
                            className="cursor-pointer"
                            onClick={() => setShowHistory(false)}
                          >
                            ✕
                          </button>
                        </div>

                        {props.monthlyHistory.map((month) => (
                          <div
                            key={month.id}
                            className="border rounded-xl p-4 mb-4"
                          >
                            <h3 className="font-bold text-lg">
                              {month.month}
                            </h3>

                            <div className="grid grid-cols-4 gap-4 mt-3">

                              <div>
                                Budget
                                <br />
                                ₹{month.totalBudget}
                              </div>

                              <div>
                                Income
                                <br />
                                ₹{month.totalIncome}
                              </div>

                              <div>
                                Expenses
                                <br />
                                ₹{month.totalExpenses}
                              </div>

                              <div>
                                Remaining
                                <br />
                                ₹{month.remainingBudget}
                              </div>

                            </div>

                            <p className="mt-3 text-sm text-gray-500">
                              Transactions:
                              {" "}
                              {month.transactions.length}
                            </p>
                            <button
                              onClick={() => exportMonthReport(month)}
                              className="px-3 py-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center gap-2"
                            >
                              <Download size={16} />
                              Download Report
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={clearHistory}
                          className="px-3 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                        >
                          🗑 Clear History
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Expense Breakdown
            </h2>
            {
              expensesByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) =>
                        `${name}: Rs. ${value}`
                      }
                      outerRadius={100}
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[entry.name] ||
                            "#8884d8"
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-75 flex items-center justify-center text-slate-500">
                  No Expense Data Available
                </div>
              )
            }
          </div>
        </div>


        {/* Right Column - Budget Planning */}
        <div className="space-y-8">
          {/* Budget & Expanses summary */}

          <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Budget Summary of month {currentMonth}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {totalBudget === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  No Budget Created For This Month
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-xl bg-blue-50">
                    <p className="text-sm text-slate-600">
                      Total Budget
                    </p>
                    <h3 className="text-2xl font-bold text-blue-600">
                      {props.formatCurrency(totalBudget)}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-green-50">
                    <p className="text-sm text-slate-600">
                      Total Income
                    </p>
                    <h3 className="text-2xl font-bold text-green-600">
                      {props.formatCurrency(totalIncome)}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-red-50">
                    <p className="text-sm text-slate-600">
                      Total Expenses
                    </p>
                    <h3 className="text-2xl font-bold text-red-600">
                      {props.formatCurrency(totalExpenses)}
                    </h3>
                  </div>

                  <div
                    className={`p-4 rounded-xl ${remainingBudget >= 0
                      ? "bg-emerald-50"
                      : "bg-orange-50"
                      }`}
                  >
                    <p className="text-sm text-slate-600">
                      Remaining Budget
                    </p>

                    <h3
                      className={`text-2xl font-bold ${remainingBudget >= 0
                        ? "text-emerald-600"
                        : "text-orange-600"
                        }`}
                    >
                      {props.formatCurrency(remainingBudget)}
                    </h3>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-slate-700">
                  Budget Usage
                </span>

                <span
                  className={`font-bold ${budgetUsedPercentage > 100
                    ? "text-red-600"
                    : "text-green-600"
                    }`}
                >
                  {budgetUsedPercentage}%
                </span>
              </div>

              <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${budgetUsedPercentage > 100
                    ? "bg-red-500"
                    : "bg-green-500"
                    }`}
                  style={{
                    width: `${Math.min(
                      budgetUsedPercentage,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              {totalExpenses > totalBudget ? (
                <p className="text-red-600 font-semibold">
                  ⚠️ You have exceeded your budget by{" "}
                  {props.formatCurrency(
                    totalExpenses - totalBudget
                  )}
                </p>
              ) : (
                <p className="text-green-600 font-semibold">
                  ✅ You are within your budget.
                </p>
              )}
            </div>
          </div>

          {/* Recent Transactions Preview */}
          <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Recent Transactions
            </h2>
            <div className="space-y-3 height={300} overflow-y-auto">
              {currentMonthTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-slate-600">
                      {transaction.category}
                    </p>
                  </div>
                  <span
                    className={`font-bold text-sm ${transaction.type === "income"
                      ? "text-green-600"
                      : "text-slate-900"
                      }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {props.formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
