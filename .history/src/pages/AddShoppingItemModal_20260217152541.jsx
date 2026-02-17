import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";

 function AddShoppingItemModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    day: "Mon",
    meal: "breakfast",
    name: "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd(formData.day, formData.meal, {
      name: formData.name,
      quantity: formData.quantity,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-[350px] space-y-3">
        <div className="flex justify-between">
          <h2 className="font-bold">Element əlavə et</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <input placeholder="Ad"
          onChange={(e)=>setFormData({...formData, name:e.target.value})} />

        <input placeholder="Miqdar"
          onChange={(e)=>setFormData({...formData, quantity:e.target.value})} />

        <Button type="submit">Əlavə et</Button>
      </form>
    </div>
  );
}
export default AddShoppingItemModal;