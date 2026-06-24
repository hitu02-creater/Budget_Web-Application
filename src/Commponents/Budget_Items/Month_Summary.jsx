import React from 'react'

export default function Month_Summary(props) {

    const totalBudget = props.budgets.reduce(
        (sum, budget) => sum + Number(budget.budget),
        0
    );

    const totalIncome = props.currentMonthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = props.currentMonthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const remainingBudget = totalBudget - totalExpenses;

    const budgetUsedPercentage =
        totalBudget > 0
            ? ((totalExpenses / totalBudget) * 100).toFixed(1)
            : 0;        

    return (
        <>
            <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Budget Summary of month {props.currentMonth}
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
        </>
    )
}
