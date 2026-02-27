// import { ShoppingCart, Download, Check } from "lucide-react";
// import { useState } from "react";

// // API response format:
// // shoppingList = {
// //   id, weekStart,
// //   items: [
// //     { id: 1, name: "Chicken", quantity: "500g", checked: false, day: "Mon", mealType: "Lunch" },
// //     ...
// //   ]
// // }

// function ShoppingListCard({ shoppingList, onUpdateItems, onExport }) {
//   const [selectedDay, setSelectedDay] = useState("All");

//   const days = [
 
//     { key: "Mon", label: "B.e" },
//     { key: "Tue", label: "Ç.a" },
//     { key: "Wed", label: "Çər" },
//     { key: "Thu", label: "C.a" },
//     { key: "Fri", label: "Cüm" },
//     { key: "Sat", label: "Şən" },
//     { key: "Sun", label: "Baz" },
//   ];

// // ✅ Belə dəyiş - categories-dən items-ları düz et
// const allItems = shoppingList?.categories
//   ? shoppingList.categories.flatMap((cat) =>
//       (cat.items || []).map((item) => ({ ...item, category: cat.name }))
//     )
//   : [];

//   // Filter by day if not "All"
//   const filteredItems =
//     selectedDay === "All"
//       ? allItems
//       : allItems.filter((item) => item.day === selectedDay);

//   const checkedCount = filteredItems.filter((i) => i.checked).length;

//   // ── PUT /shopping-lists/{id}/items — toggle checked ───────────────
//   const handleToggleItem = (itemId, currentChecked) => {
//     const updatedItems = allItems.map((item) =>
//       item.id === itemId ? { ...item, checked: !currentChecked } : item
//     );

//     // Update local state immediately (optimistic)
//     // Then send to backend via parent
//     onUpdateItems(
//       updatedItems.map((item) => ({
//         id: item.id,
//         checked: item.checked,
//         quantity: item.quantity,
//       }))
//     );
//   };

//   return (
//     <div className="!bg-white !rounded-3xl !shadow-xl mt-12 overflow-hidden">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6">
//         <div className="flex items-center gap-3">
//           <div className="!bg-blue-500 text-white p-3 rounded-xl">
//             <ShoppingCart />
//           </div>
//           <div>
//             <h2 className="font-bold text-lg text-black">Alış-Veriş Siyahısı</h2>
//             <p className="text-slate-500 text-sm">
//               {checkedCount}/{filteredItems.length} element
//             </p>
//           </div>
//         </div>

//         {/* Export full week */}
//         <button
//           onClick={() => onExport(null)}
//           disabled={!shoppingList}
//           className="!bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow hover:!bg-blue-700 flex items-center gap-2 disabled:opacity-40 text-sm"
//         >
//           <Download size={16} /> Həftəni İxrac Et
//         </button>
//       </div>

//       {/* DAY TABS */}
//       <div className="px-6 pb-0">
//         <div className="bg-slate-100 rounded-xl p-1 flex overflow-x-auto no-scrollbar">
//           {days.map((d) => (
//             <button
//               key={d.key}
//               onClick={() => setSelectedDay(d.key)}
//               className={`flex-1 !py-2 !rounded-lg !text-xs sm:!text-sm !font-medium !transition whitespace-nowrap
//                 ${selectedDay === d.key
//                   ? "!bg-white !shadow !text-emerald-600"
//                   : "!text-slate-500"}`}
//             >
//               {d.label}
//             </button>
//           ))}
//         </div>
//       </div>
    
    
//       {/* ITEMS LIST */}
//       <div className="p-6">
//         <div className="space-y-3 max-h-[350px] overflow-y-auto">
//           {filteredItems.length === 0 && (
//             <p className="!text-slate-400 text-sm py-4 text-center">
//               {shoppingList ? "Bu gün üçün element yoxdur" : "Əvvəlcə qidalanma planı yaradın"}
//             </p>
//           )}

//           {filteredItems.map((item) => (
//             <div
//               key={item.id}
//               className={`flex justify-between items-center p-4 border rounded-xl shadow-sm transition cursor-pointer
//                 ${item.checked ? "bg-slate-50 opacity-60" : "!bg-white"}`}
//               onClick={() => handleToggleItem(item.id, item.checked)}
//             >
//               <div className="flex items-center gap-3">
//                 {/* Checkbox visual */}
//                 <div
//                   className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition
//                     ${item.checked
//                       ? "bg-emerald-500 border-emerald-500"
//                       : "border-slate-300"}`}
//                 >
//                   {item.checked && <Check size={12} className="text-white" />}
//                 </div>

//                 <div>
//                   <span className={`font-medium ${item.checked ? "line-through text-slate-400" : "text-slate-700"}`}>
//                     {item.name}
//                   </span>
//                   {item.mealType && (
//                     <p className="text-xs text-slate-400">{item.mealType}</p>
//                   )}
//                 </div>
//               </div>

//               <span className="text-slate-500 text-sm">{item.quantity}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* EXPORT BUTTONS */}
//       <div className="flex flex-col sm:flex-row gap-3 p-5 sm:p-6 pt-0">
//         {selectedDay !== "All" && (
//           <button
//             onClick={() => onExport(selectedDay)}
//             disabled={!shoppingList}
//             className="!bg-blue-600 text-white py-3 px-6 rounded-xl shadow hover:!bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-40 text-sm"
//           >
//             <Download size={16} />
//             {days.find((d) => d.key === selectedDay)?.label} İxrac Et
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ShoppingListCard;



import { ShoppingCart, Download, Check } from "lucide-react";
import { useState } from "react";

// API response format:
// shoppingList = {
//   id, weekStart,
//   categories: [
//     {
//       name: "Meyvələr",
//       items: [
//         { id, name, quantity, checked, day: "Mon", mealType: "Breakfast" }
//       ]
//     }
//   ]
// }

const DAYS = [
  { key: "Mon", label: "B.e"  },
  { key: "Tue", label: "Ç.a"  },
  { key: "Wed", label: "Çər"  },
  { key: "Thu", label: "C.a"  },
  { key: "Fri", label: "Cüm"  },
  { key: "Sat", label: "Şən"  },
  { key: "Sun", label: "Baz"  },
];

const MEALS = [
  { key: "Breakfast", label: "Səhər Yeməyi" },
  { key: "Lunch",     label: "Nahar"        },
  { key: "Dinner",    label: "Şam Yeməyi"   },
];

// onDayChange(dayKey) — MealPlansPage-dən yeni shopping list fetch edir
function ShoppingListCard({ shoppingList, onUpdateItems, onExport, onDayChange }) {
  const [selectedDay,  setSelectedDay]  = useState(DAYS[0].key);
  const [selectedMeal, setSelectedMeal] = useState(MEALS[0].key);

  const categories = shoppingList?.categories || [];
  const allItems   = categories.flatMap((cat) => cat.items || []);

  // Seçilmiş yeməyə görə filter (gün artıq backend-dən gəlir)
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: (cat.items || []).filter(
        (item) => !item.mealType || item.mealType === selectedMeal
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const filteredItems = filteredCategories.flatMap((cat) => cat.items);
  const checkedCount  = filteredItems.filter((i) => i.checked).length;

  const handleDayClick = (dayKey) => {
    setSelectedDay(dayKey);
    if (onDayChange) onDayChange(dayKey); // ← backend-dən yeni list fetch edir
  };

  // ── PUT /shopping-lists/{id}/items ────────────────────────────────
  const handleToggleItem = (itemId, currentChecked) => {
    const updated = allItems.map((item) =>
      item.id === itemId ? { ...item, checked: !currentChecked } : item
    );
    onUpdateItems(
      updated.map((item) => ({
        id:       item.id,
        checked:  item.checked,
        quantity: item.quantity,
      }))
    );
  };

  const selectedDayLabel  = DAYS.find((d) => d.key === selectedDay)?.label  || "";
  const selectedMealLabel = MEALS.find((m) => m.key === selectedMeal)?.label || "";

  return (
    <div className="!bg-white !rounded-3xl !shadow-xl mt-12 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="!bg-blue-500 text-white p-3 rounded-xl">
            <ShoppingCart size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-black">Alış-Veriş Siyahısı</h2>
            <p className="text-slate-500 text-sm">
              {checkedCount > 0
                ? `${checkedCount}/${filteredItems.length} element`
                : `${filteredItems.length} element`}
            </p>
          </div>
        </div>
      </div>

      {/* DAY TABS — tab dəyişəndə backend-dən fetch edir */}
      <div className="px-6 pt-5">
        <div className="bg-slate-100 rounded-xl p-1 flex overflow-x-auto no-scrollbar">
          {DAYS.map((d) => (
            <button
              key={d.key}
              onClick={() => handleDayClick(d.key)}
              className={`flex-1 !py-2 !rounded-lg !text-xs sm:!text-sm !font-medium !transition whitespace-nowrap
                ${selectedDay === d.key
                  ? "!bg-white !shadow !text-blue-600"
                  : "!text-slate-500"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* MEAL TABS */}
      <div className="px-6 pt-3">
        <div className="bg-slate-100 rounded-xl p-1 flex gap-1">
          {MEALS.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedMeal(m.key)}
              className={`flex-1 !py-2 !rounded-lg !text-xs sm:!text-sm !font-medium !transition
                ${selectedMeal === m.key
                  ? "!bg-white !shadow !text-emerald-600"
                  : "!text-slate-500"}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORIES + ITEMS */}
      <div className="p-6 space-y-5 max-h-[450px] overflow-y-auto">
        {filteredCategories.length === 0 && (
          <p className="text-slate-400 text-sm py-4 text-center">
            {shoppingList
              ? "Bu gün və yemək üçün element yoxdur"
              : "Əvvəlcə qidalanma planı yaradın"}
          </p>
        )}

        {filteredCategories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              <span className="font-semibold text-slate-700 text-sm">{cat.name}</span>
            </div>

            <div className="space-y-2">
              {cat.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-center px-4 py-3 border rounded-xl shadow-sm transition cursor-pointer
                    ${item.checked ? "bg-slate-50 opacity-60" : "!bg-white"}`}
                  onClick={() => handleToggleItem(item.id, item.checked)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition shrink-0
                        ${item.checked ? "bg-blue-500 border-blue-500" : "border-slate-300"}`}
                    >
                      {item.checked && <Check size={11} className="text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${item.checked ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {item.name}
                    </span>
                  </div>
                  <span className="text-slate-400 text-sm">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* EXPORT BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-6 pb-6">
        <button
          onClick={() => onExport(null)}
          disabled={!shoppingList}
          className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-40 text-sm font-medium"
        >
          <Download size={15} /> Həftəni İxrac Et
        </button>

        <button
          onClick={() => onExport(selectedDay)}
          disabled={!shoppingList}
          className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-40 text-sm font-medium"
        >
          <Download size={15} /> {selectedDayLabel} İxrac Et
        </button>

        <button
          onClick={() => onExport(selectedDay)}
          disabled={!shoppingList}
          className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-40 text-sm font-medium"
        >
          <Download size={15} /> {selectedMealLabel} İxrac Et
        </button>
      </div>
    </div>
  );
}

export default ShoppingListCard;
