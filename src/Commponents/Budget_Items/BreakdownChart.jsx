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
        <>
            <div className="p-6 rounded-2xl shadow-lg bg-white border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Expense Breakdown
                </h2>
                {expenseTransactions.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={expensesByCategory}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ name, value }) =>
                                    `${name}: Rs. ${value}`
                                }
                                outerRadius={100}
                                dataKey="value"
                            >
                                {expensesByCategory.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            COLORS[entry.name] ||
                                            "#8884d8"
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-75 flex flex-col items-center justify-center text-slate-500">
                        <p className="text-lg font-semibold">
                            No Expense Data Available
                        </p>

                        <p className="text-sm">
                            Add expenses to see category breakdown
                        </p>
                    </div>
                )
                }
            </div>
        </>
    )
}
