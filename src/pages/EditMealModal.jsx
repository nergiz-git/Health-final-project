import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";

// initialMeal comes from API:
// { dayOfWeek: "Mon", meals: [
//   { mealType: "Breakfast", title: "Oatmeal", time: "07:00 AM" },
//   { mealType: "Lunch",     title: "Chicken salad", time: "12:30 PM" },
//   { mealType: "Dinner",    title: "Fish", time: "06:30 PM" },
// ]}
//
// onSave(dayKey, formData) → MealPlansPage builds PUT /meal-plans/{id} body

function EditMealModal({ isOpen, onClose, onSave, initialDay, initialMeal }) {
  const [selectedDay, setSelectedDay] = useState("Mon");

  const [formData, setFormData] = useState({
    breakfast:     "",
    breakfastTime: "07:00 AM",
    lunch:         "",
    lunchTime:     "12:30 PM",
    dinner:        "",
    dinnerTime:    "06:30 PM",
  });

  useEffect(() => {
    if (initialDay) setSelectedDay(initialDay);

    if (initialMeal) {
      const b = initialMeal.meals?.find((m) => m.mealType === "Breakfast");
      const l = initialMeal.meals?.find((m) => m.mealType === "Lunch");
      const d = initialMeal.meals?.find((m) => m.mealType === "Dinner");

      setFormData({
        breakfast:     b?.title || "",
        breakfastTime: b?.time  || "07:00 AM",
        lunch:         l?.title || "",
        lunchTime:     l?.time  || "12:30 PM",
        dinner:        d?.title || "",
        dinnerTime:    d?.time  || "06:30 PM",
      });
    }
  }, [initialMeal, initialDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(selectedDay, formData);
    onClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full border border-slate-200 rounded-lg px-3 py-2 bg-[#F3F3F5] text-slate-600 outline-none focus:ring-2 focus:ring-emerald-400";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] sm:w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-5 sm:p-6 relative">

        {/* TITLE */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-black">Yeməyi Redaktə Et</h2>
          <button onClick={onClose} className="!bg-transparent">
            <X className="text-slate-500" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* BREAKFAST */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-orange-600">
              Səhər Yeməyi
            </label>
            <input
              className={inputClass}
              placeholder="məs. Yulaf ezmesi"
              value={formData.breakfast}
              onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Vaxt (məs. 07:00 AM)"
              value={formData.breakfastTime}
              onChange={(e) => setFormData({ ...formData, breakfastTime: e.target.value })}
            />
          </div>

          {/* LUNCH */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-orange-600">
              Nahar
            </label>
            <input
              className={inputClass}
              placeholder="məs. Toyuq salatı"
              value={formData.lunch}
              onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Vaxt (məs. 12:30 PM)"
              value={formData.lunchTime}
              onChange={(e) => setFormData({ ...formData, lunchTime: e.target.value })}
            />
          </div>

          {/* DINNER */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-emerald-600">
              Şam Yeməyi
            </label>
            <input
              className={inputClass}
              placeholder="məs. Balıq"
              value={formData.dinner}
              onChange={(e) => setFormData({ ...formData, dinner: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Vaxt (məs. 06:30 PM)"
              value={formData.dinnerTime}
              onChange={(e) => setFormData({ ...formData, dinnerTime: e.target.value })}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-[44px] border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition"
            >
              Ləğv Et
            </button>
            <Button
              type="submit"
              className="flex-1 h-[44px] rounded-lg !bg-emerald-500 !text-white font-medium hover:!bg-emerald-600"
            >
              Saxla
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMealModal;
