import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Dumbbell, Calendar, Sparkles, Loader2, Trash2 } from "lucide-react";
import { Card } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 function WorkoutsPage() {
  const { user } = useOutletContext();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const days = ["Baz", "Ça.a", "Ça", "Cü.a", "Cü", "Şə", "Ba"];
  const daysEn = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysAz = ["Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə", "Bazar"];
  const getWeekStartDate = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    return monday.toISOString().split("T")[0];
  };
  const today = daysEn[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  useEffect(() => {
    fetchWorkouts();
  }, []);

  
const fetchWorkouts = async () => {
  try {
    const token = localStorage.getItem("token");
    const weekStart = getWeekStartDate();

    const res = await fetch(`${API_BASE_URL}/workouts/ai?weekStart=${weekStart}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setWorkouts(data);
    } else {
      setWorkouts([]);
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
    setWorkouts([]);
  } finally {
    setLoading(false);
  }
};

const handleGenerate = async () => {
  if (!user) {
    alert("User məlumatları tapılmadı!");
    return;
  }

  // if (workouts.length > 0) {
  //   const confirmed = window.confirm("Mövcud məşq planı silinəcək. Yeni plan yaradılsın?");
  //   if (!confirmed) return;

  //   // Əvvəlcə mövcud planı sil
  //   const token = localStorage.getItem("token");
  //   await Promise.all(
  //     workouts.map((workout) =>
  //       fetch(`${API_BASE_URL}/workouts/${workout.id}`, {
  //         method: "DELETE",
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //     )
  //   );
  //   setWorkouts([]);
  // }

  if (workouts.length > 0) {
  const confirmed = window.confirm("Mövcud məşq planı silinəcək. Yeni plan yaradılsın?");
  if (!confirmed) return;

  const token = localStorage.getItem("token");
  const currentWorkouts = [...workouts]; // ← snapshot al
  await Promise.all(
    currentWorkouts.map((workout) =>
      fetch(`${API_BASE_URL}/workouts/${workout.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    )
  );
  setWorkouts([]);
}

  setGenerating(true);

  try {
    const token = localStorage.getItem("token");
    const weekStart = getWeekStartDate();

    // 1️⃣ AI generate başlat
    await fetch(`${API_BASE_URL}/workouts/ai?weekStart=${weekStart}&force=true`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // 2️⃣ 6 saniyə gözlə
    await new Promise((resolve) => setTimeout(resolve, 6000));

    // 3️⃣ Hazır planı gətir
    const res = await fetch(`${API_BASE_URL}/workouts/ai?weekStart=${weekStart}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("AI plan hazır deyil. Yenidən cəhd edin.");

    const data = await res.json();
    setWorkouts(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.dispatchEvent(new CustomEvent("workoutsUpdated")); // ← bunu əlavə edin
    alert("✅ AI tərəfindən yaradılmış məşq planı hazırdır!");
  } catch (err) {
    console.error("❌ AI GENERATE ERROR:", err);
    alert(err.message || "Xəta baş verdi");
  } finally {
    setGenerating(false);
  }
};
const handleDeleteAll = async () => {
  const confirmed = window.confirm("Bütün məşq planını silmək istədiyinizə əminsiniz?");
  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    // Hər workout-u ayrıca sil
    await Promise.all(
      workouts.map((workout) =>
        fetch(`${API_BASE_URL}/workouts/${workout.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );

    setWorkouts([]);
    alert("✅ Məşq planı silindi");
  } catch (err) {
    console.error("DELETE ERROR:", err);
    alert("Silinmə zamanı xəta baş verdi");
  }
};
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
          <p className="text-slate-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4"
        >
          <div className="flex-1">
            <h1 className="!text-2xl sm:text-3xl font-bold ">Məşqlər</h1>
            <p className=" mt-1 text-sm sm:text-base text-slate-400">
              Həftəlik məşq proqramınızı izləyin və aktiv qalın.
            </p>
          </div>
        </motion.div>

      </div>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >

        <Card className="!bg-white backdrop-blur-sm border border-slate-200/80 !p-0 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">

          <div className="px-4 py-4 sm:px-7 sm:py-5 border-b border-slate-100 bg-[#FBF7FF]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl shadow-md">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-slate-900 font-bold text-base sm:text-lg">
                    Həftəlik Məşq Cədvəli
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">
                    Həftə üçün fitness planınız
                  </p>
                </div>
              </div>


              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="flex gap-2 self-end sm:self-auto"
              >
                {workouts.length > 0 && (
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm px-3 sm:px-4 py-2"
                    onClick={handleDeleteAll}
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    <span className="hidden sm:inline">Sil</span>
                  </Button>
                )}

                <Button
                  className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                      <span className="hidden sm:inline">AI Yaradır...</span>
                      <span className="sm:hidden">Yaradır...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      {workouts.length > 0 ? 'Yenilə' : 'Yarat'}
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>


          <div className="p-4 sm:p-7">
            <Tabs defaultValue={today} className="w-full">

              <TabsList className="w-full grid grid-cols-7 gap-0.5 sm:gap-1 mb-4 sm:mb-5 bg-slate-100 p-1 sm:p-1.5 rounded-lg sm:rounded-xl overflow-x-auto">
                {daysEn.map((day, index) => (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className="text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-600 px-1 sm:px-2 py-1.5 sm:py-2"
                  >
                    {days[index]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {daysEn.map((day, index) => {
  // const dayWorkout = workouts[index];
  const dayWorkout = workouts.find(w => w.dayOfWeek === day);


  return (
    <TabsContent key={day} value={day} className="mt-0">
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 * index }}
        className="space-y-3 sm:space-y-4"
      >
        <div
          className={`p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-sm border ${
            dayWorkout?.category === "Rest"
              ? "bg-slate-50/80 border-slate-200/80"
              : "bg-purple-50/80 border-purple-200/80"
          }`}
        >
          <div className="mb-3">
            <h3 className={`font-bold text-base sm:text-lg mb-1`}>
              {dayWorkout?.name || "-"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {dayWorkout?.category || "-"}
            </p>
          </div>

          {dayWorkout && dayWorkout.category !== "Rest" && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <p className="text-slate-500 text-[10px] sm:text-xs mb-1">Müddət</p>
                <p className="text-slate-900 font-bold text-xs sm:text-base">
                  {dayWorkout.durationMinutes ? `${dayWorkout.durationMinutes} dəq` : "-"}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] sm:text-xs mb-1">Kaloriya</p>
                <p className="text-slate-900 font-bold text-xs sm:text-base">
                  {dayWorkout.calories ? `~${dayWorkout.calories} kcal` : "-"}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] sm:text-xs mb-1">Vaxt</p>
                <p className="text-slate-900 font-bold text-xs sm:text-base">
                  {dayWorkout.startTime && dayWorkout.endTime
                    ? `${dayWorkout.startTime}-${dayWorkout.endTime}`
                    : dayWorkout.startTime || "-"}
                </p>
              </div>
            </div>
          )}

          <div className="pt-3 sm:pt-4 border-t border-slate-200">
            <p className="text-slate-500 text-[10px] sm:text-xs mb-2 font-semibold">
              Təlimatlar
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
              {dayWorkout?.instructions || "-"}
            </p>
          </div>
        </div>
      </motion.div>
    </TabsContent>
  );
})}
            </Tabs>
          </div>
        </Card>
      </motion.div>

    </div>
  );
}



export default WorkoutsPage;