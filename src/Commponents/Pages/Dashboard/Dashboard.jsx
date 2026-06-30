import React , { useState } from "react";
import HeroSection from "./Hero-Section/HeroSection";
import AllTransactions from "../Transactions/AllTransactions";

export default function Dashboard(props) {

  return (
    <>
      <HeroSection
        currentTime={props.currentTime}
        setCurrentTime={props.setCurrentTime}
        transactions={props.transactions}
        setTransactions={props.setTransactions}
        budgets={props.budgets}
        setBudgets={props.setBudgets}
        month={props.month}
      />

      <AllTransactions
        formatCurrency={props.formatCurrency}
        transactions={props.transactions}
        setTransactions={props.setTransactions}
      />
    </>
  )
}