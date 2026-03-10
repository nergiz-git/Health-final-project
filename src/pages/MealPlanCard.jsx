import { UtensilsCrossed, Clock, Sparkles, Download, Loader2, Edit2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// API response format:
// mealPlan = {
//   id, weekStart,
//   days: [
//     { dayOfWeek: "Mon", meals: [
//       { mealType: "Breakfast", title: "Oatmeal", time: "07:00 AM" },
//       { mealType: "Lunch",     title: "Chicken salad", time: "12:30 PM" },
//       { mealType: "Dinner",    title: "Fish", time: "06:30 PM" },
//     ]}
//   ]
// }

function MealPlanCard({ mealPlan, onEditClick, onGenerate, onExport, generating,selectedDay: initialDay, onDayChange }) {
  // const [selectedDay, setSelectedDay] = useState("Mon");

  const todayKey = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date().getDay()];
  };
  const [selectedDay, setSelectedDay] = useState(initialDay || todayKey());

  const handleDayChange = (key) => {
    setSelectedDay(key);
    if (onDayChange) onDayChange(key);
  };

  const days = [
    { key: "Mon", label: "B.e" },
    { key: "Tue", label: "Ç.a" },
    { key: "Wed", label: "Çər" },
    { key: "Thu", label: "C.a" },
    { key: "Fri", label: "Cüm" },
    { key: "Sat", label: "Şən" },
    { key: "Sun", label: "Baz" },
  ];

  // Find selected day's data from API response
  const dayData = mealPlan?.days?.find((d) => d.dayOfWeek === selectedDay);

  const getMeal = (type) =>
    dayData?.meals?.find(
      (m) => m.mealType?.toLowerCase() === type.toLowerCase()
    );

  const breakfast = getMeal("Breakfast");
  const lunch     = getMeal("Lunch");
  const dinner    = getMeal("Dinner");

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      className="!bg-white !backdrop-blur-xl rounded-3xl !shadow-xl overflow-hidden"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-5 sm:p-8 bg-gradient-to-r from-emerald-50 to-slate-100">
        <div className="flex gap-4 items-center">
          <div className="!bg-emerald-500 text-white p-4 rounded-2xl !shadow-lg">
            <UtensilsCrossed size={20} />
          </div>
          <div>
            <h1 className="!text-xl font-bold text-black">Weekly Meal Plan</h1>
            <p className="text-slate-500">Healthy meals for the week</p>

          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={generating}
          className="!bg-emerald-500 hover:!bg-emerald-600 text-white px-6 py-3 rounded-xl !shadow-lg flex items-center gap-2 disabled:opacity-60"
        >
          {generating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Yaradılır...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              {mealPlan ? "Yenilə" : "Yarat"}
            </>
          )}
        </button>
      </div>

      {/* DAY TABS */}
      <div className="p-8 pb-2">
        <div className="bg-slate-100 rounded-lg p-1 flex overflow-x-auto no-scrollbar">
          {days.map((d) => (
            <button
              key={d.key}
              // onClick={() => setSelectedDay(d.key)}
              onClick={() => handleDayChange(d.key)}

              className={`flex-1 !py-2 !rounded-lg !text-sm !font-medium !transition
                ${selectedDay === d.key
                  ? "!bg-white !shadow !text-emerald-600"
                  : "!text-slate-500"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* MEALS */}
      <div className="p-8 space-y-6">
        {/* BREAKFAST */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4 sm:p-6">
          <div>
            <p className="font-semibold text-orange-600 mb-1">Səhər Yeməyi</p>
            <p className="text-slate-700">{breakfast?.title || "-"}</p>
          </div>
          <div className="flex items-center gap-2 text-orange-600">
            <Clock size={18} />
            <span>{breakfast?.time || "07:00 AM"}</span>
          </div>
        </div>

        {/* LUNCH */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4 sm:p-6">
          <div>
            <p className="font-semibold text-orange-600 mb-1">Nahar</p>
            <p className="text-slate-700">{lunch?.title || "-"}</p>
          </div>
          <div className="flex items-center gap-2 text-orange-600">
            <Clock size={18} />
            <span>{lunch?.time || "12:30 PM"}</span>
          </div>
        </div>

        {/* DINNER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-6">
          <div>
            <p className="font-semibold text-emerald-600 mb-1">Şam Yeməyi</p>
            <p className="text-slate-700">{dinner?.title || "-"}</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-600">
            <Clock size={18} />
            <span>{dinner?.time || "06:30 PM"}</span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pb-6 sm:pb-8 px-6">
        {/* Edit current day — PUT /meal-plans/{id} */}
        <button
          onClick={() => onEditClick(selectedDay)}
          disabled={!mealPlan}
          className="border border-emerald-500 text-emerald-600 px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-50 disabled:opacity-40"
        >
          <Edit2 size={18} /> {days.find((d) => d.key === selectedDay)?.label} Redaktə Et
        </button>

        {/* Export full week — GET /meal-plans/{id}/export */}
        <button
          onClick={() => onExport(null)}
          disabled={!mealPlan}
          className="!bg-emerald-500 hover:!bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Download size={18} /> Həftəni İxrac Et
        </button>

        {/* Export selected day — GET /meal-plans/{id}/export?day=Mon */}
        <button
          onClick={() => onExport(selectedDay)}
          disabled={!mealPlan}
          className="!bg-emerald-500 hover:!bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Download size={18} /> {days.find((d) => d.key === selectedDay)?.label} İxrac Et
        </button>
      </div>
    </motion.div>
  );
}

export default MealPlanCard;




