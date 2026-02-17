import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";

function EditMealModal({ isOpen, onClose, onSave, initialDay, initialMeal }) {
  const [selectedDay, setSelectedDay] = useState("Mon");

  const [formData, setFormData] = useState({
    breakfast: "",
    breakfastTime: "07:00",
    lunch: "",
    lunchTime: "12:00",
    dinner: "",
    dinnerTime: "18:00",
  });

  useEffect(() => {
    if (initialMeal) setFormData(initialMeal);
    if (initialDay) setSelectedDay(initialDay);
  }, [initialMeal, initialDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(selectedDay, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 rounded-xl w-[95%] sm:w-[400px] max-h-[90vh] overflow-y-auto space-y-3">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Edit Meal</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <input placeholder="Breakfast" value={formData.breakfast}
          onChange={(e)=>setFormData({...formData, breakfast:e.target.value})} />

        <input type="time" value={formData.breakfastTime}
          onChange={(e)=>setFormData({...formData, breakfastTime:e.target.value})} />

        <input placeholder="Lunch" value={formData.lunch}
          onChange={(e)=>setFormData({...formData, lunch:e.target.value})} />

        <input type="time" value={formData.lunchTime}
          onChange={(e)=>setFormData({...formData, lunchTime:e.target.value})} />

        <input placeholder="Dinner" value={formData.dinner}
          onChange={(e)=>setFormData({...formData, dinner:e.target.value})} />

        <input type="time" value={formData.dinnerTime}
          onChange={(e)=>setFormData({...formData, dinnerTime:e.target.value})} />

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
export default EditMealModal;