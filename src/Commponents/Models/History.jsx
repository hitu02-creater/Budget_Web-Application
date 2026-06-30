import React from 'react';

import {
    Download
} from "lucide-react"

export default function History(props) {

    const clearHistory = () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete all monthly history reports?"
        );

        if (!confirmed) return;

        props.setMonthlyHistory([]);

        localStorage.removeItem("monthlyHistory");

        props.setShowHistory(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6">
                <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-4xl border border-white/10 bg-[#0f172a]/95 shadow-[0_30px_80px_rgba(0,0,0,.6)]">
                    <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]" />
                    <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-500/15 blur-[120px]" />
                    <div className="relative">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 border border-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
                                    📜 Monthly Reports
                                </span>

                                <h2 className="mt-4 text-4xl font-black text-white">
                                    Budget History
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    Review all previous monthly financial reports.
                                </p>

                            </div>

                            <button
                                onClick={() => props.setShowHistory(false)}
                                className="rounded-xl bg-white/5 p-3 text-slate-400 cursor-pointer transition hover:bg-red-500 hover:text-white"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Content */}
                        <div className="max-h-[65vh] overflow-y-auto p-8 space-y-6">
                            {props.monthlyHistory.length > 0 ? (
                                props.monthlyHistory.map((month) => (
                                    <div
                                        key={month.id}
                                        className="rounded-3xl border border-white/10 bg-slate-900/60 p-7 backdrop-blur-xl hover:border-cyan-400/30 transition"
                                    >

                                        {/* Top */}
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                                            <div>
                                                <h3 className="text-2xl font-black text-white">
                                                    {month.month}
                                                </h3>

                                                <p className="mt-2 text-slate-400">
                                                    {month.transactions.length} Transactions Recorded
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => props.exportMonthReport(month)}
                                                className="rounded-2xl cursor-pointer bg-linear-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white transition hover:scale-105 flex items-center gap-2"
                                            >
                                                <Download size={18} />
                                                Download Report
                                            </button>

                                        </div>

                                        {/* Statistics */}
                                        <div className="mt-8 grid gap-5 md:grid-cols-4">
                                            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-5">
                                                <p className="text-slate-400 text-sm">
                                                    Total Budget
                                                </p>

                                                <h4 className="mt-2 text-2xl font-black text-cyan-400">
                                                    ₹{month.totalBudget.toLocaleString()}
                                                </h4>
                                            </div>

                                            <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
                                                <p className="text-slate-400 text-sm">
                                                    Income
                                                </p>

                                                <h4 className="mt-2 text-2xl font-black text-green-400">
                                                    ₹{month.totalIncome.toLocaleString()}
                                                </h4>
                                            </div>

                                            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
                                                <p className="text-slate-400 text-sm">
                                                    Expenses
                                                </p>

                                                <h4 className="mt-2 text-2xl font-black text-red-400">
                                                    ₹{month.totalExpenses.toLocaleString()}
                                                </h4>
                                            </div>

                                            <div className="rounded-2xl bg-violet-500/10 border border-violet-500/20 p-5">
                                                <p className="text-slate-400 text-sm">
                                                    Remaining
                                                </p>

                                                <h4
                                                    className={`mt-2 text-2xl font-black ${month.remainingBudget >= 0
                                                        ? "text-violet-400"
                                                        : "text-red-400"
                                                        }`}
                                                >
                                                    ₹{month.remainingBudget.toLocaleString()}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            ) : (
                                <div className="py-20 text-center">
                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10">
                                        📂
                                    </div>

                                    <h3 className="mt-8 text-3xl font-black text-white">
                                        No Monthly History
                                    </h3>

                                    <p className="mt-3 text-slate-400">
                                        Previous month reports will appear here.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-4 border-t border-white/10 p-6">
                            <button
                                onClick={clearHistory}
                                className="rounded-2xl cursor-pointer bg-linear-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
                            >
                                🗑 Clear History
                            </button>

                            <button
                                onClick={() => props.setShowHistory(false)}
                                className="rounded-2xl cursor-pointer border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/10"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
