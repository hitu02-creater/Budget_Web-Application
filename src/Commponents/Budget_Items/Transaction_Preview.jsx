import React from 'react'

export default function Transaction_Preview(props) {
    return (
        <>
            <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Recent Transactions
                </h2>
                <div className="space-y-3 height={300} overflow-y-auto">
                    {props.currentMonthTransactions.slice(0, 5).map((transaction) => (
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
        </>
    )
}
