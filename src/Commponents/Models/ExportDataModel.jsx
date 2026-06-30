import React from "react";
import { FileJson, FileSpreadsheet } from "lucide-react";

export default function ExportDataModel(props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-107.5 rounded-3xl bg-slate-900 border border-slate-700 p-8">

                <h2 className="text-2xl font-bold text-white">
                    Export Data
                </h2>

                <p className="mt-2 text-slate-400">
                    Choose the format you'd like to export.
                </p>

                <div className="mt-8 space-y-4">

                    <button
                        onClick={props.exportJSON}
                        className="flex w-full items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 hover:border-cyan-500"
                    >
                        <FileJson className="text-cyan-400" />

                        <div className="text-left">
                            <h3 className="font-semibold text-white">
                                JSON
                            </h3>

                            <p className="text-sm text-slate-400">
                                Export complete application backup
                            </p>
                        </div>
                    </button>

                    <button
                        onClick={props.exportExcel}
                        className="flex w-full items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 hover:border-green-500"
                    >
                        <FileSpreadsheet className="text-green-400" />

                        <div className="text-left">
                            <h3 className="font-semibold text-white">
                                Excel (.xlsx)
                            </h3>

                            <p className="text-sm text-slate-400">
                                Export transactions spreadsheet
                            </p>
                        </div>
                    </button>

                </div>

                <button
                    onClick={props.onClose}
                    className="mt-8 w-full rounded-xl border border-slate-700 py-3 text-white hover:bg-slate-800"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}