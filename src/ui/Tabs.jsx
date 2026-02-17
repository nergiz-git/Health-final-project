import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export function Tabs({ children, value, defaultValue, onValueChange }) {
  const [active, setActive] = useState(defaultValue || value);

  const changeTab = (val) => {
    setActive(val);
    onValueChange && onValueChange(val);
  };

  return (
    <TabsContext.Provider value={{ active, changeTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ children, value }) {
  const { active, changeTab } = useContext(TabsContext);

  const isActive = active === value;

  return (
    <button
      onClick={() => changeTab(value)}
      className={`!px-2 !py-1 rounded-lg text-sm ${
        isActive ? "!bg-white text-purple-500" : "!bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value }) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div>{children}</div>;
}