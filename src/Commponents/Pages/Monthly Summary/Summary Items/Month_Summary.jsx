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
        <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">

            <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
            <div className="relative p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">

                            📊 Monthly Analytics

                        </span>

                        <h2 className="mt-5 text-4xl font-black text-white">

                            Budget Summary

                        </h2>

                        <p className="mt-2 text-slate-400">

                            Financial overview for

                            <span className="ml-2 font-semibold text-cyan-300">

                                {props.currentMonth}

                            </span>

                        </p>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">

                        <p className="text-sm text-slate-400">

                            Budget Usage

                        </p>

                        <h3 className="mt-2 text-4xl font-black text-cyan-400">

                            {budgetUsedPercentage}%

                        </h3>

                    </div>

                </div>

                {/* ================= KPI Cards ================= */}

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {/* Budget */}

                    <div className="group rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30">

                        <div className="flex items-center justify-between">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-2xl">

                                💰

                            </div>

                            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">

                                Budget

                            </span>

                        </div>

                        <p className="mt-6 text-sm text-slate-400">

                            Total Budget

                        </p>

                        <h3 className="mt-2 text-3xl font-black text-cyan-400">

                            {props.formatCurrency(totalBudget)}

                        </h3>

                    </div>

                    {/* Income */}

                    <div className="group rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-400/30">

                        <div className="flex items-center justify-between">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/15 text-2xl">

                                📈

                            </div>

                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">

                                Income

                            </span>

                        </div>

                        <p className="mt-6 text-sm text-slate-400">

                            Total Income

                        </p>

                        <h3 className="mt-2 text-3xl font-black text-green-400">

                            {props.formatCurrency(totalIncome)}

                        </h3>

                    </div>

                    {/* Expenses */}

                    <div className="group rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400/30">

                        <div className="flex items-center justify-between">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-2xl">

                                💸

                            </div>

                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">

                                Expenses

                            </span>

                        </div>

                        <p className="mt-6 text-sm text-slate-400">

                            Total Expenses

                        </p>

                        <h3 className="mt-2 text-3xl font-black text-red-400">

                            {props.formatCurrency(totalExpenses)}

                        </h3>

                    </div>

                    {/* Remaining */}

                    <div className="group rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/30">

                        <div className="flex items-center justify-between">

                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${remainingBudget >= 0
                                    ? "bg-violet-500/15"
                                    : "bg-orange-500/15"
                                }`}>

                                🎯

                            </div>

                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${remainingBudget >= 0
                                    ? "bg-violet-500/10 text-violet-300"
                                    : "bg-orange-500/10 text-orange-300"
                                }`}>

                                Remaining

                            </span>

                        </div>

                        <p className="mt-6 text-sm text-slate-400">

                            Remaining Budget

                        </p>

                        <h3 className={`mt-2 text-3xl font-black ${remainingBudget >= 0
                                ? "text-violet-400"
                                : "text-orange-400"
                            }`}>

                            {props.formatCurrency(remainingBudget)}

                        </h3>

                    </div>

                </div>

                @if {totalBudget === 0 ? (

                    <div className="mt-10">

                        <div className="relative overflow-hidden rounded-4xl border border-dashed border-cyan-500/20 bg-slate-900/50 backdrop-blur-xl">


                            <div className="absolute -top-16 left-10 h-52 w-52 rounded-full bg-cyan-500/10 blur-[100px]" />
                            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-violet-500/10 blur-[120px]" />
                            <div className="relative flex flex-col items-center justify-center px-8 py-20 text-center">

                                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 text-6xl">
                                    💰
                                </div>

                                <h2 className="mt-8 text-4xl font-black text-white">

                                    No Budget Created

                                </h2>

                                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-400">

                                    You haven't created a budget for

                                    <span className="mx-2 font-semibold text-cyan-300">

                                        {props.currentMonth}

                                    </span>

                                    yet. Start by creating your first monthly budget and begin tracking your finances like a pro.

                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <div className="text-4xl">

                                            📊

                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">

                                            Track Spending

                                        </h4>

                                        <p className="mt-2 text-sm text-slate-400">

                                            Monitor every expense category in real time.

                                        </p>

                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <div className="text-4xl">

                                            🎯

                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">

                                            Stay On Budget

                                        </h4>

                                        <p className="mt-2 text-sm text-slate-400">

                                            Know instantly when you're approaching your limit.

                                        </p>

                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <div className="text-4xl">

                                            📈

                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">

                                            Financial Growth

                                        </h4>

                                        <p className="mt-2 text-sm text-slate-400">

                                            Build better saving habits every month.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                ) : (

                    <>
                        {/* ================= Budget Usage ================= */}

                        <div className="rounded-[30px] border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/10 px-8 py-6">

                                <div>

                                    <h3 className="text-2xl font-black text-white">

                                        Budget Utilization

                                    </h3>

                                    <p className="mt-2 text-slate-400">

                                        Monitor your monthly spending performance.

                                    </p>

                                </div>

                                <div
                                    className={`rounded-full px-5 py-3 font-bold text-lg ${budgetUsedPercentage > 100
                                            ? "bg-red-500/15 text-red-400"
                                            : "bg-green-500/15 text-green-400"
                                        }`}
                                >

                                    {budgetUsedPercentage}%

                                </div>

                            </div>

                            <div className="p-8">

                                <div className="relative">

                                    <div className="h-5 overflow-hidden rounded-full bg-slate-800">

                                        <div
                                            style={{
                                                width: `${Math.min(
                                                    Number(budgetUsedPercentage),
                                                    100
                                                )}%`,
                                            }}
                                            className={`h-full rounded-full transition-all duration-1000 ${budgetUsedPercentage > 100
                                                    ? "bg-gradient-to-r from-red-500 via-orange-500 to-red-600"
                                                    : "bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"
                                                }`}
                                        />

                                    </div>

                                    <div className="mt-3 flex justify-between text-sm text-slate-500">

                                        <span>0%</span>

                                        <span>50%</span>

                                        <span>100%</span>

                                    </div>

                                </div>

                                {/* Stats */}

                                <div className="mt-10 grid md:grid-cols-3 gap-6">

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <p className="text-slate-400">

                                            Available Budget

                                        </p>

                                        <h3 className="mt-3 text-3xl font-black text-cyan-400">

                                            {props.formatCurrency(totalBudget)}

                                        </h3>

                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <p className="text-slate-400">

                                            Amount Spent

                                        </p>

                                        <h3 className="mt-3 text-3xl font-black text-red-400">

                                            {props.formatCurrency(totalExpenses)}

                                        </h3>

                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <p className="text-slate-400">

                                            Remaining

                                        </p>

                                        <h3
                                            className={`mt-3 text-3xl font-black ${remainingBudget >= 0
                                                    ? "text-green-400"
                                                    : "text-orange-400"
                                                }`}
                                        >

                                            {props.formatCurrency(
                                                Math.abs(remainingBudget)
                                            )}

                                        </h3>

                                    </div>

                                </div>

                                {/* Status Card */}

                                <div
                                    className={`mt-8 rounded-3xl border p-6 ${totalExpenses > totalBudget
                                            ? "border-red-500/20 bg-red-500/10"
                                            : "border-green-500/20 bg-green-500/10"
                                        }`}
                                >

                                    <div className="flex items-center gap-4">

                                        <div
                                            className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${totalExpenses > totalBudget
                                                    ? "bg-red-500/20"
                                                    : "bg-green-500/20"
                                                }`}
                                        >

                                            {totalExpenses > totalBudget ? "⚠️" : "✅"}

                                        </div>

                                        <div>

                                            <h4
                                                className={`text-xl font-bold ${totalExpenses > totalBudget
                                                        ? "text-red-400"
                                                        : "text-green-400"
                                                    }`}
                                            >

                                                {totalExpenses > totalBudget
                                                    ? "Budget Limit Exceeded"
                                                    : "Budget On Track"}

                                            </h4>

                                            <p className="mt-2 text-slate-300 leading-7">

                                                {totalExpenses > totalBudget
                                                    ? `You exceeded your monthly budget by ${props.formatCurrency(
                                                        totalExpenses - totalBudget
                                                    )}. Consider reducing spending in high-expense categories.`
                                                    : `Excellent! You're currently within your planned budget. Keep maintaining healthy financial habits.`}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                     </>
                )}
            </div>
        </section >
    )
}
