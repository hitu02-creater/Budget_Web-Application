import React from 'react'

import Month_Summary from './Summary Items/Month_Summary'

export default function MonthlySummary(props) {

    const currentMonthTransactions =
        props.transactions.filter(
            (transaction) =>
                transaction.month === props.month
        );

    return (
        <>
            {/* Monthly Summary */}
            <div className=" group relative overflow-hidden rounded-[28px] border border-white/10
                bg-slate-900/50 backdrop-blur-xl transition-all duration-500
                hover:-translate-y-1 hover:border-green-400/40 hover:shadow-[0_0_40px_rgba(34,197,94,.15)]">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />

                <div className="border-b border-white/10 px-7 py-5 text-center">
                    <h3 className="text-4xl font-bold text-white">
                        Monthly Summary
                    </h3>

                    <p className="mt-1 text-[16px] text-slate-400">
                        Income, expense and savings overview
                    </p>
                </div>

                <div className="p-7">
                    <Month_Summary
                        currentMonthTransactions={currentMonthTransactions}
                        budgets={props.budgets}
                        setBudgets={props.setBudgets}
                        formatCurrency={props.formatCurrency}
                    />
                </div>

            </div>
        </>
    )
}
