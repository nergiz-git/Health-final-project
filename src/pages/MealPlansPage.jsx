// import { useOutletContext } from "react-router-dom";
// import { useState, useEffect } from "react";
// import MealPlanCard from "./MealPlanCard";
// import ShoppingListCard from "./ShoppingListCard";
// import EditMealModal from "./EditMealModal";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function MealPlansPage() {
//   const { user } = useOutletContext();

//   const [mealPlan, setMealPlan] = useState(null);
//   const [shoppingList, setShoppingList] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedDay, setSelectedDay] = useState("Mon");

//   const getToken = () => localStorage.getItem("token");

//   const getWeekStart = () => {
//     const d = new Date();
//     const day = d.getDay();
//     const diff = d.getDate() - day + (day === 0 ? -6 : 1);
//     const mon = new Date(new Date().setDate(diff));
//     return mon.toISOString().split("T")[0];
//   };

//   // ── GET /meal-plans/current ────────────────────────────────────────
//   const fetchMealPlan = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/meal-plans/current`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (res.ok) setMealPlan(await res.json());
//       else setMealPlan(null);
//     } catch (err) {
//       console.error("FETCH MEAL PLAN ERROR:", err);
//       setMealPlan(null);
//     }
//   };

//   // ── GET /shopping-lists/current ───────────────────────────────────
//   const fetchShoppingList = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/shopping-lists/current`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (res.ok) setShoppingList(await res.json());
//       else setShoppingList(null);
//     } catch (err) {
//       console.error("FETCH SHOPPING LIST ERROR:", err);
//       setShoppingList(null);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       setLoading(true);
//       await Promise.all([fetchMealPlan(), fetchShoppingList()]);
//       setLoading(false);
//     };
//     init();
//   }, []);

//   // ── POST /meal-plans/generate ─────────────────────────────────────
//   const handleGenerate = async () => {
//     setGenerating(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/meal-plans/generate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify({ weekStart: getWeekStart() }),
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.message || "Plan yaradılmadı");
//       }
//       await Promise.all([fetchMealPlan(), fetchShoppingList()]);
//       alert(" Plan hazırlanmadı. AI hələ əlaqələndirilməyib");
//     } catch (err) {
//       console.error("GENERATE ERROR:", err);
//       alert(err.message || "Xəta baş verdi");
//     } finally {
//       setGenerating(false);
//     }
//   };
  

//   // ── PUT /meal-plans/{id} ──────────────────────────────────────────
//   // EditMealModal-dan gələn formData-nı backend formatına çevir
//   const handleSaveMeal = async (dayKey, formData) => {
//     if (!mealPlan?.id) return;

//     const updatedDay = {
//       dayOfWeek: dayKey,
//       meals: [
//         { mealType: "Breakfast", title: formData.breakfast, time: formData.breakfastTime },
//         { mealType: "Lunch",     title: formData.lunch,     time: formData.lunchTime     },
//         { mealType: "Dinner",    title: formData.dinner,    time: formData.dinnerTime    },
//       ],
//     };

//     const existingDays = mealPlan.days || [];
//     const updatedDays = existingDays.some((d) => d.dayOfWeek === dayKey)
//       ? existingDays.map((d) => (d.dayOfWeek === dayKey ? updatedDay : d))
//       : [...existingDays, updatedDay];

//     try {
//       const res = await fetch(`${API_BASE_URL}/meal-plans/${mealPlan.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify({ days: updatedDays }),
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.message || "Yenilənmədi");
//       }
//       await fetchMealPlan();
//     } catch (err) {
//       console.error("UPDATE MEAL ERROR:", err);
//       alert(err.message);
//     }
//   };

//   // ── PUT /shopping-lists/{id}/items ────────────────────────────────
//   const handleUpdateShoppingItems = async (updatedItems) => {
//     if (!shoppingList?.id) return;
//     try {
//       const res = await fetch(
//         `${API_BASE_URL}/shopping-lists/${shoppingList.id}/items`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getToken()}`,
//           },
//           body: JSON.stringify({ items: updatedItems }),
//         }
//       );
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.message || "Yenilənmədi");
//       }
//       await fetchShoppingList();
//     } catch (err) {
//       console.error("UPDATE SHOPPING LIST ERROR:", err);
//       alert(err.message);
//     }
//   };

//   // ── GET /meal-plans/{id}/export ───────────────────────────────────
//   const handleExportMealPlan = async (dayKey = null) => {
//     if (!mealPlan?.id) return alert("Plan mövcud deyil");
//     try {
//       const url = `${API_BASE_URL}/meal-plans/${mealPlan.id}/export${dayKey ? `?day=${dayKey}` : ""}`;
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (!res.ok) throw new Error("İxrac uğursuz oldu");
//       const blob = await res.blob();
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = dayKey ? `meal-plan-${dayKey}.pdf` : "meal-plan-weekly.pdf";
//       link.click();
//     } catch (err) {
//       console.error("EXPORT MEAL PLAN ERROR:", err);
//       alert(err.message);
//     }
//   };

//   // ── GET /shopping-lists/{id}/export ──────────────────────────────
//   const handleExportShoppingList = async (dayKey = null) => {
//     if (!shoppingList?.id) return alert("Siyahı mövcud deyil");
//     try {
//       const url = `${API_BASE_URL}/shopping-lists/${shoppingList.id}/export${dayKey ? `?day=${dayKey}` : ""}`;
//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (!res.ok) throw new Error("İxrac uğursuz oldu");
//       const blob = await res.blob();
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = dayKey ? `shopping-${dayKey}.pdf` : "shopping-weekly.pdf";
//       link.click();
//     } catch (err) {
//       console.error("EXPORT SHOPPING LIST ERROR:", err);
//       alert(err.message);
//     }
//   };

//   const handleEditClick = (day) => {
//     setSelectedDay(day);
//     setIsEditModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
//           <p className="text-slate-600">Yüklənir...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[1600px] mx-auto py-6 sm:py-10 relative">
//       <div className="relative z-10">

//         <motion.div
//           initial={{ y: -80, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-10"
//         >
//           <h1 className="!text-xl font-bold">Qidalanma Planları</h1>
//           <p className="text-slate-400">Həftəlik yeməklərinizi planlayın.</p>
//         </motion.div>

//         <div className="mb-10">
//           <MealPlanCard
//             mealPlan={mealPlan}
//             onEditClick={handleEditClick}
//             onGenerate={handleGenerate}
//             onExport={handleExportMealPlan}
//             generating={generating}
//           />
//         </div>

//         <motion.div
//           initial={{ y: 120, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
//         >
//           <ShoppingListCard
//             shoppingList={shoppingList}
//             onUpdateItems={handleUpdateShoppingItems}
//             onExport={handleExportShoppingList}
//           />
//         </motion.div>

//         <EditMealModal
//           isOpen={isEditModalOpen}
//           onClose={() => setIsEditModalOpen(false)}
//           onSave={handleSaveMeal}
//           initialDay={selectedDay}
//           initialMeal={mealPlan?.days?.find((d) => d.dayOfWeek === selectedDay)}
//         />

//       </div>
//     </div>
//   );
// }

// export default MealPlansPage;





import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import MealPlanCard from "./MealPlanCard";
import ShoppingListCard from "./ShoppingListCard";
import EditMealModal from "./EditMealModal";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function MealPlansPage() {
  const { user } = useOutletContext();

  const [mealPlan, setMealPlan] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [polling, setPolling] = useState(false);  // AI hələ hazır deyil, gözlənilir
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Mon");

  const getToken = () => localStorage.getItem("token");

  const getWeekStart = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const mon = new Date(new Date().setDate(diff));
    return mon.toISOString().split("T")[0];
  };

  // ── GET /meal-plans/current ────────────────────────────────────────
  const fetchMealPlan = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/meal-plans/current`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) setMealPlan(await res.json());
      else setMealPlan(null);
    } catch (err) {
      console.error("FETCH MEAL PLAN ERROR:", err);
      setMealPlan(null);
    }
  };

  // ── GET /shopping-lists/current ───────────────────────────────────
  const fetchShoppingList = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/shopping-lists/current`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) setShoppingList(await res.json());
      else setShoppingList(null);
    } catch (err) {
      console.error("FETCH SHOPPING LIST ERROR:", err);
      setShoppingList(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchMealPlan(), fetchShoppingList()]);
      setLoading(false);
    };
    init();
  }, []);

  // ── GET /meal-plans/ai?weekStart=...&force=true  (ilk trigger) ───
  // ── GET /meal-plans/ai?weekStart=...            (poll, max 6x) ───
  const handleGenerate = async () => {
    setGenerating(true);
    setPolling(false);
    const weekStart = getWeekStart();

    try {
      // 1️⃣ force=true ilə AI-ı başlat
      const triggerRes = await fetch(
        `${API_BASE_URL}/meal-plans/ai?weekStart=${weekStart}&force=true`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      if (!triggerRes.ok) {
        const err = await triggerRes.json();
        throw new Error(err.message || "Plan yaradılmadı");
      }

      const triggerData = await triggerRes.json();

      // Əgər AI dərhal hazır qaytardısa
      if (triggerData?.source === "ai") {
        setMealPlan(triggerData);
        await fetchShoppingListByWeek(weekStart);
        setGenerating(false);
        return;
      }

      // 2️⃣ AI hələ hazır deyil — poll et (hər 3 saniyə, max 6 dəfə)
      setGenerating(false);
      setPolling(true);

      let attempts = 0;
      const maxAttempts = 6;

      const pollInterval = setInterval(async () => {
        attempts++;
        try {
          const pollRes = await fetch(
            `${API_BASE_URL}/meal-plans/ai?weekStart=${weekStart}`,
            { headers: { Authorization: `Bearer ${getToken()}` } }
          );

          if (pollRes.ok) {
            const pollData = await pollRes.json();
            console.log(`POLL #${attempts}:`, pollData?.source);

            if (pollData?.source === "ai") {
              // ✅ AI hazırdır
              clearInterval(pollInterval);
              setPolling(false);
              setMealPlan(pollData);
              await fetchShoppingListByWeek(weekStart);
              return;
            }
          }
        } catch (err) {
          console.error("POLL ERROR:", err);
        }

        // Max cəhd bitdi
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          setPolling(false);
          alert("⚠️ AI planı hazırlamaq üçün vaxt lazımdır. Bir az sonra yenidən cəhd edin.");
        }
      }, 3000); // hər 3 saniyə

    } catch (err) {
      console.error("GENERATE ERROR:", err);
      alert(err.message || "Xəta baş verdi");
      setGenerating(false);
      setPolling(false);
    }
  };

  // ── GET /shopping-lists?weekStart=... ────────────────────────────
  const fetchShoppingListByWeek = async (weekStart) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/shopping-lists?weekStart=${weekStart}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      if (res.ok) setShoppingList(await res.json());
    } catch (err) {
      console.error("FETCH SHOPPING LIST ERROR:", err);
    }
  };

  // ── PUT /meal-plans/{id} ──────────────────────────────────────────
  // EditMealModal-dan gələn formData-nı backend formatına çevir
  const handleSaveMeal = async (dayKey, formData) => {
    if (!mealPlan?.id) return;

    const updatedDay = {
      dayOfWeek: dayKey,
      meals: [
        { mealType: "Breakfast", title: formData.breakfast, time: formData.breakfastTime },
        { mealType: "Lunch",     title: formData.lunch,     time: formData.lunchTime     },
        { mealType: "Dinner",    title: formData.dinner,    time: formData.dinnerTime    },
      ],
    };

    const existingDays = mealPlan.days || [];
    const updatedDays = existingDays.some((d) => d.dayOfWeek === dayKey)
      ? existingDays.map((d) => (d.dayOfWeek === dayKey ? updatedDay : d))
      : [...existingDays, updatedDay];

    try {
      const res = await fetch(`${API_BASE_URL}/meal-plans/${mealPlan.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ days: updatedDays }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Yenilənmədi");
      }
      await fetchMealPlan();
    } catch (err) {
      console.error("UPDATE MEAL ERROR:", err);
      alert(err.message);
    }
  };

  // ── PUT /shopping-lists/{id}/items ────────────────────────────────
  const handleUpdateShoppingItems = async (updatedItems) => {
    if (!shoppingList?.id) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/shopping-lists/${shoppingList.id}/items`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ items: updatedItems }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Yenilənmədi");
      }
      await fetchShoppingList();
    } catch (err) {
      console.error("UPDATE SHOPPING LIST ERROR:", err);
      alert(err.message);
    }
  };

  // ── GET /meal-plans/{id}/export ───────────────────────────────────
  const handleExportMealPlan = async (dayKey = null) => {
    if (!mealPlan?.id) return alert("Plan mövcud deyil");
    try {
      const url = `${API_BASE_URL}/meal-plans/${mealPlan.id}/export${dayKey ? `?day=${dayKey}` : ""}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("İxrac uğursuz oldu");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = dayKey ? `meal-plan-${dayKey}.pdf` : "meal-plan-weekly.pdf";
      link.click();
    } catch (err) {
      console.error("EXPORT MEAL PLAN ERROR:", err);
      alert(err.message);
    }
  };

  // ── GET /shopping-lists/{id}/export ──────────────────────────────
  const handleExportShoppingList = async (dayKey = null) => {
    if (!shoppingList?.id) return alert("Siyahı mövcud deyil");
    try {
      const url = `${API_BASE_URL}/shopping-lists/${shoppingList.id}/export${dayKey ? `?day=${dayKey}` : ""}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("İxrac uğursuz oldu");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = dayKey ? `shopping-${dayKey}.pdf` : "shopping-weekly.pdf";
      link.click();
    } catch (err) {
      console.error("EXPORT SHOPPING LIST ERROR:", err);
      alert(err.message);
    }
  };

  const handleEditClick = (day) => {
    setSelectedDay(day);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
          <p className="text-slate-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto py-6 sm:py-10 relative">
      <div className="relative z-10">

        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="!text-xl font-bold">Qidalanma Planları</h1>
          <p className="text-slate-400">Həftəlik yeməklərinizi planlayın.</p>
        </motion.div>

        <div className="mb-10">
          <MealPlanCard
            mealPlan={mealPlan}
            onEditClick={handleEditClick}
            onGenerate={handleGenerate}
            onExport={handleExportMealPlan}
            generating={generating}
            polling={polling}
          />
        </div>

        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <ShoppingListCard
            shoppingList={shoppingList}
            onUpdateItems={handleUpdateShoppingItems}
            onExport={handleExportShoppingList}
          />
        </motion.div>

        <EditMealModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveMeal}
          initialDay={selectedDay}
          initialMeal={mealPlan?.days?.find((d) => d.dayOfWeek === selectedDay)}
        />

      </div>
    </div>
  );
}

export default MealPlansPage;
