import React , { useState } from 'react';

import {
    // PieChart as PieChartIcon,
    Plus,
    // CalendarClock,
    // Download
} from "lucide-react";

export default function BudgetModel(props) {

    const [budgetForm, setBudgetForm] = useState({
        category: "",
        amount: "",
    });

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

        props.setShowBudgetModal(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6">
                <div className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#0f172a]/95 shadow-[0_20px_80px_rgba(0,0,0,.6)]">
                    <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-cyan-500/15 blur-[90px]" />
                    <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-violet-500/15 blur-[90px]" />
                    <div className="relative p-8">

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 border border-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
                                    <Plus size={15} />
                                    New Budget
                                </span>

                                <h2 className="mt-5 text-3xl font-black text-white">
                                    Create Budget
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    Create a monthly budget for a spending category.
                                </p>

                            </div>

                            <button
                                onClick={() => props.setShowBudgetModal(false)}
                                className="rounded-xl cursor-pointer bg-white/5 p-3 text-slate-400 transition hover:bg-red-500 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Category */}
                        <div className="mt-8">

                            <label className="mb-3 block text-sm font-semibold text-slate-300">
                                Budget Category
                            </label>

                            <select
                                value={budgetForm.category}
                                onChange={(e) =>
                                    setBudgetForm({
                                        ...budgetForm,
                                        category: e.target.value,
                                    })
                                }
                                className=" w-full rounded-2xl border border-white/10 bg-slate-900/70
                                    px-5 py-4 text-white outline-none transition focus:border-cyan-400">

                                <option value="">Select Category</option>
                                <option value="Food">
                                    🍔 Food
                                </option>
                                <option value="Transportation">
                                    🚗 Transportation
                                </option>
                                <option value="Entertainment">
                                    🎬 Entertainment
                                </option>
                                <option value="Utilities">
                                    ⚡ Utilities
                                </option>
                                <option value="Healthcare">
                                    ❤️ Healthcare
                                </option>
                                <option value="Shopping">
                                    🛍 Shopping
                                </option>

                            </select>
                        </div>

                        {/* Amount */}
                        <div className="mt-6">

                            <label className="mb-3 block text-sm font-semibold text-slate-300">
                                Budget Amount
                            </label>

                            <input
                                type="number"
                                placeholder="Enter Budget Amount"
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

                        {/* Preview */}
                        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                            <div className="flex justify-between">

                                <span className="text-slate-400">
                                    Category
                                </span>

                                <span className="font-semibold text-cyan-300">
                                    {budgetForm.category || "--"}
                                </span>

                            </div>

                            <div className="mt-4 flex justify-between">
                                <span className="text-slate-400">
                                    Budget
                                </span>

                                <span className="font-bold text-green-400">
                                    {budgetForm.amount
                                        ? props.formatCurrency(Number(budgetForm.amount))
                                        : "₹0"}
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-10 flex gap-4">

                            <button
                                onClick={createNewBudget}
                                className=" flex-1 rounded-2xl cursor-pointer bg-linear-to-r from-cyan-500 to-violet-600 py-4
                                            text-lg font-bold text-white transition hover:scale-[1.03]">

                                Save Budget
                            </button>

                            <button
                                onClick={() => props.setShowBudgetModal(false)}
                                className=" flex-1 rounded-2xl cursor-pointer border border-white/10 bg-white/5 py-4
                                    text-lg font-semibold text-slate-300 transition hover:bg-white/10">

                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
