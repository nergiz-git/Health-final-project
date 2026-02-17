
import { UtensilsCrossed, Clock, Sparkles, Download } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function MealPlanCard({ mealPlan, onEditClick }) {
  const [selectedDay, setSelectedDay] = useState("Mon");

  const days = [
    { key: "Mon", label: "B.e" },
    { key: "Tue", label: "Ç.a" },
    { key: "Wed", label: "Çər" },
    { key: "Thu", label: "C.a" },
    { key: "Fri", label: "Cüm" },
    { key: "Sat", label: "Şən" },
    { key: "Sun", label: "Baz" },
  ];

  const meals = mealPlan[selectedDay] || {};

  return (
    
    <motion.div
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    duration: 1.2,
    ease: "easeOut",
    delay: 0.2
  
  }}
    className="!bg-white !backdrop-blur-xl rounded-3xl !shadow-xl overflow-hidden"
  >

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-5 sm:p-8 bg-gradient-to-r from-emerald-50 to-slate-100">
        <div className="flex gap-4 items-center">
          <div className="!bg-emerald-500 text-white p-4 rounded-2xl !shadow-lg">
            <UtensilsCrossed size={20} />
          </div>

          <div>
            <h1 className="!text-xl font-bold">Weekly Meal Plan</h1>
            <p className="text-slate-500">Healthy meals for the week</p>
          </div>
        </div>

        <button
          onClick={() => onEditClick(selectedDay)}
          className="!bg-emerald-500 hover:!bg-emerald-600 text-white px-6 py-3 rounded-xl !shadow-lg flex items-center gap-2"
        >
          <Sparkles size={18}/> Generate
        </button>
      </div>

    
      <div className="p-8 pb-2">
        <div className="bg-slate-100 rounded-lg p-1 flex overflow-x-auto no-scrollbar">
          {days.map(d => (
          <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
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

      <div className="p-8 space-y-6">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4 sm:p-6">
          <div>
            <p className="font-semibold text-orange-600 mb-1">Breakfast</p>
            <p>{meals.breakfast || "-"}</p>
          </div>

          <div className="flex items-center gap-2 text-orange-600">
            <Clock size={18}/>
            <span>{meals.breakfastTime || "07:00 AM"}</span>
          </div>
        </div>

        {/* LUNCH */}
        <div className="flex justify-between items-center bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <div>
            <p className="font-semibold text-orange-600 mb-1">Lunch</p>
            <p>{meals.lunch || "-"}</p>
          </div>

          <div className="flex items-center gap-2 text-orange-600">
            <Clock size={18}/>
            <span>{meals.lunchTime || "12:00 PM"}</span>
          </div>
        </div>

        {/* DINNER */}
        <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <div>
            <p className="font-semibold text-emerald-600 mb-1">Dinner</p>
            <p>{meals.dinner || "-"}</p>
          </div>

          <div className="flex items-center gap-2 text-emerald-600">
            <Clock size={18}/>
            <span>{meals.dinnerTime || "06:00 PM"}</span>
          </div>
        </div>

      </div>

      {/* DOWNLOAD BUTTONS */}
      <div className="flex gap-6 justify-center pb-8">
        <button className="!bg-emerald-500 !hover:bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Download size={18}/> Download Weekly Plan
        </button>

        <button className="!bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg">
          Download Mon Plan
        </button>
      </div>
   </motion.div>
  );
}

export default MealPlanCard;
