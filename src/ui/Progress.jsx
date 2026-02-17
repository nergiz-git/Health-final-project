import React from "react";

// Progress component
export function Progress({ value = 0, className = "" }) {
  return (
    <div className={`w-full h-2 rounded-full bg-slate-200 overflow-hidden ${className}`}>
      <div
        className="h-full bg-purple-600 transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
