import React, { useState } from 'react';

import {
    Plus,
    X,
    ChevronDown,
} from "lucide-react";

const EXPENSE_CATEGORIES = [
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Shopping",
    "Other",
];

const INCOME_CATEGORIES = [
    "Salary",
    "Freelance",
    "Investments",
    "Bonus",
    "Other",
];

const CATEGORY_ICONS = {
    Food: "🍔",
    Transportation: "🚗",
    Entertainment: "🎬",
    Utilities: "⚡",
    Healthcare: "❤️",
    Shopping: "🛍️",
    Salary: "💰",
    Freelance: "💻",
    Investments: "📈",
    Bonus: "🎁",
    Other: "📦",
};

export default function AddTransactions(props) {

    const [budgetForm, setBudgetForm] = useState({
        category: "",
        amount: "",
        discription: "",
        type: "",
        date: "",
    });

    const categories =
        budgetForm.type === "income"
            ? INCOME_CATEGORIES
            : EXPENSE_CATEGORIES;

    const handleAddTransaction = () => {
        if (!budgetForm.description || !budgetForm.amount || !budgetForm.category) {
            return;
        }

        const transaction = {
            description: budgetForm.description,
            amount: Number(budgetForm.amount),
            category: budgetForm.category,
            type: budgetForm.type,
            date: new Date().toISOString().split("T")[0],
            month: new Date().toLocaleString("default", {
                month: "short",
                year: "numeric",
            }),
        }

        props.addTransaction(transaction);
        setBudgetForm({
            description: "",
            amount: "",
            category: "",
            type: "",
        });
        props.setIsModalOpen(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
                <div className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#0f172a]/95 shadow-[0_20px_80px_rgba(0,0,0,.6)]">
                    <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-cyan-500/15 blur-[90px]" />
                    <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-violet-500/15 blur-[90px]" />
                    <div className="relative p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="font-['JetBrains_Mono',monospace] text-2xl mt-6 font-bold text-white">
                                    Add New Transaction
                                </h2>
                                <p className="font-['JetBrains_Mono',monospace] italic text-[14px] text-slate-400">
                                    Record a new income or expense
                                </p>
                            </div>
                            <button
                                onClick={() => props.setIsModalOpen(false)}
                                className="rounded-xl cursor-pointer bg-white/5 p-3 text-slate-400 transition hover:bg-red-500 hover:text-white"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Type Dropdown */}
                            <div>
                                <label className="mb-3 block text-sm font-semibold text-slate-300">
                                    Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={budgetForm.type}
                                        onChange={(e) =>
                                            setBudgetForm({
                                                ...budgetForm,
                                                type: e.target.value,
                                                category:"",
                                            })
                                        }
                                        className=" w-full cursor-pointer rounded-2xl border border-white/10 bg-slate-900/70
                                            px-5 py-4 text-white outline-none transition focus:border-cyan-400">

                                        <option value="">Select the Type</option>
                                        <option value="income">
                                            Income
                                        </option>
                                        <option value="expense">
                                            Expense
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Category Dropdown */}
                            <div>
                                <label className="mb-3 block text-sm font-semibold text-slate-300">
                                    Transaction Category
                                </label>

                                <select
                                    value={budgetForm.category}
                                    onChange={(e) =>
                                        setBudgetForm({
                                            ...budgetForm,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full cursor-pointer rounded-2xl border border-white/10 bg-slate-900/70
                                    px-5 py-4 text-white outline-none transition focus:border-cyan-400"
                                >
                                    <option value="">Select Category</option>

                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {CATEGORY_ICONS[category]} {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="mb-3 block text-sm font-semibold text-slate-300">
                                    Description
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g., Grocery Shopping"
                                    value={budgetForm.description ?? ""}
                                    onChange={(e) =>
                                        setBudgetForm({
                                            ...budgetForm,
                                            description: e.target.value,
                                        })
                                    }
                                    className=" w-full rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 text-white
                                        placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
                                />
                            </div>

                            {/* Amount Input */}
                            <div className="mt-6">

                                <label className="mb-3 block text-sm font-semibold text-slate-300">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    placeholder="Enter Transaction Amount"
                                    value={budgetForm.amount}
                                    onChange={(e) =>
                                        setBudgetForm({
                                            ...budgetForm,
                                            amount: e.target.value,
                                        })
                                    }
                                    className=" w-full rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 text-white
                                        placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
                                />

                            </div>

                            <button
                                onClick={handleAddTransaction}
                                className="w-full flex items-center justify-center gap-2 mt-6 mb-6 px-4 py-3 cursor-pointer rounded-lg bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all text-white font-medium shadow-lg hover:shadow-xl"
                            >
                                <Plus className="w-6 h-6" />
                                <span className="hidden capitalize sm:inline font-['JetBrains_Mono',monospace] text-[1.2rem]">Add Transaction</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
