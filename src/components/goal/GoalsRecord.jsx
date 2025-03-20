import React from "react";
import GoalsList from "./GoalsList";

export default function GoalsRecord() {
  return (
    <div className="p-8 rounded-md bg-slate-800 h-full">
      <h2 className="text-2xl text-gray-300 mb-8">Your savings goals</h2>
      <GoalsList />
    </div>
  );
}
