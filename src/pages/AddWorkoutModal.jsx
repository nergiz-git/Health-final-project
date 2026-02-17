import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/";

export function AddWorkoutModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    day: "Mon",
    activity: "",
    duration: "",
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...formData,
      completed: false,
    });

    setFormData({
      day: "Mon",
      activity: "",
      duration: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Məşq Əlavə Et
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Day */}
          <div>
            <Label htmlFor="day">Gün *</Label>
            <select
              id="day"
              value={formData.day}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
              className="mt-1.5 w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Activity */}
          <div>
            <Label htmlFor="activity">Fəaliyyət *</Label>
            <Input
              id="activity"
              value={formData.activity}
              onChange={(e) =>
                setFormData({ ...formData, activity: e.target.value })
              }
              placeholder="məs: Səhər Gəzintisi, Yoqa, Üzmə"
              required
              className="mt-1.5"
            />
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration">Müddət *</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder="məs: 30 dəq"
              required
              className="mt-1.5"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Ləğv Et
            </Button>

            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            >
              Məşq Əlavə Et
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
