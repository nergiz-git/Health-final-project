import { useState } from "react";
import { Pill, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

 function MedicationCard() {
  const [medications, setMedications] = useState([
    { id: 1, name: "Metformin", dosage: "500mg", time: "08:00", status: "taken" },
    { id: 2, name: "Lisinopril", dosage: "10mg", time: "08:00", status: "taken" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", time: "20:00", status: "upcoming" },
  ]);

  const handleMarkAsTaken = (id) => {
    setMedications(
      medications.map((m) => (m.id === id ? { ...m, status: "taken" } : m))
    );
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="font-bold">Bugünkü dərmanlar</h2>
        <Button size="sm">
          <Plus size={16} /> Add
        </Button>
      </div>

      {medications.map((med) => (
        <div key={med.id} className="flex justify-between p-3 border rounded-lg mb-2">
          <div>
            <p className="font-semibold ">{med.name}</p>
            <p className="text-sm text-gray-500">{med.time}</p>
          </div>

          {med.status === "upcoming" && (
            <Button size="sm" onClick={() => handleMarkAsTaken(med.id)}>
              Mark Taken
            </Button>
          )}

          {med.status === "taken" && <CheckCircle2 className="text-green-600" />}
        </div>
      ))}
    </Card>
  );
}
export default MedicationCard;