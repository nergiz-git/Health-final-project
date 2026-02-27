// import { useState } from "react";
// import { X } from "lucide-react";
// import { Button } from "../ui/Button";

//  function AddShoppingItemModal({ isOpen, onClose, onAdd }) {
//   const [formData, setFormData] = useState({
//     day: "Mon",
//     meal: "breakfast",
//     name: "",
//     quantity: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onAdd(formData.day, formData.meal, {
//       name: formData.name,
//       quantity: formData.quantity,
//     });

//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 rounded-xl w-[95%] sm:w-[350px] max-h-[90vh] overflow-y-auto space-y-3">
//         <div className="flex justify-between">
//           <h2 className="font-bold">Element əlavə et</h2>
//           <X onClick={onClose} className="cursor-pointer" />
//         </div>

//         <input placeholder="Ad"
//           onChange={(e)=>setFormData({...formData, name:e.target.value})} />

//         <input placeholder="Miqdar"
//           onChange={(e)=>setFormData({...formData, quantity:e.target.value})} />

//         <Button type="submit">Əlavə et</Button>
//       </form>
//     </div>
//   );
// }
// export default AddShoppingItemModal;




import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";

const DAYS = [
  { key: "Mon", label: "Bazar ertəsi" },
  { key: "Tue", label: "Çərşənbə axşamı" },
  { key: "Wed", label: "Çərşənbə" },
  { key: "Thu", label: "Cümə axşamı" },
  { key: "Fri", label: "Cümə" },
  { key: "Sat", label: "Şənbə" },
  { key: "Sun", label: "Bazar" },
];

const MEALS = [
  { key: "Breakfast", label: "Səhər Yeməyi" },
  { key: "Lunch",     label: "Nahar" },
  { key: "Dinner",    label: "Şam Yeməyi" },
];

const inputClass =
  "w-full border border-slate-200 rounded-lg px-3 py-2 bg-[#F3F3F5] text-slate-600 outline-none focus:ring-2 focus:ring-blue-400";

function AddShoppingItemModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    day:      "Mon",
    meal:     "Breakfast",
    name:     "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onAdd(formData.day, formData.meal, {
      name:     formData.name,
      quantity: formData.quantity,
    });
    setFormData({ day: "Mon", meal: "Breakfast", name: "", quantity: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] sm:w-[380px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-5 sm:p-6 relative">

        {/* TITLE */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-black">Element Əlavə Et</h2>
          <button onClick={onClose} className="!bg-transparent">
            <X className="text-slate-500" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Gün seçimi */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-600">Gün</label>
            <select
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className={inputClass}
            >
              {DAYS.map((d) => (
                <option key={d.key} value={d.key}>{d.label}</option>
              ))}
            </select>
          </div>

          {/* Yemək seçimi */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-600">Yemək</label>
            <select
              value={formData.meal}
              onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
              className={inputClass}
            >
              {MEALS.map((m) => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* Ad */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-600">Ad</label>
            <input
              className={inputClass}
              placeholder="məs. Alma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Miqdar */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-600">Miqdar</label>
            <input
              className={inputClass}
              placeholder="məs. 2 ədəd"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </div>

          {/* Buttons */}
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
              className="flex-1 h-[44px] rounded-lg !bg-blue-500 !text-white font-medium hover:!bg-blue-600"
            >
              Əlavə Et
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddShoppingItemModal;
