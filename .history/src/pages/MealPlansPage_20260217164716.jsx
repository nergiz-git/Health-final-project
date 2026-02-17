// import { useOutletContext } from "react-router-dom";
// import { useState } from "react";

// import MealPlanCard from "./MealPlanCard";
// import ShoppingListCard from "./ShoppingListCard";
// import EditMealModal from "./EditMealModal";
// import { motion } from "framer-motion";

// function MealPlansPage() {
//   const { user } = useOutletContext();

//   const [mealPlan, setMealPlan] = useState({
//     Mon: {},
//     Tue: {},
//     Wed: {},
//     Thu: {},
//     Fri: {},
//     Sat: {},
//     Sun: {},
//   });
// const [shoppingList, setShoppingList] = useState({});

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedDay, setSelectedDay] = useState("Mon");

//   const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

//   const handleEditClick = (day) => {
//     setSelectedDay(day);
//     setIsEditModalOpen(true);
//   };


//   const updateMealPlan = (day, meal) => {
//     setMealPlan(prev => ({
//       ...prev,
//       [day]: meal,
//     }));
//   };

//   const handleSaveMeal = (day, meal) => {
//     updateMealPlan(day, meal);
//   };

//   return (
//     <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative">
//       <div className="relative z-10">

//        <motion.div
//   initial={{ y: -80, opacity: 0 }}
//   animate={{ y: 0, opacity: 1 }}
//   transition={{ duration: 0.6, ease: "easeOut" }}
//   className="mb-10"
// >
//   <h1 className="!text-xl font-bold">Qidalanma Planları</h1>
//   <p className="!text-slate-500">
//     Həftəlik yeməklərinizi planlayın.
//   </p>
// </motion.div>



//         <div className="!grid !md:grid-cols-2 !xl:grid-cols-2 gap-8 mb-10">
//         <MealPlanCard
//   mealPlan={mealPlan}
//   onEditClick={handleEditClick}
// />

//         </div>

//      <motion.div
//   initial={{ y: 120, opacity: 0 }}
//   animate={{ y: 0, opacity: 1 }}
//   transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
// >
//   <ShoppingListCard shoppingList={shoppingList} />
// </motion.div>



//         <EditMealModal
//           isOpen={isEditModalOpen}
//           onClose={() => setIsEditModalOpen(false)}
//           onSave={handleSaveMeal}
//           initialDay={selectedDay}
//           initialMeal={mealPlan[selectedDay]}
//         />
        
//       </div>
//     </div>
//   );
// }

// export default MealPlansPage;
