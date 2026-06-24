import React from 'react';

import {
  Trash2,
  Calendar,
} from "lucide-react";

export default function Transactions(props) {

  const handleDeleteTransaction = (id) => {
    props.setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };
  
  return (
    <>
        <div className="mt-8 rounded-2xl shadow-lg bg-white border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              All Transactions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Type
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {transaction.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600" key={transaction.id}>
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-bold text-right ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-slate-900"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {props.formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="inline-flex items-center justify-center p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}
