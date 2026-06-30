import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Wallet,
    Receipt,
    PieChart,
    History,
    Settings,
    LogOut,
    ChevronRight,
    Sparkles,
    Download
} from "lucide-react";

const menu = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
    },
    {
        title: "Budget",
        icon: Wallet,
        path: "/budget",
    },
    {
        title: "Transactions",
        icon: Receipt,
        path: "/transactions",
    },
    {
        title: "Analytics",
        icon: PieChart,
        path: "/analytics",
    },
    {
        title: "History",
        icon: History,
        path: "/history",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
];


export default function Sidebar(props) {
    
    const navigate = useNavigate();
    
    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-72 overflow-hidden border-r border-white/10 bg-[#0B1120]/95 backdrop-blur-xl">

            <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />
            <div className="relative flex h-full flex-col">
                <div className="border-b border-white/10 p-8">
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        className="flex items-center gap-4"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-violet-500 shadow-xl">
                            💰
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-white">
                                FinanceHub
                            </h2>
                            <p className="flex items-center gap-1 text-sm text-cyan-300">
                                <Sparkles size={15} />
                                Smart Budget
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Navigations */}
                <div className="flex-1 px-5 py-8">

                    <p className="mb-5 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Navigation
                    </p>

                    <div className="space-y-2">
                        {menu.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.title}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 ${isActive
                                            ? "bg-linear-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-white shadow-lg"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`rounded-xl p-2 ${isActive
                                                        ? "bg-cyan-500/20"
                                                        : "bg-white/5"
                                                        }`}
                                                >
                                                    <Icon size={20} />
                                                </div>

                                                <span className="font-semibold">
                                                    {item.title}
                                                </span>
                                            </div>

                                            <ChevronRight
                                                size={18}
                                                className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                                            />
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 p-6">
                    <div className="rounded-2xl border border-cyan-500/20 bg-linear-to-br from-slate-800/80 via-slate-900 to-slate-950 p-5 shadow-lg shadow-cyan-500/10">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                            <Sparkles size={22} />
                        </div>

                        <h3 className="text-lg font-bold text-white">
                            Smart Insights
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Explore personalized spending analysis,
                            budget performance, and savings
                            recommendations.
                        </p>

                        <button
                            onClick={() => navigate("/analytics")}
                            className="mt-5 w-full cursor-pointer rounded-xl bg-cyan-500 px-4 py-3 font-semibold
                            text-slate-900 transition-all duration-300 hover:bg-cyan-400
                            hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
                        >
                            View Insights
                        </button>

                    </div>
                </div>
            </div>
        </aside>
    );
}