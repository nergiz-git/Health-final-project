

import { useState, useEffect } from "react";
import { X,Clock } from "lucide-react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

 function EditMedicationModal({ medication, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    dose: "",
    time: "",
    frequency: "",
    note: "",
    intakeCondition: "",
  });
const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (medication) {
      setFormData(medication);
    }
  }, [medication]);

  if (!medication) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

 
    onUpdate({
      id: medication.id,
      ...formData,
    });

    onClose();
  };
const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[95%] sm:w-[420px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-5 sm:p-6 relative">

    
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">Dərmanı Redaktə Et</h2>
          <button onClick={onClose}>
            <X className="text-slate-500" size={18} />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <Label>Dərmanın Adı</Label>
            <Input
            className="bg-[#F3F3F5] border-none"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Doza</Label>
            <Input
            className="bg-[#F3F3F5] border-none"
              value={formData.dose}
              onChange={(e)=>setFormData({...formData,dose:e.target.value})}
            />
          </div>

           <div className="space-y-2 relative">
  <Label>Vaxt *</Label>


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

  
    {showTimePicker && (
      <div className="absolute top-12 left-0 sm:left-auto sm:right-0 bg-white border shadow-lg p-3 flex h-[280px] z-50 w-[170px] max-w-[90vw]">

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

          <div className="space-y-2">
            <Label>Tezlik</Label>
            <Input
            className="bg-[#F3F3F5] border-none"
              value={formData.frequency}
              onChange={(e)=>setFormData({...formData,frequency:e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Qeydlər(istəyə görə)</Label>
            <textarea
              className="w-full  border rounded-lg p-3 resize-none"
              rows="3"
              value={formData.note}
              onChange={(e)=>setFormData({...formData,note:e.target.value})}
            />
          </div>

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
              className="flex-1 h-[44px] rounded-lg !bg-blue-500 !text-white font-medium hover:!bg-blue-600"
            >
              Yenilə
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
export default EditMedicationModal;