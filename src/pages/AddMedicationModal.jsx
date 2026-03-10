

// import { useState, useEffect } from "react";
// import { X,Clock } from "lucide-react";
// import { Button } from "../ui/Button";
// import { Input } from "../ui/Input";
// import { Label } from "../ui/Label";


//  function AddMedicationModal({ isOpen, onClose, onAdd }) {

//   const initialForm = {
//     name: "",
//     dose: "",
//     time: "",
//     frequency: "",
//     note: "",
//     intakeCondition: "",
//   };
// const [showTimePicker, setShowTimePicker] = useState(false);

//   const [formData, setFormData] = useState(initialForm);

//   // ⭐ Modal hər açılanda formu sıfırla
//   useEffect(() => {
//     if (isOpen) {
//       setFormData(initialForm);
//     }
//   }, [isOpen]);

//   // ⭐ Manual reset funksiyası
//   const resetForm = () => {
//     setFormData(initialForm);
//   };

//   // ⭐ Submit edəndə də reset et
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAdd(formData);
//     resetForm();   // <- ƏN VACİB HİSSƏ
//     onClose();
//   };

//   // ⭐ Cancel / X basanda da reset
//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };
// const hours = Array.from({ length: 12 }, (_, i) =>
//   String(i + 1).padStart(2, "0")
// );

// const minutes = Array.from({ length: 60 }, (_, i) =>
//   String(i).padStart(2, "0")
// );

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

//       <div className="bg-white w-[95%] sm:w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-5 sm:p-6 relative">

//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-lg  font-bold">Dərman Əlavə Et</h2>
//           <button onClick={handleClose}>
//             <X className="text-slate-500" size={18} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <div className="space-y-2">
//             <Label>Dərmanın Adı *</Label>
//             <Input
//              className="bg-[#F3F3F5] border-none"
//               placeholder="məs: Metformin"
//               value={formData.name}
//               onChange={(e)=>setFormData({...formData,name:e.target.value})}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Doza *</Label>
//             <Input
//              className="bg-[#F3F3F5] border-none"
//               placeholder="məs: 500mg"
//               value={formData.dose}
//               onChange={(e)=>setFormData({...formData,dose:e.target.value})}
//             />
//           </div>


//        <div className="space-y-2 relative">
//   <Label>Vaxt *</Label>

//   {/* INPUT BOX */}
//   <div className="relative">
//     <div className="w-full h-11 bg-[#F3F3F5] border-none rounded px-4 flex items-center justify-between">
//       <span className="text-slate-700">
//         {formData.time || "--:-- --"}
//       </span>

//      <button
//   type="button"
//   onClick={() => setShowTimePicker(!showTimePicker)}
//   className="!bg-transparent border-none outline-none mr-[180px] shadow-none p-0 m-0"
// >
//   <Clock size={18} className="text-slate-500" />
// </button>

//     </div>

//     {/* TIME PICKER */}
//     {showTimePicker && (
//       <div className="absolute top-12 left-0 bg-white border shadow-lg p-3 flex h-[280px] z-50 w-[150px] ">

//         {/* HOURS */}
//         <div className=" overflow-y-scroll no-scrollbar  w-10">
//           {Array.from({ length: 12 }, (_, i) => {
//             const hour = String(i + 1).padStart(2, "0");
//             return (
//               <div
//                 key={hour}
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     time: `${hour}:${formData.time?.split(":")[1]?.split(" ")[0] || "00"} ${formData.time?.split(" ")[1] || "AM"}`
//                   })
//                 }
//                 className="py-2 text-center cursor-pointer hover:bg-gray-200"
//               >
//                 {hour}
//               </div>
//             );
//           })}
//         </div>

//         {/* MINUTES */}
//         <div className=" overflow-y-scroll no-scrollbar w-10">
//           {Array.from({ length: 60 }, (_, i) => {
//             const min = String(i).padStart(2, "0");
//             return (
//               <div
//                 key={min}
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     time: `${formData.time?.split(":")[0] || "08"}:${min} ${formData.time?.split(" ")[1] || "AM"}`
//                   })
//                 }
//                 className="py-2 text-center cursor-pointer hover:bg-gray-200"
//               >
//                 {min}
//               </div>
//             );
//           })}
//         </div>

//         {/* AM PM */}
//         <div className="h-40  w-10 flex flex-col ">
//           {["AM","PM"].map(period => (
//             <div
//               key={period}
//               onClick={() => {
//                 setFormData({
//                   ...formData,
//                   time: `${formData.time?.split(":")[0] || "08"}:${formData.time?.split(":")[1]?.split(" ")[0] || "00"} ${period}`
//                 });
//                 setShowTimePicker(false);
//               }}
//               className="py-2 text-center cursor-pointer hover:bg-gray-200"
//             >
//               {period}
//             </div>
//           ))}
//         </div>

//       </div>
//     )}
//   </div>
// </div>



//           <div className="space-y-2 ">
//             <Label>Tezlik *</Label>
//             <Input
//             className="bg-[#F3F3F5] border-none"
//               placeholder="Gündə bir dəfə"
//               value={formData.frequency}
//               onChange={(e)=>setFormData({...formData,frequency:e.target.value})}
//             />
//           </div>



//           <div className="space-y-2">
//             <Label>Qeydlər (istəyə görə)</Label>
//             <textarea
//               className="w-full border   rounded-lg p-3 mt-1 resize-none"
//               rows="3"
//               placeholder="Əlavə qeydlər..."
//               value={formData.note}
//               onChange={(e)=>setFormData({...formData,note:e.target.value})}
//             />
//           </div>

//           {/* <div className="space-y-2">
//             <Label>Qəbul Şərti (istəyə görə)</Label>
//             <Input 
//               placeholder="Yeməkdən sonra"
//               value={formData.intakeCondition}
//               onChange={(e)=>setFormData({...formData,intakeCondition:e.target.value})}
//             />
//           </div> */}

// <div className="space-y-2">
//   <Label>Qəbul Şərti (istəyə görə)</Label>

//   <select
//     value={formData.intakeCondition}
//     onChange={(e)=>
//       setFormData({...formData, intakeCondition: e.target.value})
//     }
//     className="w-full h-10 rounded-lg bg-[#F3F3F5] px-3 outline-none"
//   >
//     <option value="">Heç biri</option>
//     <option value="Yeməkdən əvvəl">Yeməkdən əvvəl</option>
//     <option value="Yemək zamanı">Yemək zamanı</option>
//     <option value="Yeməkdən sonra">Yeməkdən sonra</option>
//   </select>
// </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="flex-1 h-[44px] border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition"
//             >
//               Ləğv Et
//             </button>

//             <Button type="submit" className="flex-1 h-[44px] rounded-lg !bg-blue-500 !text-white font-medium hover:!bg-blue-600">
//               Dərman Əlavə Et
//             </Button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }
// export default AddMedicationModal;





// import { useState, useEffect } from "react";
// import { X, Clock, Loader2 } from "lucide-react";
// import { Button } from "../ui/Button";
// import { Input } from "../ui/Input";
// import { Label } from "../ui/Label";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function AddMedicationModal({ isOpen, onClose, onAdd }) {
//   const initialForm = {
//     name: "",
//     dose: "",
//     time: "",
//     frequency: "",
//     note: "",
//     intakeCondition: "",
//   };

//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [formData, setFormData] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Modal açılanda formu sıfırla
//   useEffect(() => {
//     if (isOpen) {
//       setFormData(initialForm);
//       setError("");
//     }
//   }, [isOpen]);

//   const resetForm = () => {
//     setFormData(initialForm);
//     setError("");
//   };

//   // ✅ Backend-ə POST et
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.name || !formData.dose || !formData.time || !formData.frequency) {
//       setError("Zəruri sahələri doldurun!");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${API_BASE_URL}/medications`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           dosage: formData.dose,
//           time: formData.time,
//           frequency: formData.frequency,
//           notes: formData.note,
//           intakeCondition: formData.intakeCondition,
//         }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Xəta baş verdi");
//       }

//       const data = await res.json();
//       console.log("✅ MEDICATION ADDED:", data);

//       // Parent-ə yeni dərmanı bildir
//       onAdd(data);
//       resetForm();
//       onClose();

//     } catch (err) {
//       console.error("❌ ADD MEDICATION ERROR:", err);
//       setError(err.message || "Dərman əlavə edilmədi. Yenidən cəhd edin.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white w-[95%] sm:w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-5 sm:p-6 relative">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-lg font-bold">Dərman Əlavə Et</h2>
//           <button onClick={handleClose} disabled={loading}>
//             <X className="text-slate-500" size={18} />
//           </button>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Dərmanın Adı */}
//           <div className="space-y-2">
//             <Label>Dərmanın Adı *</Label>
//             <Input
//               className="bg-[#F3F3F5] border-none"
//               placeholder="məs: Metformin"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               disabled={loading}
//             />
//           </div>

//           {/* Doza */}
//           <div className="space-y-2">
//             <Label>Doza *</Label>
//             <Input
//               className="bg-[#F3F3F5] border-none"
//               placeholder="məs: 500mg"
//               value={formData.dose}
//               onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
//               disabled={loading}
//             />
//           </div>

//           {/* Vaxt - Time Picker */}
//           <div className="space-y-2 relative">
//             <Label>Vaxt *</Label>
//             <div className="relative">
//               <div className="w-full h-11 bg-[#F3F3F5] border-none rounded px-4 flex items-center justify-between">
//                 <span className="text-slate-700">
//                   {formData.time || "--:-- --"}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => setShowTimePicker(!showTimePicker)}
//                   className="!bg-transparent border-none outline-none mr-[180px] shadow-none p-0 m-0"
//                   disabled={loading}
//                 >
//                   <Clock size={18} className="text-slate-500" />
//                 </button>
//               </div>

//               {showTimePicker && (
//                 <div className="absolute top-12 left-0 bg-white border shadow-lg p-3 flex h-[280px] z-50 w-[150px]">
//                   {/* HOURS */}
//                   <div className="overflow-y-scroll no-scrollbar w-10">
//                     {Array.from({ length: 12 }, (_, i) => {
//                       const hour = String(i + 1).padStart(2, "0");
//                       return (
//                         <div
//                           key={hour}
//                           onClick={() =>
//                             setFormData({
//                               ...formData,
//                               time: `${hour}:${formData.time?.split(":")[1]?.split(" ")[0] || "00"} ${formData.time?.split(" ")[1] || "AM"}`
//                             })
//                           }
//                           className="py-2 text-center cursor-pointer hover:bg-gray-200"
//                         >
//                           {hour}
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* MINUTES */}
//                   <div className="overflow-y-scroll no-scrollbar w-10">
//                     {Array.from({ length: 60 }, (_, i) => {
//                       const min = String(i).padStart(2, "0");
//                       return (
//                         <div
//                           key={min}
//                           onClick={() =>
//                             setFormData({
//                               ...formData,
//                               time: `${formData.time?.split(":")[0] || "08"}:${min} ${formData.time?.split(" ")[1] || "AM"}`
//                             })
//                           }
//                           className="py-2 text-center cursor-pointer hover:bg-gray-200"
//                         >
//                           {min}
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* AM/PM */}
//                   <div className="h-40 w-10 flex flex-col">
//                     {["AM", "PM"].map(period => (
//                       <div
//                         key={period}
//                         onClick={() => {
//                           setFormData({
//                             ...formData,
//                             time: `${formData.time?.split(":")[0] || "08"}:${formData.time?.split(":")[1]?.split(" ")[0] || "00"} ${period}`
//                           });
//                           setShowTimePicker(false);
//                         }}
//                         className="py-2 text-center cursor-pointer hover:bg-gray-200"
//                       >
//                         {period}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Tezlik */}
//           <div className="space-y-2">
//             <Label>Tezlik *</Label>
//             <Input
//               className="bg-[#F3F3F5] border-none"
//               placeholder="Gündə bir dəfə"
//               value={formData.frequency}
//               onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
//               disabled={loading}
//             />
//           </div>

//           {/* Qeydlər */}
//           <div className="space-y-2">
//             <Label>Qeydlər (istəyə görə)</Label>
//             <textarea
//               className="w-full border rounded-lg p-3 mt-1 resize-none"
//               rows="3"
//               placeholder="Əlavə qeydlər..."
//               value={formData.note}
//               onChange={(e) => setFormData({ ...formData, note: e.target.value })}
//               disabled={loading}
//             />
//           </div>

//           {/* Qəbul Şərti */}
//           <div className="space-y-2">
//             <Label>Qəbul Şərti (istəyə görə)</Label>
//             <select
//               value={formData.intakeCondition}
//               onChange={(e) => setFormData({ ...formData, intakeCondition: e.target.value })}
//               className="w-full h-10 rounded-lg bg-[#F3F3F5] px-3 outline-none"
//               disabled={loading}
//             >
//               <option value="">Heç biri</option>
//               <option value="Yeməkdən əvvəl">Yeməkdən əvvəl</option>
//               <option value="Yemək zamanı">Yemək zamanı</option>
//               <option value="Yeməkdən sonra">Yeməkdən sonra</option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={loading}
//               className="flex-1 h-[44px] border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition disabled:opacity-50"
//             >
//               Ləğv Et
//             </button>

//             <Button
//               type="submit"
//               disabled={loading}
//               className="flex-1 h-[44px] rounded-lg !bg-blue-500 !text-white font-medium hover:!bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Əlavə edilir...
//                 </>
//               ) : (
//                 "Dərman Əlavə Et"
//               )}
//             </Button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddMedicationModal;



import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { X, Clock, Loader2, Trash2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddMedicationModal({ isOpen, onClose, onAdd }) {
  // const initialForm = {
  //   name: "",
  //   dose: "",
  //   time: "",
  //   frequency: "",
  //   note: "",
  //   intakeCondition: "",
  // };
const initialForm = {
  name: "",
  dose: "",
  times: [""],
  frequency: "",
  note: "",
  intakeCondition: "",
};
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const addTimeField = () => {
  setFormData((prev) => ({
    ...prev,
    times: [...prev.times, ""],
  }));
};

const removeTimeField = (index) => {
  setFormData((prev) => ({
    ...prev,
    times: prev.times.filter((_, i) => i !== index),
  }));
};

const updateTime = (index, value) => {
  const newTimes = [...formData.times];
  newTimes[index] = value;

  setFormData({
    ...formData,
    times: newTimes,
  });
};
  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
      setError("");
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData(initialForm);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.dose || !formData.times || !formData.frequency) {
      setError("Zəruri sahələri doldurun!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/medications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        //   name: formData.name,
        //   dose: formData.dose,
        //   time: formData.time,
        //   frequency: formData.frequency,
        //   notes: formData.note,
        //   intakeCondition: formData.intakeCondition,
        // }),
        body: JSON.stringify({
  name: formData.name,
  dose: formData.dose,
  time: formData.times.join(", "),  // 👈 bütün saatlar birləşir
  frequency: formData.frequency,
  notes: formData.note,
  intakeCondition: formData.intakeCondition,
}),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Xəta baş verdi");
      }

      const data = await res.json();
      console.log("✅ MEDICATION ADDED:", data);

      // 🔹 Parent-ə yalnız UI state yeniləməsi üçün göndəririk
      onAdd(data);
      resetForm();
      onClose();

    } catch (err) {
      console.error("❌ ADD MEDICATION ERROR:", err);
      setError(err.message || "Dərman əlavə edilmədi. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] sm:w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-5 sm:p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-black">Dərman Əlavə Et</h2>
          <button onClick={handleClose} disabled={loading}>
            <X className="text-slate-500" size={18} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div className="space-y-2">
            <Label className={"text-black"}>Dərmanın Adı *</Label>
            <Input
              className="bg-[#F3F3F5] border-none text-slate-700"
              placeholder="məs: Metformin"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label className={"text-black"}>Doza *</Label>
            <Input
              className="bg-[#F3F3F5] border-none !text-slate-500"
              placeholder="məs: 500mg"
              value={formData.dose}
              onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
              disabled={loading}
            />
          </div>



{/* <div className="space-y-2">
  <Label className={"text-black"}>Vaxt *</Label>

  {formData.times.map((time, index) => (
    <div key={index} className="flex gap-2 items-center">

      <input
        type="time"
        value={time}
        onChange={(e) => updateTime(index, e.target.value)}
        className="w-full h-10 bg-[#F3F3F5] rounded px-3"
      />

      {index !== 0 && (
        <button
          type="button"
          onClick={() => removeTimeField(index)}
          className="text-red-500"
        >
          Sil
        </button>
      )}
    </div>
  ))}

  <button
    type="button"
    onClick={addTimeField}
    className="text-blue-600 text-sm"
  >
    + Vaxt əlavə et
  </button>
</div> */}
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label className={"text-black"}>Vaxt *</Label>
    <button
      type="button"
      onClick={addTimeField}
      className="text-blue-600 text-sm"
    >
      + Vaxt əlavə et
    </button>
  </div>

 {formData.times.map((time, index) => (
  <div key={index} className="flex gap-2 items-center">
    <input
      type="time"
      value={time}
      onChange={(e) => updateTime(index, e.target.value)}
      className="w-full h-10 bg-[#F3F3F5] rounded px-3"
    />

    {formData.times.length > 1 && (
      <button
        type="button"
        onClick={() => removeTimeField(index)}
        className="text-red-500 hover:text-red-600 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    )}
  </div>
))}
</div>
      <div className="space-y-2">
            <Label className={"text-black"}>Tezlik *</Label>
            <Input
              className="bg-[#F3F3F5] border-none !text-slate-500"
              placeholder="Gündə bir dəfə"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label className={"text-black"}>Qeydlər (istəyə görə)</Label>
            <textarea
              className="w-full border rounded-lg p-3 mt-1 resize-none !text-slate-500"
              rows="3"
              placeholder="Əlavə qeydlər..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label className={"text-black"}>Qəbul Şərti (istəyə görə)</Label>
            <select
              value={formData.intakeCondition}
              onChange={(e) => setFormData({ ...formData, intakeCondition: e.target.value })}
              className="w-full h-10 rounded-lg bg-[#F3F3F5] px-3 outline-none !text-slate-500"
              disabled={loading}
            >
              <option value="">Heç biri</option>
              <option value="Yeməkdən əvvəl">Yeməkdən əvvəl</option>
              <option value="Yemək zamanı">Yemək zamanı</option>
              <option value="Yeməkdən sonra">Yeməkdən sonra</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 h-[44px] border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition disabled:opacity-50"
            >
              Ləğv Et
            </button>

            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-[44px] rounded-lg !bg-blue-500 !text-white font-medium hover:!bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Əlavə edilir...
                </>
              ) : (
                "Dərman Əlavə Et"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMedicationModal;
