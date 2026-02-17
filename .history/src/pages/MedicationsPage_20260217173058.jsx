// import { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import { Plus, Pill, Clock, Trash2, Pencil, Utensils } from "lucide-react";
// import AddMedicationModal from "./AddMedicationModal";
// import EditMedicationModal from "./EditMedicationModal";

// function MedicationsPage() {
//   const { user } = useOutletContext();
//   const storageKey = `medications_${user?.id}`;

//   const [medications, setMedications] = useState(() => {
//     const saved = localStorage.getItem(storageKey);
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [editingMed, setEditingMed] = useState(null);

  
//   const handleAddMedication = (data) => {
//     const newMed = {
//       id: Date.now(),
//       ...data,
//     };
//     setMedications((prev) => [...prev, newMed]);
//     setIsAddOpen(false);
//   };

//   const handleUpdateMedication = (updatedMed) => {
//     setMedications((prev) =>
//       prev.map((m) => (m.id === updatedMed.id ? updatedMed : m))
//     );
//     setEditingMed(null);
//   };

//   const handleDeleteMedication = (id) => {
//     setMedications((prev) => prev.filter((m) => m.id !== id));
//   };

//   useEffect(() => {
//     if (user?.id) {
//       localStorage.setItem(storageKey, JSON.stringify(medications));
//     }
//   }, [medications, storageKey, user]);

//   return (

//     <div className="w-full space-y-6">

//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
//         <div className="flex-1">
//           <h1 className="!text-3xl font-bold text-slate-900">Dərmanlar</h1>
//           <p className="text-[15px]text-slate-600 mt-1">
//             Dərman qəbulunuzu idarə edin və qeyd tutun.
//           </p>
//         </div>

//         <button
//           onClick={() => setIsAddOpen(true)}
//           className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all whitespace-nowrap flex-shrink-0"
//         >
//           <Plus size={20} />
//           Dərman Əlavə Et
//         </button>
//       </div>


//       {medications.length === 0 && (
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-16 text-center shadow-lg">
//           <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Pill className="text-blue-600" size={40} />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-900 mb-2">Hələ dərman yoxdur</h2>
//           <p className="text-slate-600 mb-6 max-w-md mx-auto">
//             Cədvəlinizi izləməyə başlamaq üçün ilk dərmanınızı əlavə edin.
//           </p>

//           <button
//             onClick={() => setIsAddOpen(true)}
//             className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-8 !py-2 !rounded-xl !font-semibold !transition-all !shadow-lg !w-full"
//           >
//             + Dərman Əlavə Et
//           </button>
//         </div>
//       )}


//       {medications.length > 0 && (
//         <div className="space-y-4">
//           {medications.map((med) => (
//             <div
//               key={med.id}
//               className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
//             >

//               <div className="flex gap-4 items-start">

//                 <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
//                   <Pill size={28} className="text-blue-600" />
//                 </div>


//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-xl font-bold text-slate-900">{med.name}</h3>
//                   <p className="text-slate-600 mt-1">
//                     {med.dose}<span className="ml-1">mg</span>
//                   </p>

//                   <div className="flex gap-6 text-sm text-slate-600 mt-3 flex-wrap">

//                     <span className="flex items-center gap-1.5">
//                       <Clock size={16} />
//                       {med.time}
//                     </span>


//                     <span className="flex items-center gap-1.5">
//                       <Pill size={16} />
//                       {med.frequency}
//                     </span>

//                     {/* INTAKE CONDITION */}
//                     {med.intakeCondition && (
//                       <span className="flex items-center gap-1.5">
//                         <Utensils size={16} />
//                         {med.intakeCondition}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>


//               {med.note && (
//                 <div className="bg-slate-100 rounded-xl mt-4 sm:ml-14 px-4 py-3 text-slate-700 text-sm">
//                   {med.note}
//                 </div>
//               )}


//               <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:ml-14">
//                 <button
//                   onClick={() => setEditingMed(med)}
//                   className="flex w-full sm:w-[200px] sm:ml-[35px] items-center gap-1 bg-white border !border-blue-600 px-3 py-1 rounded-lg text-blue-600 justify-center transition-colors duration-200 hover:!bg-blue-100 hover:text-black"
//                 >
//                   <Pencil size={16} /> Redaktə Et
//                 </button>

//                 <button
//                   onClick={() => handleDeleteMedication(med.id)}
//                   className="flex w-full sm:w-[120px] items-center gap-1 !bg-white !border !border-red-600 px-3 py-1 rounded-lg !text-red-600 justify-center transition-colors duration-200 hover:!bg-red-100 hover:!text-black"
//                 >
//                   <Trash2 size={16} /> Sil
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}


//       <AddMedicationModal
//         isOpen={isAddOpen}
//         onClose={() => setIsAddOpen(false)}
//         onAdd={handleAddMedication}
//       />

//       <EditMedicationModal
//         medication={editingMed}
//         onClose={() => setEditingMed(null)}
//         onUpdate={handleUpdateMedication}
//       />
//     </div>
//   );
// }

// export default MedicationsPage;





import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useCallback } from "react";

import { motion } from "framer-motion";
import { Plus, Pill, Clock, Trash2, Pencil,Utensils } from "lucide-react";

import AddMedicationModal from "./AddMedicationModal";
import EditMedicationModal from "./EditMedicationModal";

function MedicationsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

 

const [medications, setMedications] = useState([]);
const token = localStorage.getItem("token");


  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);

useEffect(() => {
  const fetchMedications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/medications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMedications(data);
    } catch (err) {
      console.error("Dərmanlar yüklənmədi", err);
    }
  };

  fetchMedications();
}, []);

  // ➕ ADD
 
const handleAddMedication = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/medications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        dose: data.dose,
        time: data.time,
        frequency: data.frequency,
        notes: data.note,
        intakeCondition: data.intakeCondition,
      }),
    });

    const createdMed = await res.json();

    // 🔥 UI ani yenilənsin
    setMedications((prev) => [...prev, createdMed]);

    setIsAddOpen(false);
  } catch (err) {
    console.error("Dərman əlavə olunmadı", err);
  }
};

  // ✏️ EDIT
  const updateMedication = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/medications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
  name: updatedData.name,
  dose: updatedData.dose,
  time: updatedData.time,
  frequency: updatedData.frequency,
  notes: updatedData.note,
  intakeCondition: updatedData.intakeCondition,
}),

    });

    if (!res.ok) throw new Error("Update failed");

   
    fetchMedications();

  } catch (err) {
    console.error("Update error:", err);
  }
};

 
 const fetchMedications = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/medications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setMedications(data);
  } catch (err) {
    console.error(err);
  }
}, []);

const deleteMedication = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/medications/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
  const text = await res.text();
  console.log("BACKEND DELETE RESPONSE:", text);
  throw new Error("Delete failed");
}


    setMedications(prev => prev.filter(m => m.id !== id));

  } catch (err) {
    console.error("Delete error:", err);
  }
};



  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

     <motion.div
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="mb-10"
>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="!text-xl font-bold">Dərmanlar</h1>
          <p className="text-slate-500">
            Dərman qəbulunuzu idarə edin və qeyd tutun.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 text-white px-5 py-2.5 rounded-xl w-full sm:w-auto"
        >
          <Plus size={18} />
          Dərman Əlavə Et
        </button>
      </div>
      </motion.div>
  <motion.div
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    duration: 1.2,
    ease: "easeOut",
    delay: 0.2
  
  }}>
      {medications.length === 0 && (
        <div className="bg-white rounded-2xl p-8 sm:p-12 md:p-16 text-center shadow flex flex-col items-center">
          <Pill className="mb-4 text-gray-500" size={48} />
          <h2 className="text-2xl font-semibold mb-2">Hələ dərman yoxdur</h2>
          <p className="text-slate-500 mb-6 max-w-md">
            Cədvəlinizi izləməyə başlamaq üçün ilk dərmanınızı əlavə edin.
          </p>

          <button
            onClick={() => setIsAddOpen(true)}
            className="!bg-blue-600 text-white  mt-[35px] w-full px-6 py-2 rounded-lg"
          >
            + Dərman Əlavə Et
          </button>
        </div>
      )}
</motion.div>
      {medications.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
          {medications.map((med) => (
            <div
              key={med.id}
              className="!bg-white  rounded-2xl p-6 shadow flex flex-col justify-between gap-4"
            >
       
<div className="flex flex-col sm:flex-row gap-4 items-start">


  <div className="bg-blue-100 p-3 rounded-xl">
    <Pill size={28} className="text-blue-600" />
  </div>


  <div className="space-y-1">
    <h3 className="text-xl font-semibold">{med.name}</h3>
    <p className="text-slate-500">{med.dose}
      <span>mg</span>
    </p>

    <div className="flex gap-6 text-sm text-slate-600 mt-1 flex-wrap">

  
  <span className="flex items-center mt-[10px] gap-1">
    <Clock size={16} />
    {med.time}
  </span>

 
  <span className="flex items-center mt-[10px] gap-1">
    <Pill size={16} />
    {med.frequency}
  </span>


  {med.intakeCondition && (
    <span className="flex items-center mt-[10px] gap-1">
      <Utensils size={16} />
      {med.intakeCondition}
    </span>
  )}

</div>

  </div>
</div>

{med.note && (
  <div className="bg-gray-100 rounded-xl mt-4 sm:ml-[65px] px-4 py-3 text-gray-600 text-sm">
    {med.note}
  </div>
)}


              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setEditingMed(med)}
                  className="flex w-full sm:w-[200px] sm:ml-[65px] items-center gap-1  bg-white border !border-blue-600 px-3 py-1 rounded-lg text-blue-600 justify-center transition-colors duration-200 hover:!bg-blue-100 hover:text-black"
                >
                  <Pencil size={16} /> Redaktə Et
                </button>

                <button
                onClick={() => {
  console.log("Silinəcək id:", med.id);
  deleteMedication(med.id);
}}
                  className="flex w-full sm:w-[120px] items-center gap-1 !bg-white !border !border-red-600 px-3 py-1 rounded-lg !text-red-600 justify-center transition-colors duration-200 hover:!bg-red-100 hover:!text-black"
                >
                  <Trash2 size={16} /> Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

  
      <AddMedicationModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddMedication}
      />

   {editingMed && (
  <EditMedicationModal
    medication={editingMed}
    onClose={() => setEditingMed(null)}
    onUpdate={(data) => updateMedication(editingMed.id, data)}
  />
)}

    </div>
  );
}
export default MedicationsPage;