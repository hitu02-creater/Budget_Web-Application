import React from 'react'

export default function Transaction_Preview(props) {
    return (
        <section className="relative mt-6 overflow-hidden rounded-4xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">

            <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
            <div className="relative p-8">
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
                        <p className="text-slate-400">
                            Total Transactions
                        </p>

                        <h3 className="mt-3 text-3xl font-black text-cyan-400">
                            {props.currentMonthTransactions.length}
                        </h3>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
                        <p className="text-slate-400">
                            Income Entries
                        </p>

                        <h3 className="mt-3 text-3xl font-black text-green-400">
                            {
                                props.currentMonthTransactions.filter(
                                    (t) => t.type === "income"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
                        <p className="text-slate-400">
                            Expense Entries
                        </p>

                        <h3 className="mt-3 text-3xl font-black text-red-400">
                            {
                                props.currentMonthTransactions.filter(
                                    (t) => t.type === "expense"
                                ).length
                            }
                        </h3>
                    </div>
                </div>
                {/* ================= TRANSACTION LIST ================= */}

                <div className="mt-10 rounded-[30px] border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden">

                    <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
                        <div>
                            <h3 className="text-2xl font-black text-white">
                                Latest Activity
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Showing your 5 most recent transactions.
                            </p>
                        </div>

                        <div className="rounded-full bg-cyan-500/10 px-5 py-3 text-cyan-300 font-semibold">
                            Live Feed
                        </div>
                    </div>

                    <div className="p-6 space-y-5">
                        {props.currentMonthTransactions.length > 0 ? (
                            props.currentMonthTransactions
                                .slice(0, 5)
                                .map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10"
                                    >
                                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
                                        </div>

                                        <div className="relative flex items-center justify-between gap-5 p-6">

                                            <div className="flex items-center gap-5">
                                                <div
                                                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${transaction.type === "income"
                                                        ? "bg-green-500/15"
                                                        : "bg-red-500/15"
                                                        }`}
                                                >
                                                    {transaction.type === "income"
                                                        ? "📈"
                                                        : "💳"}
                                                </div>

                                                <div>
                                                    <h4 className="text-xl font-bold text-white">
                                                        {transaction.description}
                                                    </h4>

                                                    <div className="mt-2 flex flex-wrap items-center gap-3">
                                                        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                                                            {transaction.category}
                                                        </span>
                                                        {transaction.date && (
                                                            <span className="text-sm text-slate-400">
                                                                📅 {transaction.date}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div
                                                    className={`text-3xl font-black ${transaction.type === "income"
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                        }`}
                                                >
                                                    {transaction.type === "income"
                                                        ? "+"
                                                        : "-"}
                                                    {props.formatCurrency(
                                                        transaction.amount
                                                    )}
                                                </div>

                                                <div
                                                    className={`mt-3 inline-flex rounded-full px-4 py-2 text-xs font-bold ${transaction.type === "income"
                                                        ? "bg-green-500/15 text-green-300"
                                                        : "bg-red-500/15 text-red-300"
                                                        }`}
                                                >
                                                    {transaction.type === "income"
                                                        ? "Income"
                                                        : "Expense"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">

                                {/* Empty State Icon */}
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl" />
                                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-500/20 bg-slate-900">
                                        <span className="text-6xl">
                                            💳
                                        </span>
                                    </div>
                                </div>

                                <h3 className="mt-8 text-3xl font-black text-white">
                                    No Transactions Yet
                                </h3>

                                <p className="mt-4 max-w-xl leading-8 text-slate-400">
                                    Your recent transactions will appear here once you start
                                    adding income or expenses. Track every payment, salary,
                                    shopping, and daily spending in one place.
                                </p>

                                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                        <div className="text-4xl">
                                            💰
                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">
                                            Record Income
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            Save salary, freelance income and other earnings.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                        <div className="text-4xl">
                                            🛒
                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">
                                            Track Spending
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            Monitor every purchase and stay within budget.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                        <div className="text-4xl">
                                            📈
                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">
                                            View Insights
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            Understand spending patterns with smart analytics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}