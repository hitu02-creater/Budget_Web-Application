import React, { useState } from "react";

import {
  Plus,
  Wallet,
  Download,
  X,
  ChevronDown
} from "lucide-react";

const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Other",
];

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investments",
  "Bonus",
  "Other",
];

export default function Header(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const availableCategories =
    props.formData.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleAddTransaction = () => {
    if (!props.formData.description || !props.formData.amount || !props.formData.category) {
      return;
    }
    props.addTransaction();
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  FinanceHub
                </h1>
                <p className="text-sm text-slate-600">
                  Track your money wisely
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                // onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border border-slate-300 bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium text-white shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Transaction</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Add New Transaction
                </h2>
                <p className="text-sm text-slate-600">
                  Record a new income or expense
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-slate-900">
                      {props.formData.type.charAt(0).toUpperCase() +
                        props.formData.type.slice(1)}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>
                  {showTypeDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
                      {["income", "expense"].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            props.setFormData({
                              ...props.formData,
                              type: type,
                              category: "",
                            });
                            setShowTypeDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors text-slate-900 border-b last:border-b-0"
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g., Grocery Shopping"
                  value={props.formData.description}
                  onChange={(e) =>
                    props.setFormData({
                      ...props.formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors text-left"
                  >
                    <span
                      className={
                        props.formData.category ? "text-slate-900" : "text-slate-500"
                      }
                    >
                      {props.formData.category || "Select category"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>
                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {availableCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            props.setFormData({ ...props.formData, category: cat });
                            setShowCategoryDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-100 transition-colors text-slate-900 border-b last:border-b-0"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={props.formData.amount}
                  onChange={(e) =>
                    props.setFormData({ ...props.formData, amount: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <button
                onClick={handleAddTransaction}
                className="w-full mt-6 px-4 py-3 cursor-pointer rounded-lg bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all text-white font-medium shadow-lg hover:shadow-xl"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
