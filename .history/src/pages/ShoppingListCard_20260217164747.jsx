// import { ShoppingCart, Download } from "lucide-react";
// import { useState } from "react";

// function ShoppingListCard({ shoppingList }) {
//   const [selectedDay, setSelectedDay] = useState("Mon");
//   const [selectedMeal, setSelectedMeal] = useState("breakfast");

//   const days = [
//     { key: "Mon", label: "B.e" },
//     { key: "Tue", label: "Ç.a" },
//     { key: "Wed", label: "Çər" },
//     { key: "Thu", label: "C.a" },
//     { key: "Fri", label: "Cüm" },
//     { key: "Sat", label: "Şən" },
//     { key: "Sun", label: "Baz" },
//   ];

//   const meals = [
//     { value: "breakfast", label: "Səhər Yeməyi" },
//     { value: "lunch", label: "Nahar" },
//     { value: "dinner", label: "Şam Yeməyi" },
//   ];

//   const items = shoppingList?.[selectedDay]?.[selectedMeal] || [];

//   return (
//     <div className="!bg-white  !rounded-3xl !shadow-xl  mt-12 overflow-hidden">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 sm:p-6">
//         <div className="!bg-blue-500 text-white p-3 rounded-xl">
//           <ShoppingCart />
//         </div>
//         <div>
//           <h2 className="font-bold text-lg">Alış-Veriş Siyahısı</h2>
//           <p className="text-slate-500 text-sm">4 element</p>
//         </div>
//       </div>

//       {/* DAYS TABS */}
//       <div className="p-6 pb-0">
//         <div className="bg-slate-100 rounded-xl p-1 flex overflow-x-auto no-scrollbar">
//           {days.map(d => (
//             <button
//               key={d.key}
//               onClick={() => setSelectedDay(d.key)}
//               className={`flex-1 !py-2 !rounded-lg !text-sm !font-medium !transition
//               ${selectedDay === d.key
//                 ? "!bg-white !shadow !text-emerald-600"
//                 : "!text-slate-500"}`}
//             >
//               {d.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="fflex flex-wrap gap-4 text-sm text-slate-500 mb-4">
//           {meals.map(m => (
//             <button
//               key={m.value}
//               onClick={() => setSelectedMeal(m.value)}
//               className={`!font-semibold transition 
//               ${selectedMeal === m.value && "!text-emerald-600"}`}
//             >
//               {m.label}
//             </button>
//           ))}
//         </div>

//         {/* LIST */}
//         <div className="space-y-3 max-h-[350px] overflow-y-auto">
//           {items.length === 0 && (
//             <p className="!text-slate-400 text-sm">Siyahı boşdur</p>
//           )}

//           {items.map((item, i) => (
//             <div key={i} className="flex justify-between p-4 border rounded-xl !bg-white shadow-sm">
//               <span>{item.name}</span>
//               <span className="text-slate-500">{item.quantity}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 sm:p-6 pt-0">
//         <button className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700 flex items-center justify-center gap-2">
//           <Download size={18}/> Həftəni İxrac Et
//         </button>

//         <button className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700">
//           Bazar ertəsi İxrac Et
//         </button>

//         <button className="!bg-blue-600 text-white py-3 rounded-xl shadow hover:!bg-blue-700">
//           Səhər Yeməyi İxrac Et
//         </button>
//       </div>

//     </div>
//   );
// }

// export default ShoppingListCard;




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
    { value: "breakfast", label: "Səhər" },
    { value: "lunch", label: "Nahar" },
    { value: "dinner", label: "Axşam" },
  ];

  const items = shoppingList?.[selectedDay]?.[selectedMeal] || [];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
      {/* HEADER - ✅ Responsive */}
      <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 border-b border-slate-100">
        <div className="bg-blue-500 text-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
          <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
        </div>
        <div>
          <h2 className="font-bold text-base sm:text-lg">Alış-Veriş Siyahısı</h2>
          <p className="text-slate-500 text-xs sm:text-sm">{items.length} element</p>
        </div>
      </div>

      {/* DAYS TABS - ✅ Responsive */}
      <div className="px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5">
        <div className="bg-slate-100 rounded-lg sm:rounded-xl p-1 flex overflow-x-auto no-scrollbar gap-0.5">
          {days.map(d => (
            <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
              className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition min-w-0
                ${selectedDay === d.key
                  ? "bg-white shadow text-emerald-600"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* MEAL FILTER - ✅ Responsive */}
      <div className="px-4 sm:px-5 lg:px-6 pt-3 sm:pt-4">
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          {meals.map(m => (
            <button
              key={m.value}
              onClick={() => setSelectedMeal(m.value)}
              className={`font-semibold text-xs sm:text-sm transition pb-1 border-b-2
                ${selectedMeal === m.value
                  ? "text-emerald-600 border-emerald-500"
                  : "text-slate-500 border-transparent hover:text-slate-700"
                }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* LIST - ✅ Responsive */}
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[350px] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6 sm:py-8">
              Siyahı boşdur
            </p>
          ) : (
            items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 sm:p-4 border border-slate-200 rounded-xl bg-white shadow-sm"
              >
                <span className="text-sm sm:text-base text-slate-800">{item.name}</span>
                <span className="text-xs sm:text-sm text-slate-500 font-medium">{item.quantity}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DOWNLOAD BUTTONS - ✅ Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 pt-0">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-xl shadow flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-colors">
          <Download size={15} className="sm:w-[18px] sm:h-[18px]" />
          Həftəni İxrac Et
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-xl shadow text-xs sm:text-sm font-medium transition-colors">
          {days.find(d => d.key === selectedDay)?.label} İxrac Et
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-xl shadow text-xs sm:text-sm font-medium transition-colors">
          {meals.find(m => m.value === selectedMeal)?.label} İxrac Et
        </button>
      </div>
    </div>
  );
}

export default ShoppingListCard;