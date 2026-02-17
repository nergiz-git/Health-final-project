import { Dumbbell, Sparkles, CheckCircle2, Circle } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Progress } from "../ui/Progress";
import { useState } from "react";
import { motion } from "framer-motion";
export function WorkoutCard() {
  const [workouts, setWorkouts] = useState([
    { id: "1", day: "Mon", activity: "Səhər Gəzintisi", duration: "30 dəq", completed: false },
    { id: "2", day: "Tue", activity: "Yüngül Yoqa", duration: "20 dəq", completed: false },
    { id: "3", day: "Wed", activity: "Üzgüçülük", duration: "25 dəq", completed: false },
    { id: "4", day: "Thu", activity: "Səhər Gəzintisi", duration: "30 dəq", completed: false },
    { id: "5", day: "Fri", activity: "Uzanma", duration: "15 dəq", completed: false },
    { id: "6", day: "Sat", activity: "Velosiped Sürmə", duration: "40 dəq", completed: false },
    { id: "7", day: "Sun", activity: "İstirahət Günü", duration: "—", completed: false },
  ]);

  const handleMarkComplete = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id
          ? { ...workout, completed: true }
          : workout
      )
    );
  };

  const handleAddWorkout = () => {
    alert("Məşq Cədvəli Yarat funksiyası - Tezliklə gələcək!");
  };

  const completedCount = workouts.filter((w) => w.completed).length;
  const totalCount = workouts.filter(
    (w) => w.activity !== "İstirahət Günü"
  ).length;

  const progressPercentage =
    totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const dayLabels = {
    Mon: "B.e",
    Tue: "Ç.a",
    Wed: "Çər",
    Thu: "C.a",
    Fri: "Cüm",
    Sat: "Şən",
    Sun: "Baz",
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Card className="bg-white border border-slate-200/80 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden transition-all">
        {/* Header */}
        <div className="px-7 py-5 border-b border-slate-100 bg-gradient-to-r from-purple-50 via-purple-50/80 to-pink-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md shadow-purple-500/30">
                <Dumbbell className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-slate-900 font-bold text-[17px] tracking-tight">
                  Weekly Workout Schedule
                </h2>
                <p className="text-[14px] text-slate-500 mt-1 font-medium">
                  {completedCount} of {totalCount} sessions completed
                </p>
              </div>
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-500/30 font-semibold px-4 h-10"
              onClick={handleAddWorkout}
            >
              <Sparkles className="w-4 h-4 mr-1.5 stroke-[2.5]" />
              Generate
            </Button>
          </div>
        </div>


        <div className="px-7 pt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] text-slate-600 font-medium">
              Weekly Progress
            </span>
            <span className="text-[14px] font-bold text-slate-900">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2.5 bg-slate-100" />
        </div>


        <div className="px-7 pb-7">
          <div className="space-y-2.5">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className={`flex items-center justify-between rounded-xl border transition-all ${workout.completed
                    ? "bg-purple-50/80 border-purple-200/80 shadow-sm"
                    : workout.activity === "İstirahət Günü"
                      ? "bg-slate-50/50 border-slate-200/80"
                      : "bg-white border-slate-200/80 hover:bg-slate-50/50"
                  }`}
              >
                <div className="flex items-center gap-3.5 flex-1">

                  <div>
                    {workout.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-purple-600 stroke-[2.5]" />
                    ) : workout.activity === "İstirahət Günü" ? (
                      <div className="w-5 h-5 rounded-full bg-slate-300"></div>
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 stroke-[2]" />
                    )}
                  </div>

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-[13px] font-bold shadow-sm ${workout.completed
                        ? "bg-gradient-to-br from-purple-600 to-purple-500 text-white"
                        : "bg-slate-100 text-slate-700"
                      }`}
                  >
                    {dayLabels[workout.day]}
                  </div>

                  <div className="flex-1">
                    <div
                      className={`font-semibold text-[15px] ${workout.completed
                          ? "text-slate-900"
                          : "text-slate-700"
                        }`}
                    >
                      {workout.activity}
                    </div>
                    <div className="text-[13px] text-slate-500 mt-1 font-medium">
                      {workout.duration}
                    </div>
                  </div>


                  {!workout.completed &&
                    workout.activity !== "İstirahət Günü" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-purple-600 border-purple-300 hover:bg-purple-50 font-semibold px-4 h-9"
                        onClick={() => handleMarkComplete(workout.id)}
                      >
                        Mark Done
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-5 text-purple-600 hover:bg-purple-50 font-semibold text-[15px] h-11"
          >
            View Full Schedule
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
