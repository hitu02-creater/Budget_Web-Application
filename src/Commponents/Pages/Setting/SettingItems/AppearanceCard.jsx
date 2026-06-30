import React, { useState } from "react";
import {
    Palette,
    Moon,
    Sun,
    Check,
} from "lucide-react";

export default function AppearanceCard() {
    const [theme, setTheme] = useState("dark");
    const [accent, setAccent] = useState("cyan");

    const colors = [
        {
            name: "cyan",
            bg: "bg-cyan-500",
            ring: "ring-cyan-500",
        },
        {
            name: "blue",
            bg: "bg-blue-500",
            ring: "ring-blue-500",
        },
        {
            name: "purple",
            bg: "bg-purple-500",
            ring: "ring-purple-500",
        },
        {
            name: "green",
            bg: "bg-green-500",
            ring: "ring-green-500",
        },
        {
            name: "orange",
            bg: "bg-orange-500",
            ring: "ring-orange-500",
        },
    ];

    return (
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-7 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center">
                    <Palette
                        size={22}
                        className="text-cyan-400"
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white">
                        Appearance
                    </h2>

                    <p className="text-slate-400 text-sm">
                        Customize your dashboard appearance
                    </p>
                </div>
            </div>

            <div className="mb-8">

                <h3 className="text-white font-medium mb-4">
                    Theme
                </h3>

                <div className="grid grid-cols-2 gap-4">

                    <button
                        onClick={() => setTheme("dark")}
                        className={`rounded-2xl cursor-pointer border p-5 transition-all
                        ${theme === "dark"
                                ? "border-cyan-400 bg-cyan-500/10"
                                : "border-slate-700 hover:border-slate-500"
                        }`}
                    >

                        <Moon
                            size={28}
                            className="mx-auto text-cyan-400"
                        />

                        <p className="text-white mt-3">
                            Dark
                        </p>
                    </button>

                    <button
                        onClick={() => setTheme("light")}
                        className={`rounded-2xl cursor-pointer border p-5 transition-all
                        ${theme === "light"
                                ? "border-cyan-400 bg-cyan-500/10"
                                : "border-slate-700 hover:border-slate-500"
                        }`}
                    >
                        <Sun
                            size={28}
                            className="mx-auto text-yellow-400"
                        />

                        <p className="text-white mt-3">
                            Light
                        </p>
                    </button>
                </div>
            </div>

            {/* Accent Color */}

            <div>
                <h3 className="text-white font-medium mb-4">
                    Accent Color
                </h3>

                <div className="flex gap-4 flex-wrap">
                    {colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setAccent(color.name)}
                            className={`w-12 h-12 rounded-full cursor-pointer ${color.bg} flex items-center justify-center transition ring-2
                                ${accent === color.name
                                    ? color.ring
                                    : "ring-transparent"
                                }
                            `}
                        >
                            {accent === color.name && (
                                <Check
                                    size={18}
                                    className="text-white"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}