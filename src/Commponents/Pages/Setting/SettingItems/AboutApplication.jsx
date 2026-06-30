import React from 'react';

import {
    Info,
    Code2,
    Database,
    MonitorSmartphone,
    Heart,
} from "lucide-react";

export default function AboutApplication() {
    return (
        <div>
            {/* ================= About Application ================= */}

            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7">

                {/* Header */}

                <div className="flex items-center gap-4 mb-8">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20">

                        <Info
                            size={28}
                            className="text-cyan-400"
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            About Application
                        </h2>

                        <p className="mt-1 text-slate-400">
                            Information about your Budget Dashboard.
                        </p>

                    </div>

                </div>

                {/* Content */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* App Details */}

                    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

                        <h3 className="text-lg font-semibold text-white mb-5">
                            Application Details
                        </h3>

                        <div className="space-y-5">

                            <div className="flex justify-between">

                                <span className="text-slate-400">
                                    Application
                                </span>

                                <span className="text-white font-medium">
                                    FinanceHub
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">
                                    Version
                                </span>

                                <span className="text-cyan-400 font-medium">
                                    v1.0.0
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">
                                    License
                                </span>

                                <span className="text-white">
                                    MIT
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">
                                    Last Updated
                                </span>

                                <span className="text-white">
                                    June 2026
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Technologies */}

                    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

                        <h3 className="text-lg font-semibold text-white mb-5">
                            Built With
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">

                                <Code2 className="text-cyan-400" />

                                <span className="text-slate-300">
                                    React.js
                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <MonitorSmartphone className="text-cyan-400" />

                                <span className="text-slate-300">
                                    Tailwind CSS
                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <Database className="text-cyan-400" />

                                <span className="text-slate-300">
                                    Local Storage
                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                {/* <Github className="text-cyan-400" /> */}

                                <span className="text-slate-300">
                                    Git & GitHub
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

                    <div className="flex items-center gap-3">

                        <Heart
                            className="text-red-400"
                            size={22}
                        />

                        <p className="text-slate-300">

                            Designed & Developed by

                            <span className="ml-2 font-semibold text-cyan-400">

                                Hitesh Vekariya

                            </span>

                            using React and Tailwind CSS.

                        </p>

                    </div>

                </div>

            </div>
        </div>
    )
}
