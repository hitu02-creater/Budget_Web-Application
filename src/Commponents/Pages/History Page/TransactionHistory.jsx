import React , { useState } from 'react';

import {
    Trash2,
    Calendar,
    Receipt,
    Search,
    Filter,
    ArrowUpRight,
} from "lucide-react";

import Transaction_Preview from "./Transaction-Items/Transaction_Preview";

export default function TransactionHistory(props) {

    const [filter, setFilter] = useState("All");

    const currentMonthTransactions =
        props.transactions.filter(
            (transaction) =>
                transaction.month === props.month
        );

    return (
        <section className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

            {/* Glow */}
            <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-[140px]" />

            <div className="relative p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    {/* Left */}
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300 text-sm font-semibold">
                            <Receipt size={16} />
                            Transaction History
                        </span>

                        <h2 className="mt-5 text-4xl font-black text-white">
                            Transaction History
                        </h2>

                        <p className="mt-2 text-slate-400 max-w-xl">
                            Review your past transactions
                        </p>
                    </div>

                    {/* Right */}

                    <div className="flex flex-wrap gap-4">

                        <div className="relative mr-5">
                            <Filter
                                size={18}
                                className="absolute text-white left-4 top-1/2 -translate-y-1/2"
                            />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className=" appearance-none bg-slate-900 border cursor-pointer border-slate-800 rounded-xl pl-11
                                    pr-10 py-3 text-white outline-none focus:border-cyan-400 transition">
                                <option>All</option>
                                <option>Income</option>
                                <option>Expense</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Transaction_Preview
                    currentMonthTransactions={currentMonthTransactions}
                    formatCurrency={props.formatCurrency}
                />
            </div>
        </section>
    )
}
