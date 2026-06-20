import React from 'react'

import {
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

export default function Balances(props) {

    const totalIncome = props.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = props.transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Total Income
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {props.formatCurrency(totalIncome)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Total Expenses
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {props.formatCurrency(totalExpenses)}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-linear-to-br from-blue-500 to-blue-600 text-white hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-100 mb-2">
                  Balance
                </p>
                <p className="text-3xl font-bold">{props.formatCurrency(balance)}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
