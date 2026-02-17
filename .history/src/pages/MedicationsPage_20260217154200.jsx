import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Pill, Clock, Trash2, Pencil, Utensils } from "lucide-react";
import AddMedicationModal from "./AddMedicationModal";
import EditMedicationModal from "./EditMedicationModal";

function MedicationsPage() {
  const { user } = useOutletContext();
  const storageKey = `medications_${user?.id}`;

  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);

  const handleAddMedication = (data) => {
    const newMed = {
      id: Date.now(),
      ...data,
    };
    setMedications((prev) => [...prev, newMed]);
    setIsAddOpen(false);
  };

  const handleUpdateMedication = (updatedMed) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === updatedMed.id ? updatedMed : m))
    );
    setEditingMed(null);
  };

  const handleDeleteMedication = (id) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(storageKey, JSON.stringify(medications));
    }
  }, [medications, storageKey, user]);

  return (

    <div className="w-full space-y-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="!text-3xl font-bold text-slate-900">Dərmanlar</h1>
          <p className="text-[15px]text-slate-600 mt-1">
            Dərman qəbulunuzu idarə edin və qeyd tutun.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all whitespace-nowrap flex-shrink-0"
        >
          <Plus size={20} />
          Dərman Əlavə Et
        </button>
      </div>


      {medications.length === 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-16 text-center shadow-lg">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Pill className="text-blue-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Hələ dərman yoxdur</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Cədvəlinizi izləməyə başlamaq üçün ilk dərmanınızı əlavə edin.
          </p>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg"
          >
            + Dərman Əlavə Et
          </button>
        </div>
      )}


      {medications.length > 0 && (
        <div className="space-y-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >

              <div className="flex gap-4 items-start">

                <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                  <Pill size={28} className="text-blue-600" />
                </div>


                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-slate-900">{med.name}</h3>
                  <p className="text-slate-600 mt-1">
                    {med.dose}<span className="ml-1">mg</span>
                  </p>

                  <div className="flex gap-6 text-sm text-slate-600 mt-3 flex-wrap">

                    <span className="flex items-center gap-1.5">
                      <Clock size={16} />
                      {med.time}
                    </span>


                    <span className="flex items-center gap-1.5">
                      <Pill size={16} />
                      {med.frequency}
                    </span>

                    {/* INTAKE CONDITION */}
                    {med.intakeCondition && (
                      <span className="flex items-center gap-1.5">
                        <Utensils size={16} />
                        {med.intakeCondition}
                      </span>
                    )}
                  </div>
                </div>
              </div>


              {med.note && (
                <div className="bg-slate-100 rounded-xl mt-4 ml-14 px-4 py-3 text-slate-700 text-sm">
                  {med.note}
                </div>
              )}


              <div className="flex gap-3 mt-4 ml-14">
                <button
                  onClick={() => setEditingMed(med)}
                  className="flex w-[200px] ml-[65px] items-center gap-1 bg-white border !border-blue-600 px-3 py-1 rounded-lg text-blue-600 justify-center transition-colors duration-200 hover:!bg-blue-100 hover:text-black"
                >
                  <Pencil size={16} /> Redaktə Et
                </button>

                <button
                  onClick={() => handleDeleteMedication(med.id)}
                  className="flex w-[120px] items-center gap-1 !bg-white !border !border-red-600 px-3 py-1 rounded-lg !text-red-600 justify-center transition-colors duration-200 hover:!bg-red-100 hover:!text-black"
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

      <EditMedicationModal
        medication={editingMed}
        onClose={() => setEditingMed(null)}
        onUpdate={handleUpdateMedication}
      />
    </div>
  );
}

export default MedicationsPage;