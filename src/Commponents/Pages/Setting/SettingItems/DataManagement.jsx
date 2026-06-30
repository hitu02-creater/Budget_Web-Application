import React, { useState } from 'react';

import {
    Database,
    Upload,
    Download,
    Trash2,
    ShieldCheck,
} from "lucide-react";

import * as XLSX from "xlsx";
import ExportDataModel from '../../../Models/ExportDataModel';

export default function DataManagement() {

    const [showExportModal, setShowExportModal] = useState(false);

    // Export all application data
    const exportJSON = () => {

        const data = {
            transactions: JSON.parse(localStorage.getItem("transactions")) || [],
            budgets: JSON.parse(localStorage.getItem("budgets")) || [],
            savingGoal: JSON.parse(localStorage.getItem("savingGoal")) || 0,
            settings: JSON.parse(localStorage.getItem("settings")) || {},
        };

        const blob = new Blob(
            [JSON.stringify(data, null, 2)],
            {
                type: "application/json",
            }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "Budget_Backup.json";

        a.click();

        URL.revokeObjectURL(url);

        setShowExportModal(false);
    };

    const exportExcel = () => {

        const transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        const worksheet = XLSX.utils.json_to_sheet(transactions);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Transactions"
        );

        XLSX.writeFile(workbook, "Budget_Backup.xlsx");

        setShowExportModal(false);
    };

    // Clear all stored data
    const handleClearData = () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to permanently delete all data?"
        );

        if (!confirmDelete) return;

        localStorage.removeItem("transactions");
        localStorage.removeItem("budgets");
        localStorage.removeItem("savingGoal");
        localStorage.removeItem("settings");

        alert("All application data has been removed.");

        window.location.reload();
    };


    return (
        <div>
            {/* ================= Data Management ================= */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 mt-8">

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                        <Database
                            size={28}
                            className="text-cyan-400"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Data Management
                        </h2>

                        <p className="text-slate-400 mt-1">
                            Backup, restore and manage your application data.
                        </p>
                    </div>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        onClick={() => setShowExportModal(true)}
                        className="cursor-pointer rounded-3xl border border-slate-700 bg-[#121b2d] p-6 transition duration-300 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20">
                            <Download
                                className="text-green-400"
                                size={28}
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                            Export Data
                        </h3>
                        <p className="mt-3 leading-7 text-slate-400">
                            Download all budgets, transactions and settings
                            as a JSON backup.
                        </p>
                    </div>

                    <div
                        onClick={handleClearData}
                        className="cursor-pointer rounded-3xl border border-slate-700 bg-[#121b2d] p-6 transition duration-300 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20">
                            <Trash2
                                className="text-red-400"
                                size={28}
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                            Clear All Data
                        </h3>
                        <p className="mt-3 leading-7 text-slate-400">
                            Permanently remove all budgets, expenses and
                            application data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Security Note */}

            <div className=" mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <div className="flex items-start gap-4">
                    <ShieldCheck
                        size={24}
                        className="text-emerald-400 mt-1"
                    />
                    <div>
                        <h4 className="font-semibold text-emerald-300">
                            Data Security
                        </h4>
                        <p className="text-sm text-slate-300 mt-2 leading-6">
                            Your data is stored securely in your browser's Local Storage.
                            Export a backup regularly to prevent accidental data loss.
                        </p>
                    </div>
                </div>
            </div>

            {showExportModal && (
                <ExportDataModel
                    onClose={() => setShowExportModal(false)}
                    exportJSON={exportJSON}
                    exportExcel={exportExcel}
                />
            )}
        </div>
    )
}