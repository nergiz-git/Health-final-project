// src/pages/context/ThemeToggle.jsx
import { useContext } from "react";

import { FaMoon, FaSun } from "react-icons/fa";
import MainContext from "./context";

export function ThemeToggle() {
  const { theme, setTheme } = useContext(MainContext);

  return (
  <span
  onClick={() => setTheme(!theme)}
  className="fixed top-5 right-[210px] p-3 cursor-pointer"
>
  {theme ? <FaMoon size={18} /> : <FaSun size={18} />}
</span>
  );
}