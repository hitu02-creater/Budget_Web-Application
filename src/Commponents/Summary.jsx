import React, { useState } from 'react';

import {
  PieChart as PieChartIcon,
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

export default function Summary(props) {

  const monthlyData = {};

  props.transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.type === "income") {
      monthlyData[month].income += Number(transaction.amount);
    } else {
      monthlyData[month].expenses += Number(transaction.amount);
    }
  });

  const expenseTrend = Object.values(monthlyData);

  const COLORS = {
    Food: "#FF6B6B",
    Transportation: "#4ECDC4",
    Entertainment: "#FFE66D",
    Utilities: "#95E1D3",
    Healthcare: "#F38181",
    Shopping: "#AA96DA",
    Other: "#FCBAD3",
  };

  const currentMonth = new Date().toLocaleString(
    "default",
    {
      month: "short",
      year: "numeric",
    }
  );

  props.transactions.month === currentMonth;

  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const [budgetForm, setBudgetForm] = useState({
    category: "",
    amount: "",
  });

  const createBudget = () => {
    if (!budgetForm.category || !budgetForm.amount) return;

    const newBudget = {
      category: budgetForm.category,
      budget: Number(budgetForm.amount),
    };

    props.setBudgets((prev) => {
      const existing = prev.find(
        (b) => b.category === budgetForm.category
      );

      if (existing) {
        return prev.map((b) =>
          b.category === budgetForm.category
            ? newBudget
            : b
        );
      }

      return [...prev, newBudget];
    });

    setBudgetForm({
      category: "",
      amount: "",
    });

    setShowBudgetModal(false);
  };

  const budgetData = props.budgets.map((budget) => {
    const spent = props.transactions
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
    props.transactions.filter((transaction) => transaction.type === "expense")
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

  const totalIncome = props.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = props.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const remainingBudget = totalBudget - totalExpenses;

  const budgetUsedPercentage =
    totalBudget > 0
      ? ((totalExpenses / totalBudget) * 100).toFixed(1)
      : 0;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Budget Planning */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Budget Planning
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setShowBudgetModal(true)}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm cursor-pointer"
              >
                + Budget
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Start a new month? All budgets will be reset."
                    )
                  ) {
                    props.setBudgets([]);
                  }
                }}
                className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm"
              >
                Start New Month
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

          </div>
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
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Expense Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={(entry) =>
                    `${entry.name}: ${props.formatCurrency(entry.value)}`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => props.formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* Right Column - Budget Planning */}
        <div className="space-y-8">
          {/* Budget & Expanses summary */}

          <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Budget Summary
            </h2>

            <div className="grid grid-cols-2 gap-4">

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
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {props.transactions.slice(0, 5).map((transaction) => (
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
      </div>
    </>
  )
}
