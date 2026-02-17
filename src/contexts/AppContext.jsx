import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

// -------------------- Initial Data --------------------

const initialWorkouts = [
  {
    id: "1",
    day: "Mon",
    activity: "Morning Walk",
    type: "Outdoor • Light",
    duration: "30 min",
    calories: "-150 kcal",
    recommendedTime: "08-10",
    instructions:
      "Take a relaxed walk in the park. Breathe deeply and stay hydrated.",
    completed: false,
  },
  {
    id: "2",
    day: "Tue",
    activity: "Light Yoga",
    type: "Indoor • Light",
    duration: "20 min",
    calories: "-80 kcal",
    recommendedTime: "09-11",
    instructions:
      "Perform basic yoga poses focusing on breathing and flexibility.",
    completed: false,
  },
];

const initialMealPlan = {
  Mon: {
    breakfast: "Yulaf",
    lunch: "Toyuq salatı",
    dinner: "Qızılbalıq",
  },
};

const initialShoppingList = {
  Mon: {
    breakfast: [],
    lunch: [],
    dinner: [],
  },
};

const initialMedications = [
  {
    id: "1",
    name: "Metformin",
    dosage: "500mg",
    time: "08:00",
    status: "taken",
  },
];

// -------------------- Provider --------------------

export function AppProvider({ children }) {
  const [medications, setMedications] = useState(initialMedications);
  const [mealPlan, setMealPlan] = useState(initialMealPlan);
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [shoppingList, setShoppingList] = useState(initialShoppingList);

  // -------------------- Medication --------------------

  const addMedication = (medication) => {
    const newMedication = {
      ...medication,
      id: Date.now().toString(),
    };
    setMedications([...medications, newMedication]);
  };

  const updateMedication = (id, updates) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, ...updates } : med
      )
    );
  };

  const deleteMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const markMedicationAsTaken = (id) => {
    updateMedication(id, { status: "taken" });
  };

  // -------------------- Workout --------------------

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
      completed: false,
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const updateWorkout = (id, updates) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id ? { ...workout, ...updates } : workout
      )
    );
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  const markWorkoutComplete = (id) => {
    updateWorkout(id, { completed: true });
  };

  // -------------------- Shopping --------------------

  const toggleShoppingItem = (day, meal, id) => {
    setShoppingList({
      ...shoppingList,
      [day]: {
        ...shoppingList[day],
        [meal]: shoppingList[day][meal].map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        ),
      },
    });
  };

  const addShoppingItem = (day, meal, item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      checked: false,
    };

    setShoppingList({
      ...shoppingList,
      [day]: {
        ...shoppingList[day],
        [meal]: [...shoppingList[day][meal], newItem],
      },
    });
  };

  const deleteShoppingItem = (day, meal, id) => {
    setShoppingList({
      ...shoppingList,
      [day]: {
        ...shoppingList[day],
        [meal]: shoppingList[day][meal].filter(
          (item) => item.id !== id
        ),
      },
    });
  };

  const value = {
    medications,
    addMedication,
    updateMedication,
    deleteMedication,
    markMedicationAsTaken,
    mealPlan,
    setMealPlan,
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    markWorkoutComplete,
    shoppingList,
    toggleShoppingItem,
    addShoppingItem,
    deleteShoppingItem,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// -------------------- Hook --------------------

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
