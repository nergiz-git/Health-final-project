import { ShoppingCart, Download } from "lucide-react";
import { useState } from "react";

function ShoppingListCard({ shoppingList }) {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");

  const days = [
    { key: "Mon", label: "B.e" },
    { key: "Tue", label: "Ç.a" },
    { key: "Wed", label: "Çər" },
    { key: "Thu", label: "C.a" },
    { key: "Fri", label: "Cüm" },
    { key: "Sat", label: "Şən" },
    { key: "Sun", label: "Baz" },
  ];

  const meals = [
    { value: "breakfast", label: "Səhər Yeməyi" },
    { value: "lunch", label: "Nahar" },
    { value: "dinner", label: "Şam Yeməyi" },
  ];

  const items = shoppingList?.[selectedDay]?.[selectedMeal] || [];

  return (
    <div className="!bg-white  !rounded-3xl !shadow-xl  mt-12 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 sm:p-6">
        <div className="!bg-blue-500 text-white p-3 rounded-xl">
          <ShoppingCart />
        </div>
        <div>
          <h2 className="font-bold text-lg">Alış-Veriş Siyahısı</h2>
          <p className="text-slate-500 text-sm">4 element</p>
        </div>
      </div>

      {/* DAYS TABS */}
      <div className="p-6 pb-0">
        <div className="!bg-slate-100 !rounded-xl p-1 flex !justify-between">
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

      <div className="p-6">
        <div className="flex !justify-between !text-sm !text-slate-500 mb-4">
          {meals.map(m => (
            <button
              key={m.value}
              onClick={() => setSelectedMeal(m.value)}
              className={`!font-semibold transition 
              ${selectedMeal === m.value && "!text-emerald-600"}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="space-y-3 max-h-[350px] overflow-y-auto">
          {items.length === 0 && (
            <p className="!text-slate-400 text-sm">Siyahı boşdur</p>
          )}

          {items.map((item, i) => (
            <div key={i} className="flex justify-between p-4 border rounded-xl !bg-white shadow-sm">
              <span>{item.name}</span>
              <span className="text-slate-500">{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6 pt-0">
        <button className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700 flex items-center justify-center gap-2">
          <Download size={18}/> Həftəni İxrac Et
        </button>

        <button className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700">
          Bazar ertəsi İxrac Et
        </button>

        <button className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700">
          Səhər Yeməyi İxrac Et
        </button>
      </div>

    </div>
  );
}

export default ShoppingListCard;
