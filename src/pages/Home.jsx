
// export default function Home({ setIsAuth }) {
//   const handleLogout = () => {
//     localStorage.removeItem("user"); 
//     setIsAuth(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-slate-50">

//     </div>
//   );
// }



// import  NewsCard  from '../pages/NewsCard';
// import { useApp } from '../contexts/AppContext';
// import { Pill, UtensilsCrossed, Dumbbell, Clock, CheckCircle2 } from 'lucide-react';
// import medicalBackground from '../assets/images/DashboardPage.png';

// function DashboardPage({ user }) {
//   const { medications, workouts, mealPlan } = useApp();

//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const today = daysOfWeek[new Date().getDay()];

//   const todayMeals = mealPlan?.[today];
//   const todayWorkout = workouts?.find(w => w.day === today);

//   const notifications = [];

//   // ================= MEDICATIONS =================
//   medications?.forEach((med) => {
//     const descriptionParts = [];

//     if (med.frequency) descriptionParts.push(med.frequency);
//     if (med.intakeCondition) descriptionParts.push(med.intakeCondition);
//     if (med.notes) descriptionParts.push(med.notes);

//     const description =
//       descriptionParts.length > 0
//         ? descriptionParts.join(' • ')
//         : 'Dərman xatırlatması';

//     notifications.push({
//       id: `med-${med.id}`,
//       time: med.time,
//       type: 'medication',
//       icon: Pill,
//       iconBg: 'bg-blue-100',
//       iconColor: 'text-blue-600',
//       title: `${med.name} - ${med.dosage}`,
//       description,
//     });
//   });

//   // ================= MEALS =================
//   if (todayMeals) {
//     notifications.push({
//       id: 'breakfast',
//       time: todayMeals.breakfastTime,
//       type: 'meal',
//       icon: UtensilsCrossed,
//       iconBg: 'bg-amber-100',
//       iconColor: 'text-amber-600',
//       title: 'Səhər Yeməyi',
//       description: todayMeals.breakfast,
//     });

//     notifications.push({
//       id: 'lunch',
//       time: todayMeals.lunchTime,
//       type: 'meal',
//       icon: UtensilsCrossed,
//       iconBg: 'bg-orange-100',
//       iconColor: 'text-orange-600',
//       title: 'Nahar',
//       description: todayMeals.lunch,
//     });

//     notifications.push({
//       id: 'dinner',
//       time: todayMeals.dinnerTime,
//       type: 'meal',
//       icon: UtensilsCrossed,
//       iconBg: 'bg-emerald-100',
//       iconColor: 'text-emerald-600',
//       title: 'Axşam Yeməyi',
//       description: todayMeals.dinner,
//     });
//   }

//   // ================= WORKOUT =================
//   if (todayWorkout) {
//     notifications.push({
//       id: 'workout',
//       time: todayWorkout.recommendedTime,
//       type: 'workout',
//       icon: Dumbbell,
//       iconBg: 'bg-purple-100',
//       iconColor: 'text-purple-600',
//       title: todayWorkout.activity,
//       description: todayWorkout.duration,
//     });
//   }

//   // ================= TIME PARSER =================
//   const parseTime = (timeStr) => {
//     if (!timeStr) return 0;

//     const [time, period] = timeStr.split(' ');
//     const [hours, minutes] = time.split(':').map(Number);

//     let hour24 = hours;

//     if (period === 'PM' && hours !== 12) hour24 += 12;
//     if (period === 'AM' && hours === 12) hour24 = 0;

//     return hour24 * 60 + minutes;
//   };

//   notifications.sort((a, b) => parseTime(a.time) - parseTime(b.time));

//   const getCurrentTimeInMinutes = () => {
//     const now = new Date();
//     return now.getHours() * 60 + now.getMinutes();
//   };

//   const currentTime = getCurrentTimeInMinutes();

//   return (
//     <div className="max-w-[1600px] mx-auto py-10 relative">
//       {/* Background */}
//       <div
//         className="fixed inset-0 opacity-25 pointer-events-none"
//         style={{
//           backgroundImage: `url(${medicalBackground})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           zIndex: 0,
//         }}
//       />

//       <div className="relative z-10">
//         {/* Title */}
//         <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
//           <h1 className="text-slate-900 mb-2 !text-[28px] font-bold tracking-tight">
//             Ana Səhifə
//           </h1>
//           <p className="text-slate-500 text-[14px]">
//             Bu gün üçün sağlamlıq xülasəniz.
//           </p>
//         </div>

//         {/* Schedule */}
//         <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
//           <h2 className="text-slate-900 text-[20px] font-bold mb-6">
//             Bu Günün Cədvəli - {today}
//           </h2>

//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
//             {notifications.length === 0 ? (
//               <p className="text-slate-500 text-[14px] text-center py-8">
//                 Bu gün üçün bildiriş yoxdur
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {notifications.map((notification) => {
//                   const IconComponent = notification.icon;
//                   const notificationTime = parseTime(notification.time);
//                   const isCompleted = notificationTime < currentTime;

//                   return (
//                     <div
//                       key={notification.id}
//                       className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
//                         isCompleted
//                           ? 'border-slate-200/60 bg-slate-50/40'
//                           : 'border-slate-200/80 hover:border-slate-300/80 hover:shadow-sm'
//                       }`}
//                     >
//                       <div
//                         className={`p-2.5 ${notification.iconBg} rounded-lg shrink-0 ${
//                           isCompleted ? 'opacity-60' : ''
//                         }`}
//                       >
//                         <IconComponent
//                           className={`w-5 h-5 ${notification.iconColor}`}
//                         />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div
//                           className={`font-semibold text-[15px] mb-0.5 ${
//                             isCompleted
//                               ? 'text-slate-500'
//                               : 'text-slate-900'
//                           }`}
//                         >
//                           {notification.title}
//                         </div>
//                         <div
//                           className={`text-[14px] leading-relaxed ${
//                             isCompleted
//                               ? 'text-slate-400'
//                               : 'text-slate-600'
//                           }`}
//                         >
//                           {notification.description}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3 shrink-0">
//                         <div
//                           className={`flex items-center gap-1.5 ${
//                             isCompleted
//                               ? 'text-slate-400'
//                               : 'text-slate-500'
//                           }`}
//                         >
//                           <Clock className="w-4 h-4" />
//                           <span className="text-[13px] font-semibold">
//                             {notification.time}
//                           </span>
//                         </div>

//                         {isCompleted ? (
//                           <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
//                             <CheckCircle2 className="w-4 h-4" />
//                             <span className="text-[12px] font-semibold">
//                               Göndərilib
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
//                             <Clock className="w-4 h-4" />
//                             <span className="text-[12px] font-semibold">
//                               Gözləyir
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* News */}
//         <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
//           <h2 className="text-slate-900 text-[20px] font-bold mb-6">
//             Sağlamlıq Xəbərləri
//           </h2>
//           <NewsCard />
//         </div>
//       </div>
//     </div>
//   );
// }


// export default DashboardPage;









import { useState, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import NewsCard from '../pages/NewsCard';
import { Pill, UtensilsCrossed, Dumbbell, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import medicalBackground from '../assets/images/DashboardPage.png';
import { motion } from 'framer-motion';
import MainContext from './context/context';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function DashboardPage() {
  const { user } = useOutletContext();
  const [todaySchedule, setTodaySchedule] = useState(null);
  const [loading, setLoading] = useState(true);
 let { theme } = useContext(MainContext)
  // ✅ Fetch today's schedule from backend
  useEffect(() => {
    fetchTodaySchedule();
  }, []);

  const fetchTodaySchedule = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token);

    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }

    const res = await fetch(`${API_BASE_URL}/home/today`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
const data = await res.json().catch(() => ({}));  // json parsing üçün

if (res.ok) {
  setTodaySchedule(data);
} else {
  // 🔹 Buraya yazırsan
  console.error('Failed to fetch schedule', res.status, data);
  setTodaySchedule({ items: [] });
}
    // const data = await res.json();
    // console.log('TODAY SCHEDULE:', data);

    // if (res.ok) {
    //   setTodaySchedule(data);
    // } else {
    //   console.error('Failed to fetch schedule', data);
    //   setTodaySchedule({ items: [] });
    // }
  } catch (err) {
    console.error('FETCH SCHEDULE ERROR:', err);
    setTodaySchedule({ items: [] });
  } finally {
    setLoading(false);
  }
};

  // ✅ Map backend types to UI configuration
  const getItemConfig = (type) => {
    switch (type) {
      case 'MEDICATION':
        return {
          icon: Pill,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        };
      case 'MEAL':
        return {
          icon: UtensilsCrossed,
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600'
        };
      case 'WORKOUT':
        return {
          icon: Dumbbell,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600'
        };
      default:
        return {
          icon: Clock,
          iconBg: 'bg-slate-100',
          iconColor: 'text-slate-600'
        };
    }
  };

  // ✅ Parse time to minutes (supports both formats)
  const parseTime = (timeStr) => {
    if (!timeStr) return 0;

    // Check if it has AM/PM
    const hasAMPM = timeStr.includes('AM') || timeStr.includes('PM');

    if (hasAMPM) {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;

      return hour24 * 60 + (minutes || 0);
    } else {
      // 24-hour format (e.g., "08:00")
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + (minutes || 0);
    }
  };

  const getCurrentTimeInMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const currentTime = getCurrentTimeInMinutes();

  // ✅ Sort notifications by time
  const notifications = todaySchedule?.items
    ? [...todaySchedule.items].sort((a, b) => parseTime(a.time) - parseTime(b.time))
    : [];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = daysOfWeek[new Date().getDay()];

  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-10">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-slate-600">Yüklənir...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-2 py-6 sm:py-8 lg:py-10 relative" >
      {/* Background */}
      <div
        className="fixed inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url(${medicalBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        {/* Title */}
        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">

          <motion.div
            initial={{ y: -16, opacity: 0 }}       // slide-in-from-top-4 = -16px
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}  // duration-700 = 0.7s
            className="mb-10"
          >
            <h1 className=" mb-2 !text-[22px] !sm:text-[24px] !lg:text-[28px] font-bold tracking-tight">
              Ana Səhifə
            </h1>
            <p className=" !text-[14px] !sm:text-[15px]">
              Bu gün üçün sağlamlıq xülasəniz.
            </p>
          </motion.div>

        </div>

        {/* Schedule */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}       // Tailwind: slide-in-from-bottom-4
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }} // Tailwind duration & delay ilə eyni
        >

          <h2 className=" text-[16px] sm:text-[18px] lg:text-[20px] font-bold mb-4 sm:mb-6">
            Bu Günün Cədvəli - {todaySchedule?.dayOfWeek || today}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 lg:p-6">
            {notifications.length === 0 ? (
              <p className="text-slate-500 text-[14px] text-center py-8">
                Bu gün üçün bildiriş yoxdur
              </p>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification, index) => {
                  const config = getItemConfig(notification.type);
                  const IconComponent = config.icon;
                  const notificationTime = parseTime(notification.time);
                  const isCompleted = notificationTime < currentTime;

                  return (
                    <div
                      key={`${notification.type}-${index}`}
                      className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-4 rounded-xl border transition-all${isCompleted
                        ? 'border-slate-200/60 bg-slate-50/40'
                        : 'border-slate-200/80 hover:border-slate-300/80 hover:shadow-sm'
                        }`}
                    >
                      <div
                        className={`p-2.5 ${config.iconBg} rounded-lg shrink-0 ${isCompleted ? 'opacity-60' : ''
                          }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${config.iconColor}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-semibold text-[15px] mb-0.5 ${isCompleted
                            ? 'text-slate-500'
                            : 'text-slate-900'
                            }`}
                        >
                          {notification.title}
                        </div>
                        {notification.subtitle && (
                          <div
                            className={`text-[14px] leading-relaxed ${isCompleted
                              ? 'text-slate-400'
                              : 'text-slate-600'
                              }`}
                          >
                            {notification.subtitle}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0">
                        <div
                          className={`flex items-center gap-1.5 ${isCompleted
                            ? 'text-slate-400'
                            : 'text-slate-500'
                            }`}
                        >
                          <Clock className="w-4 h-4" />
                          <span className="text-[13px] font-semibold">
                            {notification.time}
                            {notification.endTime && `-${notification.endTime}`}
                          </span>
                        </div>

                        {isCompleted ? (
                          <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-[12px] font-semibold">
                              Göndərilib
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                            <Clock className="w-4 h-4" />
                            <span className="text-[12px] font-semibold">
                              Gözləyir
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>


        </motion.div>

        {/* News */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}      // Tailwind-ın slide-in-from-bottom-4 = 16px
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }} // Tailwind-ın duration-700 & delay-300
          className="mt-8 sm:mt-10"
        >


          <h2 className=" text-[20px] font-bold mb-6">
            Sağlamlıq Xəbərləri
          </h2>
          <NewsCard />

        </motion.div>
      </div>
    </div>
  );
}

export default DashboardPage;