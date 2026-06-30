import React from 'react'

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function BreakdownChart(props) {

    const COLORS = {
        Food: "#FF6B6B",
        Transportation: "#4ECDC4",
        Entertainment: "#FFE66D",
        Utilities: "#95E1D3",
        Healthcare: "#F38181",
        Shopping: "#AA96DA",
        Other: "#FCBAD3",
    };

    const expensesByCategory = Object.entries(
        props.currentMonthTransactions.filter((transaction) => transaction.type === "expense")
            .reduce((acc, transaction) => {
                const category = transaction.category;

                acc[category] =
                    (acc[category] || 0) + Number(transaction.amount);

                return acc;
            }, {})
    ).map(([name, value]) => ({
        name,
        value,
    }));

    const expenseTransactions = props.currentMonthTransactions.filter(
        (t) => t.type === "expense"
    );

    return (
        <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.45)]">

            <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
            <div className="relative p-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>

                        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                            📊 Expense Analytics
                        </span>

                        <h2 className="mt-5 text-4xl font-black text-white">
                            Expense Breakdown
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Category-wise spending visualization for this month.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">

                        <p className="text-sm text-slate-400">
                            Expense Categories
                        </p>

                        <h3 className="mt-2 text-4xl font-black text-cyan-400">
                            {expensesByCategory.length}
                        </h3>

                    </div>

                </div>

                {/* ================= QUICK STATS ================= */}

                <div className="mt-10 grid gap-6 md:grid-cols-3">

                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">

                        <p className="text-slate-400">
                            Total Expenses
                        </p>

                        <h3 className="mt-3 text-3xl font-black text-red-400">
                            ₹
                            {expenseTransactions
                                .reduce(
                                    (sum, item) =>
                                        sum + Number(item.amount),
                                    0
                                )
                                .toLocaleString()}
                        </h3>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">

                        <p className="text-slate-400">
                            Categories Used
                        </p>

                        <h3 className="mt-3 text-3xl font-black text-cyan-400">
                            {expensesByCategory.length}
                        </h3>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">

                        <p className="text-slate-400">
                            Largest Expense
                        </p>

                        <h3 className="mt-3 text-3xl font-black text-violet-400">
                            {expensesByCategory.length
                                ? expensesByCategory.reduce((a, b) =>
                                    a.value > b.value ? a : b
                                ).name
                                : "--"}
                        </h3>

                    </div>

                </div>

                {/* ================= CHART CARD ================= */}

                <div className="mt-10 rounded-[30px] border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden">

                    <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
                        <div>

                            <h3 className="text-2xl font-black text-white">
                                Expense Distribution
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Spending grouped by category.
                            </p>

                        </div>

                        <div className="rounded-full bg-cyan-500/10 px-5 py-3 text-cyan-300 font-semibold">
                            Pie Chart
                        </div>

                    </div>

                    <div className="p-8">
                        {expenseTransactions.length > 0 ? (
                            <div className="grid lg:grid-cols-3 gap-8 items-center">
                                <div className="lg:col-span-2 min-w-0 min-h-105">
                                    <ResponsiveContainer
                                        width="100%"
                                        height={420}
                                    >
                                        <PieChart>
                                            <defs>
                                                <linearGradient
                                                    id="chartGradient"
                                                    x1="0"
                                                    y1="0"
                                                    x2="1"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="#22d3ee"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#8b5cf6"
                                                    />
                                                </linearGradient>
                                            </defs>

                                            <Pie
                                                data={expensesByCategory}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={75}
                                                outerRadius={135}
                                                paddingAngle={4}
                                                dataKey="value"
                                                labelLine={false}
                                                label={({ percent }) =>
                                                    `${(percent * 100).toFixed(0)}%`
                                                }
                                            >
                                                {expensesByCategory.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={index}
                                                            fill={
                                                                COLORS[
                                                                entry.name
                                                                ] || "#8b5cf6"
                                                            }
                                                            stroke="#0f172a"
                                                            strokeWidth={3}
                                                        />
                                                    )
                                                )}
                                            </Pie>

                                            <Tooltip
                                                contentStyle={{
                                                    background: "#0f172a",
                                                    border:
                                                        "1px solid rgba(255,255,255,.1)",
                                                    borderRadius: "18px",
                                                    color: "#fff",
                                                }}

                                                formatter={(value) => [
                                                    `₹${Number(
                                                        value
                                                    ).toLocaleString()}`,
                                                    "Spent",
                                                ]}
                                            />

                                            <Legend
                                                verticalAlign="bottom"
                                                iconType="circle"
                                                wrapperStyle={{
                                                    color: "#CBD5E1",
                                                    paddingTop: 20,
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* ================= CATEGORY SUMMARY ================= */}
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold text-white">
                                        Top Categories
                                    </h4>

                                    {expensesByCategory
                                        .sort((a, b) => b.value - a.value)
                                        .map((item) => {

                                            const total =
                                                expenseTransactions.reduce(
                                                    (sum, t) =>
                                                        sum +
                                                        Number(t.amount),
                                                    0
                                                );

                                            const percentage =
                                                (
                                                    (item.value / total) *
                                                    100
                                                ).toFixed(1);

                                            return (

                                                <div
                                                    key={item.name}
                                                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                                                >
                                                    <div className="flex justify-between items-center">

                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="h-4 w-4 rounded-full"
                                                                style={{
                                                                    background:
                                                                        COLORS[
                                                                        item.name
                                                                        ] ||
                                                                        "#8b5cf6",
                                                                }}
                                                            />

                                                            <span className="font-semibold text-white">
                                                                {item.name}
                                                            </span>
                                                        </div>

                                                        <span className="text-cyan-300 font-bold">
                                                            {percentage}%
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 h-2 rounded-full bg-slate-700 overflow-hidden">
                                                        <div
                                                            style={{
                                                                width: `${percentage}%`,
                                                                background:
                                                                    COLORS[
                                                                    item.name
                                                                    ] ||
                                                                    "#8b5cf6",
                                                            }}
                                                            className="h-full rounded-full transition-all duration-700"
                                                        />
                                                    </div>

                                                    <div className="mt-3 flex justify-between text-sm">

                                                        <span className="text-slate-400">
                                                            Amount
                                                        </span>

                                                        <span className="font-semibold text-white">
                                                            ₹
                                                            {item.value.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">

                                {/* Empty Icon */}

                                <div className="relative">

                                    <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl" />
                                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-500/20 bg-slate-900">

                                        <span className="text-6xl">
                                            📊
                                        </span>

                                    </div>

                                </div>

                                <h3 className="mt-8 text-3xl font-black text-white">
                                    No Expense Data
                                </h3>

                                <p className="mt-4 max-w-lg leading-8 text-slate-400">
                                    You haven't added any expense transactions for this month.
                                    Once expenses are recorded, this analytics dashboard will
                                    display a beautiful category-wise breakdown.
                                </p>

                                {/* Feature Cards */}

                                <div className="mt-12 grid gap-5 md:grid-cols-3">

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <div className="text-4xl">
                                            💰
                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">
                                            Track Expenses
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            Record every spending category.
                                        </p>

                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <div className="text-4xl">
                                            📈
                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">
                                            Visual Analytics
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            Understand your spending patterns instantly.
                                        </p>

                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                                        <div className="text-4xl">
                                            🎯
                                        </div>

                                        <h4 className="mt-4 text-lg font-bold text-white">
                                            Better Planning
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-400">
                                            Stay within budget and improve savings.
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