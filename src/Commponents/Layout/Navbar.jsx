import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
    Bell,
    Search,
    Plus,
    CalendarDays,
    MoonStar,
    UserCircle2,
} from "lucide-react";

export default function Navbar() {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const fullDate = currentTime.toLocaleDateString("en-IN", {

        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",

    });

    const time = currentTime.toLocaleTimeString("en-IN");

    return (

        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">

            <div className="relative flex items-center justify-between px-10 py-6">

                <div className="absolute left-20 top-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-[90px]" />

                <div>

                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-black text-white"
                    >
                        Dashboard
                    </motion.h1>

                    <p className="mt-2 text-slate-400">
                        Welcome back 👋 Manage your finances smarter.
                    </p>

                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-5">

                    {/* Date */}
                    <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                        <CalendarDays
                            size={20}
                            className="text-cyan-400"
                        />
                        <div>

                            <p className="text-xs text-slate-400">
                                {fullDate}
                            </p>

                            <p className="font-semibold text-white">
                                {time}
                            </p>

                        </div>
                    </div>

                    {/* Theme */}
                    {/* <button className="rounded-2xl cursor-pointer border border-white/10 bg-white/5 p-4 text-slate-300 transition hover:bg-violet-500/20 hover:text-violet-400">
                        <MoonStar size={20} />
                    </button> */}

                    {/* Profile */}

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

                        <UserCircle2
                            size={44}
                            className="text-cyan-400"
                        />
                        <div>
                            <p className="font-bold text-white">
                                Hitesh
                            </p>

                            <p className="text-sm text-slate-400">
                                Frontend Developer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}