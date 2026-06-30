import React, { useState } from "react";

export default function GoalModel({
    currentGoal,
    onSave,
    onClose,
}) {
    const [goalInput, setGoalInput] = useState(currentGoal);

    const saveGoal = () => {
        const value = Number(goalInput);

        if (value <= 0) {
            alert("Enter a valid amount");
            return;
        }

        onSave(value);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-[105 rounded-3xl border border-white/10 bg-slate-900 p-8">

                <h2 className="text-2xl font-bold text-white">
                    Set Savings Goal
                </h2>

                <p className="mt-2 text-slate-400">
                    Enter your target savings amount.
                </p>

                <input
                    type="number"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
                />

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-700 px-6 py-3 text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveGoal}
                        className="rounded-xl bg-cyan-500 px-6 py-3 text-white"
                    >
                        Save Goal
                    </button>

                </div>

            </div>

        </div>
    );
}