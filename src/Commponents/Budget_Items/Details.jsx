import React, { useState, useEffect } from 'react'

import {
    PieChart as PieChartIcon,
    Plus,
    CalendarClock,
    Download
} from "lucide-react";

export default function Details(props) {

    const [showHistory, setShowHistory] = useState(false);
    const [showBudgetModal, setShowBudgetModal] = useState(false);

    const [monthlyHistory, setMonthlyHistory] = useState(() => {
        const saved = localStorage.getItem("monthlyHistory");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "monthlyHistory",
            JSON.stringify(monthlyHistory)
        );
    }, [monthlyHistory]);

    const budgetData = props.budgets.map((budget) => {
        const spent = props.currentMonthTransactions
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

    const [budgetForm, setBudgetForm] = useState({
        category: "",
        amount: "",
    });

    {/*To start the new month Budget creation*/ }
    const startNewMonth = () => {

        const totalIncome = props.currentMonthTransactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const totalExpenses = props.currentMonthTransactions
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
            transactions: [...props.currentMonthTransactions]
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

        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const newMonth = nextMonth.toLocaleString("default", {
            month: "short",
            year: "numeric",
        });

        props.setCurrentMonth(newMonth);

        props.setBudgets([]);
        localStorage.setItem("budgets", JSON.stringify([]))

        alert(
            "New Month Started Successfully!\nPrevious month saved in History."
        );
    };

    const createNewBudget = () => {
        if (!budgetForm.category || !budgetForm.amount) {
            alert("Please fill all fields");
            return;
        }

        const newBudget = {
            category: budgetForm.category,
            budget: Number(budgetForm.amount),
            month: props.currentMonth
        };

        props.setBudgets((prev) => [...prev, newBudget]);

        setBudgetForm({
            category: "",
            amount: "",
        });

        setShowBudgetModal(false);
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
                                        onClick={createNewBudget}
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
                                                    onClick={() => props.exportMonthReport(month)}
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
        </>
    )
}
