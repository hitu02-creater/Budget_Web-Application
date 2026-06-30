import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import {
    Wallet,
    TrendingUp,
    Plus,
    Receipt,
    Target,
    CalendarDays,
    ArrowUpRight,
    Sparkles,
    X,
} from "lucide-react";

import AddTransactions from "../../../Models/AddTransactions";
import GoalModel from "../../../Models/GoalModel";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
};

export default function HeroSection(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const greeting = useMemo(() => {
        const hour = props.currentTime.getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";

        return "Good Evening";
    }, [props.currentTime]);

    const fullDate = props.currentTime.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const time = props.currentTime.toLocaleTimeString("en-IN");

    // Dummy values (Later connect to state)
    const income = props.transactions
        .filter((item) => item.type === "income")
        .reduce((acc, item) => acc + Number(item.amount), 0);

    const expense = props.transactions
        .filter((item) => item.type === "expense")
        .reduce((acc, item) => acc + Number(item.amount), 0);

    const balance = income - expense;

    const addTransaction = (newTransaction) => {

        props.setTransactions((prev) => [
            ...prev,
            {
                ...newTransaction,
                id: Date.now().toString(),
                amount: Number(newTransaction.amount),
                month: props.month
            },
        ]);
    };

    const [showGoalModal, setShowGoalModal] = useState(false);

    const [savingGoal, setSavingGoal] = useState(() => {
        return Number(localStorage.getItem("savingGoal")) || 100000;
    });

    const handleSaveGoal = (goal) => {
        setSavingGoal(goal);
        localStorage.setItem("savingGoal", goal);
        setShowGoalModal(false);
    };

    const progress = Math.min((balance / savingGoal) * 100, 100);

    return (
        <>
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
                <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-[140px]" />
                <div className="relative p-8">
                    <div className="grid lg:grid-cols-2 gap-10 items-center text-[#ffffff]">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300 text-sm font-semibold">

                                    <Sparkles size={16} />
                                    Smart Budget Dashboard
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: .2 }}
                                className="text-5xl font-black mt-6 leading-tight"
                            >
                                {greeting},
                                <br />
                                <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                                    Hitesh 👋
                                </span>

                            </motion.h1>

                            <p className="mt-5 text-slate-300 leading-8 max-w-xl">
                                Manage your finances effortlessly. Monitor your income,
                                expenses, savings and monthly goals from one beautiful dashboard.
                            </p>

                            <div className="flex flex-wrap gap-6 mt-8">
                                <div className="flex items-center gap-3">
                                    <CalendarDays className="text-cyan-400" />
                                    <div>
                                        <p className="text-sm text-slate-400">
                                            Today
                                        </p>
                                        <p className="font-semibold">
                                            {fullDate}
                                        </p>

                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">
                                        Time
                                    </p>

                                    <p className="font-semibold">
                                        {time}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">
                                        Month
                                    </p>

                                    <p className="font-semibold">
                                        {props.month}
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 mt-10">
                                <button
                                    onClick={() => {
                                        setShowGoalModal(true);
                                    }}
                                    className="flex items-center gap-2 rounded-xl cursor-pointer bg-cyan-500 px-6 py-3 font-semibold hover:bg-cyan-400 transition">
                                    <span className="hidden sm:inline font-['JetBrains_Mono',monospace] text-[1.2rem]">🎯 Set Goal</span>
                                </button>

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 rounded-xl cursor-pointer border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 transition">
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline font-['JetBrains_Mono',monospace] text-[1.2rem]">Add Transaction</span>
                                </button>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-lg p-7">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-slate-400">
                                            Total Balance
                                        </p>

                                        <h2 className="text-4xl font-black mt-2">
                                            ₹{balance.toLocaleString()}
                                        </h2>
                                    </div>

                                    <div className="rounded-2xl bg-cyan-500/20 p-4">
                                        <Wallet className="text-cyan-400" size={32} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5 mt-8">

                                    <div className="rounded-2xl bg-white/5 p-5">
                                        <div className="flex justify-between">
                                            <TrendingUp className="text-green-400" />
                                            <ArrowUpRight className="text-green-400" />
                                        </div>

                                        <p className="mt-4 text-slate-400">
                                            Income
                                        </p>

                                        <h3 className="text-2xl font-bold mt-1">
                                            ₹{income.toLocaleString()}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl bg-white/5 p-5">

                                        <div className="flex justify-between">
                                            <Receipt className="text-red-400" />
                                            <ArrowUpRight className="text-red-400 rotate-90" />
                                        </div>

                                        <p className="mt-4 text-slate-400">
                                            Expenses
                                        </p>

                                        <h3 className="text-2xl font-bold mt-1">
                                            ₹{expense.toLocaleString()}
                                        </h3>
                                    </div>

                                </div>

                                {/* Goal */}

                                <div className="mt-8">

                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <Target className="text-yellow-400" />
                                            <span className="font-semibold">
                                                Savings Goal
                                            </span>
                                        </div>

                                        <span>
                                            {progress.toFixed(0)}%
                                        </span>
                                    </div>

                                    <div className="mt-4 h-4 rounded-full bg-slate-700 overflow-hidden">

                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{
                                                duration: 1,
                                            }}
                                            className="h-full rounded-full bg-linear-to-r from-cyan-400 to-violet-500"
                                        />

                                    </div>

                                    <div className="flex justify-between mt-3 text-sm text-slate-400">
                                        <span>
                                            ₹{balance.toLocaleString()}
                                        </span>

                                        <span>
                                            ₹{savingGoal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Modal */}
            {isModalOpen && (
                < AddTransactions
                    formData={props.formData}
                    setFormData={props.setFormData}
                    addTransaction={addTransaction}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}

            {showGoalModal && (
                <GoalModel
                    currentGoal={savingGoal}
                    onSave={handleSaveGoal}
                    onClose={() => setShowGoalModal(false)}
                />
            )}
        </>
    );
}