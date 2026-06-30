import React, { useState, useEffect } from 'react';

import {
    Sparkles,
    CalendarDays
} from "lucide-react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Details from './Budget_Items/Details';
import BreakdownChart from './Budget_Items/BreakdownChart';
import Month_Summary from '../Monthly Summary/Summary Items/Month_Summary';
import Transaction_Preview from '../History Page/Transaction-Items/Transaction_Preview';

export default function BudgetSummary(props) {

    const currentMonthTransactions =
        props.transactions.filter(
            (transaction) =>
                transaction.month === props.month
        );

    const currentMonthBudgets =
        props.budgets.filter(
            budget => budget.month === props.month
        );

    const exportMonthReport = (monthData) => {
        // Sheet 1 - Budget vs Expense
        const budgetComparison = monthData.props.budgets.map(
            (budget) => {

                const spent = monthData.transactions
                    .filter(
                        (t) =>
                            t.type === "expense" &&
                            t.category === budget.category
                    )
                    .reduce(
                        (sum, t) =>
                            sum + Number(t.amount),
                        0
                    );

                return {
                    Category: budget.category,
                    Budget: budget.budget,
                    ActualExpense: spent,
                    Remaining:
                        budget.budget - spent,

                    UsagePercentage:
                        budget.budget > 0
                            ? `${(
                                (spent / budget.budget) *
                                100
                            ).toFixed(2)}%`
                            : "0%",

                    Status:
                        spent > budget.budget
                            ? "Over Budget"
                            : "Within Budget",
                };
            }
        );

        // Sheet 2 - Transactions

        const transactionComparison =
            monthData.transactions.map(
                (transaction) => {

                    const categoryBudget =
                        monthData.props.budgets.find(
                            (b) =>
                                b.category ===
                                transaction.category
                        );

                    const totalSpentInCategory =
                        monthData.transactions
                            .filter(
                                (t) =>
                                    t.type ===
                                    "expense" &&
                                    t.category ===
                                    transaction.category
                            )
                            .reduce(
                                (sum, t) =>
                                    sum +
                                    Number(t.amount),
                                0
                            );

                    return {
                        Description:
                            transaction.description,

                        Category:
                            transaction.category,

                        Type:
                            transaction.type,

                        Amount:
                            transaction.amount,

                        Date:
                            transaction.date || "",

                        CategoryBudget:
                            categoryBudget?.budget ??
                            "N/A",

                        TotalSpentInCategory:
                            transaction.type ===
                                "expense"
                                ? totalSpentInCategory
                                : "N/A",

                        BudgetStatus:
                            transaction.type ===
                                "income"
                                ? "Income"
                                : totalSpentInCategory >
                                    (categoryBudget?.budget ||
                                        0)
                                    ? "Over Budget"
                                    : "Within Budget",
                    };
                }
            );

        // Create Workbook

        const workbook =
            XLSX.utils.book_new();

        const budgetSheet =
            XLSX.utils.json_to_sheet(
                budgetComparison
            );

        const transactionSheet =
            XLSX.utils.json_to_sheet(
                transactionComparison
            );

        XLSX.utils.book_append_sheet(
            workbook,
            budgetSheet,
            "Budget_vs_Expenses"
        );

        XLSX.utils.book_append_sheet(
            workbook,
            transactionSheet,
            "Transaction_Comparison"
        );

        const excelBuffer =
            XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

        const file = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            }
        );

        saveAs(
            file,
            `${monthData.props.month.replace(
                " ",
                "_"
            )}_Finance_Report.xlsx`
        );
    };

    return (
        <>
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-[120px]" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-500/15 blur-[120px]" />
            <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-500/10 blur-[150px]" />
            <div className="relative p-8 lg:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className=" inline-flex items-center gap-2 rounded-full border
                        border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 "
                        >
                            <Sparkles size={16} />
                            Budget Analytics
                        </span>

                        <h2 className="mt-6 text-5xl font-black tracking-tight text-white">
                            Budget Summary
                        </h2>

                        <p className="mt-3 max-w-xl leading-7 text-slate-400">
                            Plan budgets, analyze expenses and monitor your monthly financial performance from one intelligent dashboard.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex flex-wrap gap-4">

                        {/* Month */}
                        <div className=" flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-4">

                            <CalendarDays
                                className="text-cyan-400"
                                size={20}
                            />
                            <span className="font-semibold text-white">
                                {props.month}
                            </span>

                        </div>

                        {/* Export */}
                        <button className=" rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 px-7 py-4 
                            font-semibold text-white transition hover:scale-105">
                            Export Report
                        </button>

                    </div>
                </div>
                
                <div className="space-y-8 mt-10">

                    {/* Budget Planning */}
                    <div className=" group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/50 
                            backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40
                            hover:shadow-[0_0_40px_rgba(34,211,238,.15)]">

                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
                        <div className="border-b border-white/10 px-7 py-5">

                            <div className="flex items-center justify-center">

                                <div className="rounded-2xl bg-cyan-500/15 p-3 mr-4">
                                    <Sparkles
                                        size={28}
                                        className="text-cyan-400"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-white text-center">
                                        Budget Planning
                                    </h3>

                                    <p className="mt-1 text-[16px] text-slate-400 text-center">
                                        Manage monthly category budgets
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-7">
                            <Details
                                budgets={props.budgets}
                                setBudgets={props.setBudgets}
                                currentMonthTransactions={currentMonthTransactions}
                                formatCurrency={props.formatCurrency}
                                exportMonthReport={exportMonthReport}
                                transactions={props.transactions}
                                setTransactions={props.setTransactions}
                                month={props.month}
                            />
                        </div>
                    </div>

                    {/* Expense Breakdown */}
                    <div className=" group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/50 
                            backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/40
                            hover:shadow-[0_0_40px_rgba(168,85,247,.15)]">

                        <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
                        <div className="border-b border-white/10 px-7 py-5 text-center">
                            <h3 className="text-4xl font-bold text-white">
                                Expense Breakdown
                            </h3>

                            <p className="mt-1 text-[16px] text-slate-400">
                                Category-wise expense visualization
                            </p>
                        </div>

                        <div className="p-7">
                            <BreakdownChart
                                currentMonthTransactions={currentMonthTransactions}
                                budgets={props.budgets}
                                setBudgets={props.setBudgets}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}