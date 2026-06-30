import React, { useState, useEffect } from 'react'

import {
    PieChart as PieChartIcon,
    Plus,
    CalendarClock,
    Download
} from "lucide-react";
import History from '../../../Models/History';
import BudgetModel from '../../../Models/BudgetModel';

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
            ...monthlyHistory,
        ];

        setMonthlyHistory(updatedHistory);

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

        props.setBudgets([]);
        localStorage.setItem("budgets", JSON.stringify([]))

        alert(
            "New Month Started Successfully!\nPrevious month saved in History."
        );
    };

    return (
        <section className="space-y-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 border border-cyan-500/20 px-4 py-2 text-cyan-300 text-sm font-semibold">
                        <PieChartIcon size={16} />
                        Budget Planning
                    </span>
                    <h2 className="mt-5 text-3xl font-black text-white">
                        Manage Your Budgets
                    </h2>
                    <p className="mt-2 text-slate-400">
                        Track category-wise spending and stay within your monthly budget.
                    </p>

                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">

                    <button
                        onClick={() => setShowHistory(true)}
                        className="rounded-2xl cursor-pointer border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 
                        font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
                    >
                        📜 History
                    </button>

                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Want to start a new month Budget?"
                                )
                            ) {
                                startNewMonth();
                            }
                        }}
                        className=" rounded-2xl cursor-pointer bg-linear-to-r from-orange-500 to-amber-500
                        px-5 py-3 font-semibold text-white transition hover:scale-105"
                    >

                        <div className="flex items-center gap-2">
                            <CalendarClock size={18} />
                            Start Month
                        </div>

                    </button>

                    <button
                        onClick={() =>
                            setShowBudgetModal(true)
                        }
                        className="rounded-2xl cursor-pointer bg-linear-to-r from-cyan-500 to-violet-600 px-5
                        py-3 font-semibold text-white transition hover:scale-105"
                    >

                        <div className="flex items-center gap-2">
                            <Plus size={18} />
                            Add Budget
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
                    <p className="text-slate-400">
                        Categories
                    </p>

                    <h3 className="mt-3 text-4xl font-black text-cyan-400">
                        {budgetData.length}
                    </h3>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
                    <p className="text-slate-400">
                        Total Budget
                    </p>

                    <h3 className="mt-3 text-4xl font-black text-green-400">
                        {props.formatCurrency(
                            budgetData.reduce(
                                (sum, b) => sum + b.budget,
                                0
                            )
                        )}
                    </h3>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
                    <p className="text-slate-400">
                        Total Spent
                    </p>
                    <h3 className="mt-3 text-4xl font-black text-red-400">
                        {props.formatCurrency(
                            budgetData.reduce(
                                (sum, b) => sum + b.spent,
                                0
                            )
                        )}
                    </h3>
                </div>

            </div>

            <div className="space-y-5">
                {budgetData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {budgetData.map((budget, index) => {

                            const percentage =
                                budget.budget > 0
                                    ? (budget.spent / budget.budget) * 100
                                    : 0;

                            const remaining =
                                budget.budget - budget.spent;

                            const isOverBudget =
                                budget.spent > budget.budget;
                            return (
                                <div
                                    key={budget.category && index}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10
                                        bg-slate-900/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1
                                        hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,.15)]"
                                >
                                    <div
                                        className={`absolute right-0 top-0 h-28 w-28 rounded-full blur-3xl
                                                ${isOverBudget
                                                ? "bg-red-500/10"
                                                : "bg-cyan-500/10"
                                            }
                                        `}
                                    />

                                    <div>
                                        <div
                                            key={budget.category}
                                            className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-xl hover:border-cyan-400/20 transition-all duration-300"
                                        >

                                            <div className="p-6">
                                                {/* Top */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isOverBudget
                                                                ? "bg-red-500/15"
                                                                : "bg-cyan-500/15"
                                                                }`}
                                                        >
                                                            <PieChartIcon
                                                                size={24}
                                                                className={
                                                                    isOverBudget
                                                                        ? "text-red-400"
                                                                        : "text-cyan-400"
                                                                }
                                                            />
                                                        </div>

                                                        <div>
                                                            <h3 className="text-xl font-bold text-white">
                                                                {budget.category}
                                                            </h3>

                                                            <p className="mt-1 text-sm text-slate-400">
                                                                Monthly Budget
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`rounded-full px-4 py-2 text-sm font-bold ${isOverBudget
                                                            ? "bg-red-500/15 text-red-400"
                                                            : "bg-green-500/15 text-green-400"
                                                            }`}
                                                    >
                                                        {percentage.toFixed(0)}%
                                                    </div>
                                                </div>

                                                {/* Numbers */}
                                                <div className="mt-8 grid grid-cols-3 gap-4">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wide text-slate-500">
                                                            Budget
                                                        </p>

                                                        <h4 className="mt-2 text-lg font-black text-cyan-400">
                                                            {props.formatCurrency(budget.budget)}
                                                        </h4>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs uppercase tracking-wide text-slate-500">
                                                            Spent
                                                        </p>

                                                        <h4
                                                            className={`mt-2 text-lg font-black ${isOverBudget
                                                                ? "text-red-400"
                                                                : "text-green-400"
                                                                }`}
                                                        >
                                                            {props.formatCurrency(budget.spent)}
                                                        </h4>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs uppercase tracking-wide text-slate-500">
                                                            Remaining
                                                        </p>

                                                        <h4
                                                            className={`mt-2 text-lg font-black ${remaining >= 0
                                                                ? "text-white"
                                                                : "text-red-400"
                                                                }`}
                                                        >
                                                            {props.formatCurrency(remaining)}
                                                        </h4>
                                                    </div>
                                                </div>

                                                {/* Progress */}
                                                <div className="mt-8">
                                                    <div className="mb-3 flex items-center justify-between">
                                                        <span className="text-sm text-slate-400">
                                                            Budget Usage
                                                        </span>

                                                        <span
                                                            className={`font-semibold ${isOverBudget
                                                                ? "text-red-400"
                                                                : "text-cyan-400"
                                                                }`}
                                                        >
                                                            {percentage.toFixed(1)}%
                                                        </span>
                                                    </div>

                                                    <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                                                        <div
                                                            style={{
                                                                width: `${Math.min(percentage, 100)}%`,
                                                            }}
                                                            className={`h-full rounded-full transition-all duration-700 ${isOverBudget
                                                                ? "bg-linear-to-r from-red-500 to-orange-500"
                                                                : "bg-linear-to-r from-cyan-400 via-sky-500 to-violet-500"
                                                                }`}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Footer */}
                                                <div className="mt-6 flex items-center justify-between">
                                                    <span
                                                        className={`rounded-full px-4 py-2 text-sm font-semibold ${isOverBudget
                                                            ? "bg-red-500/10 text-red-400"
                                                            : "bg-green-500/10 text-green-400"
                                                            }`}
                                                    >
                                                        {isOverBudget
                                                            ? "Over Budget"
                                                            : "Within Budget"}
                                                    </span>

                                                    <span className="text-sm text-slate-500">
                                                        Category #{index + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                    ): (
                        <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-16 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">
                                <PieChartIcon
                                    size={40}
                                    className="text-cyan-400"
                                />
                            </div>
                            <h3 className="mt-6 text-2xl font-black text-white">
                                No Budgets Created
                            </h3>

                            <p className="mt-3 text-slate-400">
                                Create your first monthly budget to start tracking your expenses.
                            </p>

                            <button
                                onClick={() => setShowBudgetModal(true)}
                                className=" mt-8 cursor-pointer rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-6
                                py-3 font-semibold text-white transition hover:scale-105"
                            >
                                + Create Budget
                            </button>
                        </div>
                    )
                }
            </div>            

            {/* ================= BUDGET CREATION MODAL ================= */}
            {showBudgetModal && (
                    <BudgetModel 
                        formatCurrency={props.formatCurrency}
                        setBudgets={props.setBudgets}

                        showBudgetModal = {showBudgetModal} 
                        setShowBudgetModal ={setShowBudgetModal }
                    />
                )
            }
            
            {/* ================= MONTH HISTORY MODAL ================= */}
            {showHistory && (
                <History 
                    monthlyHistory={monthlyHistory}
                    setMonthlyHistory ={setMonthlyHistory}

                    showHistory={showHistory}
                    setShowHistory={setShowHistory}
                    />
                )
            }
        </section>
    )
}