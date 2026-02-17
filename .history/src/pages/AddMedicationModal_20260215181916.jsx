

import { useState, useEffect } from "react";
import { X,Clock } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";


 function AddMedicationModal({ isOpen, onClose, onAdd }) {

  const initialForm = {
    name: "",
    dose: "",
    time: "",
    frequency: "",
    note: "",
    intakeCondition: "",
  };
const [showTimePicker, setShowTimePicker] = useState(false);

  const [formData, setFormData] = useState(initialForm);

  // ⭐ Modal hər açılanda formu sıfırla
  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
    }
  }, [isOpen]);

  // ⭐ Manual reset funksiyası
  const resetForm = () => {
    setFormData(initialForm);
  };

  // ⭐ Submit edəndə də reset et
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    resetForm();   // <- ƏN VACİB HİSSƏ
    onClose();
  };

  // ⭐ Cancel / X basanda da reset
  const handleClose = () => {
    resetForm();
    onClose();
  };
const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white   w-[405px] rounded-2xl shadow-xl p-6 relative">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg  font-bold">Dərman Əlavə Et</h2>
          <button onClick={handleClose}>
            <X className="text-slate-500" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <Label>Dərmanın Adı *</Label>
            <Input
             className="bg-[#F3F3F5] border-none"
              placeholder="məs: Metformin"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Doza *</Label>
            <Input
             className="bg-[#F3F3F5] border-none"
              placeholder="məs: 500mg"
              value={formData.dose}
              onChange={(e)=>setFormData({...formData,dose:e.target.value})}
            />
          </div>

           
       <div className="space-y-2 relative">
  <Label>Vaxt *</Label>

  {/* INPUT BOX */}
  <div className="relative">
    <div className="w-full h-11 bg-[#F3F3F5] border-none rounded px-4 flex items-center justify-between">
      <span className="text-slate-700">
        {formData.time || "--:-- --"}
      </span>

     <button
  type="button"
  onClick={() => setShowTimePicker(!showTimePicker)}
  className="!bg-transparent border-none outline-none mr-[180px] shadow-none p-0 m-0"
>
  <Clock size={18} className="text-slate-500" />
</button>

    </div>

    {/* TIME PICKER */}
    {showTimePicker && (
      <div className="absolute top-12 left-0 bg-white border shadow-lg p-3 flex h-[280px] z-50 w-[150px] ">

        {/* HOURS */}
        <div className=" overflow-y-scroll no-scrollbar  w-10">
          {Array.from({ length: 12 }, (_, i) => {
            const hour = String(i + 1).padStart(2, "0");
            return (
              <div
                key={hour}
                onClick={() =>
                  setFormData({
                    ...formData,
                    time: `${hour}:${formData.time?.split(":")[1]?.split(" ")[0] || "00"} ${formData.time?.split(" ")[1] || "AM"}`
                  })
                }
                className="py-2 text-center cursor-pointer hover:bg-gray-200"
              >
                {hour}
              </div>
            );
          })}
        </div>

        {/* MINUTES */}
        <div className=" overflow-y-scroll no-scrollbar w-10">
          {Array.from({ length: 60 }, (_, i) => {
            const min = String(i).padStart(2, "0");
            return (
              <div
                key={min}
                onClick={() =>
                  setFormData({
                    ...formData,
                    time: `${formData.time?.split(":")[0] || "08"}:${min} ${formData.time?.split(" ")[1] || "AM"}`
                  })
                }
                className="py-2 text-center cursor-pointer hover:bg-gray-200"
              >
                {min}
              </div>
            );
          })}
        </div>

        {/* AM PM */}
        <div className="h-40  w-10 flex flex-col ">
          {["AM","PM"].map(period => (
            <div
              key={period}
              onClick={() => {
                setFormData({
                  ...formData,
                  time: `${formData.time?.split(":")[0] || "08"}:${formData.time?.split(":")[1]?.split(" ")[0] || "00"} ${period}`
                });
                setShowTimePicker(false);
              }}
              className="py-2 text-center cursor-pointer hover:bg-gray-200"
            >
              {period}
            </div>
          ))}
        </div>

      </div>
    )}
  </div>
</div>



          <div className="space-y-2 ">
            <Label>Tezlik *</Label>
            <Input
            className="bg-[#F3F3F5] border-none"
              placeholder="Gündə bir dəfə"
              value={formData.frequency}
              onChange={(e)=>setFormData({...formData,frequency:e.target.value})}
            />
          </div>
          


          <div className="space-y-2">
            <Label>Qeydlər (istəyə görə)</Label>
            <textarea
              className="w-full border   rounded-lg p-3 mt-1 resize-none"
              rows="3"
              placeholder="Əlavə qeydlər..."
              value={formData.note}
              onChange={(e)=>setFormData({...formData,note:e.target.value})}
            />
          </div>

          {/* <div className="space-y-2">
            <Label>Qəbul Şərti (istəyə görə)</Label>
            <Input 
              placeholder="Yeməkdən sonra"
              value={formData.intakeCondition}
              onChange={(e)=>setFormData({...formData,intakeCondition:e.target.value})}
            />
          </div> */}

<div className="space-y-2">
  <Label>Qəbul Şərti (istəyə görə)</Label>

  <select
    value={formData.intakeCondition}
    onChange={(e)=>
      setFormData({...formData, intakeCondition: e.target.value})
    }
    className="w-full h-10 rounded-lg bg-[#F3F3F5] px-3 outline-none"
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
              className="flex-1 h-[44px] border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition"
            >
              Ləğv Et
            </button>

            <Button type="submit" className="flex-1 h-[44px] rounded-lg !bg-blue-500 !text-white font-medium hover:!bg-blue-600">
              Dərman Əlavə Et
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
export default AddMedicationModal;