import React from 'react';

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

    const COLORS = {
        Food: "#FF6B6B",
        Transportation: "#4ECDC4",
        Entertainment: "#FFE66D",
        Utilities: "#95E1D3",
        Healthcare: "#F38181",
        Shopping: "#AA96DA",
        Other: "#FCBAD3",
    };

    const monthlyData = [
        { month: "Oct", income: 5000, expenses: 1800 },
        { month: "Nov", income: 5800, expenses: 2100 },
        { month: "Dec", income: 5800, expenses: 680 },
    ];

    const budgets = [
        { category: "Food", budget: 300, spent: 150 },
        { category: "Transportation", budget: 200, spent: 60 },
        { category: "Entertainment", budget: 150, spent: 30 },
        { category: "Shopping", budget: 200, spent: 120 },
    ];

    const expensesByCategory = props.transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
        const existing = acc.find((item) => item.name === t.category);
        if (existing) {
            existing.value += t.amount;
        } else {
            acc.push({ name: t.category, value: t.amount });
        }
        return acc;
        }, []
    );

  return (
    <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Reports */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Trends */}
            <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Monthly Trends
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    formatter={(value) => props.formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
            {/* Budget Overview */}
            <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-blue-600" />
                Budget Planning
              </h2>
              <div className="space-y-4">
                {budgets.map((budget) => {
                  const percentage = (budget.spent / budget.budget) * 100;
                  const isOverBudget = budget.spent > budget.budget;

                  return (
                    <div key={budget.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">
                          {budget.category}
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            isOverBudget ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {props.formatCurrency(budget.spent)} /{" "}
                          {props.formatCurrency(budget.budget)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isOverBudget
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
                      className={`font-bold text-sm ${
                        transaction.type === "income"
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
