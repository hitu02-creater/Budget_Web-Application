import React from "react";
import {
    Trash2,
    Calendar,
    Receipt,
    Search,
    Filter,
    ArrowUpRight,
} from "lucide-react";

export default function AllTransactions(props) {
    const handleDeleteTransaction = (id) => {
        props.setTransactions((prev) =>
            prev.filter((transaction) => transaction.id !== id)
        );
    };

    return (
        <section className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

            <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-[140px]" />
            <div className="relative p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    {/* Left */}
                    <div>
                        <h2 className="mt-5 text-4xl font-black text-white">
                            All Transactions
                        </h2>

                        <p className="mt-2 text-slate-400 max-w-xl">
                            View, manage and organize all your income and expense
                            transactions in one place.
                        </p>
                    </div>

                    {/* Right */}

                    <div className="flex flex-wrap gap-4">
                        {/* Filter */}

                        <button
                            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 
                            px-5 py-3 text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-500/10"
                        >
                            <Filter size={18} />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="grid gap-5 mt-10 lg:grid-cols-3">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-slate-400">
                                    Total Transactions
                                </p>

                                <h3 className="mt-2 text-3xl font-black text-white">
                                    {props.transactions.length}
                                </h3>

                            </div>
                            <div className="rounded-2xl bg-cyan-500/20 p-4">
                                <Receipt
                                    className="text-cyan-400"
                                    size={28}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
                        <div className="flex justify-between">
                            <div>

                                <p className="text-slate-400">
                                    Income
                                </p>

                                <h3 className="mt-2 text-3xl font-black text-green-400">
                                    {
                                        props.transactions.filter(
                                            (t) => t.type === "income"
                                        ).length
                                    }
                                </h3>
                            </div>

                            <div className="rounded-2xl bg-green-500/20 p-4">
                                <ArrowUpRight
                                    className="text-green-400"
                                    size={28}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
                        <div className="flex justify-between">

                            <div>

                                <p className="text-slate-400">
                                    Expenses
                                </p>

                                <h3 className="mt-2 text-3xl font-black text-red-400">
                                    {
                                        props.transactions.filter(
                                            (t) => t.type === "expense"
                                        ).length
                                    }
                                </h3>

                            </div>

                            <div className="rounded-2xl bg-red-500/20 p-4">
                                <ArrowUpRight
                                    className="rotate-90 text-red-400"
                                    size={28}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-lg">

                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Date
                                </th>
                                <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Description
                                </th>
                                <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Category
                                </th>
                                <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Type
                                </th>
                                <th className="px-8 py-5 text-right text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Amount
                                </th>
                                <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.transactions.length > 0 ? (
                                props.transactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="group border-b border-white/5 transition-all duration-300 hover:bg-cyan-500/5"
                                    >
                                        {/* Date */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15">
                                                    <Calendar
                                                        size={18}
                                                        className="text-cyan-400"
                                                    />
                                                </div>
                                                <div>

                                                    <p className="font-medium text-white">
                                                        {transaction.date}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        Transaction
                                                    </p>

                                                </div>
                                            </div>
                                        </td>
                                        {/* Description */}
                                        <td className="px-8 py-6">
                                            <div>
                                                <h4 className="font-semibold text-white group-hover:text-cyan-400 transition">
                                                    {transaction.description}
                                                </h4>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Personal Finance
                                                </p>
                                            </div>
                                        </td>
                                        {/* Category */}
                                        <td className="px-8 py-6">
                                            <span
                                                className="inline-flex items-center rounded-full border border-cyan-500/20
                                              bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300"
                                            >
                                                {transaction.category}
                                            </span>
                                        </td>
                                        {/* Type */}
                                        <td className="px-8 py-6">
                                            {transaction.type === "income" ? (
                                                <span
                                                    className=" inline-flex tems-center rounded-full border border-green-500/30 bg-green-500/15
                                                    px-4 py-2 text-sm font-bold text-green-400"
                                                >
                                                    ● Income
                                                </span>
                                            ) : (
                                                <span
                                                    className="inline-flex items-center rounded-full border
                                                    border-red-500/30 bg-red-500/15 px-4 py-2 text-sm font-bold text-red-400"
                                                >
                                                    ● Expense
                                                </span>

                                            )}

                                        </td>

                                        {/* Amount */}

                                        <td
                                            className={`px-8 py-6 text-right text-lg font-black ${transaction.type === "income"
                                                ? "text-green-400"
                                                : "text-red-400"
                                                }`}
                                        >
                                            {transaction.type === "income" ? "+" : "-"}
                                            {props.formatCurrency(transaction.amount)}
                                        </td>
                                        {/* Action */}
                                        <td className="px-8 py-6 text-center">
                                            <button
                                                onClick={() =>
                                                    handleDeleteTransaction(transaction.id)
                                                }
                                                className="rounded-xl border cursor-pointer border-red-500/20 bg-red-500/10 p-3 text-red-400
                                                transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-24 text-center">

                                        <div className="flex flex-col items-center">

                                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10" >

                                                <Receipt
                                                    size={45}
                                                    className="text-cyan-400"
                                                />

                                            </div>

                                            <h3 className="mt-8 text-3xl font-black text-white">
                                                No Transactions Yet
                                            </h3>

                                            <p className="mt-3 max-w-md text-slate-400">
                                                Your transactions will appear here once you add
                                                income or expenses.
                                            </p>

                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}