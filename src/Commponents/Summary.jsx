import React, { useState, useEffect } from 'react';

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Details from './Budget_Items/Details';
import BreakdownChart from './Budget_Items/BreakdownChart';
import Month_Summary from './Budget_Items/Month_Summary';
import Transaction_Preview from './Budget_Items/Transaction_Preview';

export default function Summary(props) {

  const currentMonthTransactions =
    props.transactions.filter(
      (transaction) =>
        transaction.month === props.currentMonth
    );

  const currentMonthBudgets =
  props.budgets.filter(
    budget => budget.month === props.currentMonth
  );

  const [monthlyHistory, setMonthlyHistory] = useState(() => {
    const saved = localStorage.getItem("monthlyHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "monthlyHistory",
      JSON.stringify(monthlyHistory)
    );
  }, [monthlyHistory]);

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
      `${monthData.month.replace(
        " ",
        "_"
      )}_Finance_Report.xlsx`
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/*Left Colum*/}
        <div className="lg:col-span-1 space-y-8">
          {/* Budget Planning */}
          <Details
            budgets={props.budgets}
            setBudgets={props.setBudgets}
            currentMonthTransactions={currentMonthTransactions}
            formatCurrency={props.formatCurrency}
            setMonthlyHistory={setMonthlyHistory}
            monthlyHistory={monthlyHistory}
            exportMonthReport={exportMonthReport}

            transactions={props.transactions}
            setTransactions={props.setTransactions}

            currentMonth={props.currentMonth}
            setCurrentMonth={props.setCurrentMonth}
          />

          {/* Expense Breakdown */}
          <BreakdownChart
            currentMonthTransactions={currentMonthTransactions}
            budgets={props.budgets}
            setBudgets={props.setBudgets}
          />
        </div>


        {/* Right Column */}
        <div className="space-y-8">
          {/* Budget & Expanses summary */}
          <Month_Summary 
            currentMonthTransactions={currentMonthTransactions}
            currentMonth={props.currentMonth}
            budgets={props.budgets}
            setBudgets={props.setBudgets}
            formatCurrency={props.formatCurrency}
          />

          {/* Recent Transactions Preview */}
          <Transaction_Preview
            currentMonthTransactions={currentMonthTransactions}
            formatCurrency={props.formatCurrency}
          />
        </div>
      </div >
    </>
  )
}
