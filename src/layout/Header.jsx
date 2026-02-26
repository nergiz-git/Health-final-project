import { Bell, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '../pages/context/ThemeToggle';

export function Header({ user, onLogout }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20  border-b border-slate-200/80 flex items-center justify-between px-8 flex-shrink-0 shadow-sm">

      <div>
        <div className=" text-[14px] font-medium font-bold ">Xoş gəlmisiniz</div>
      </div>


      <div className="flex items-center gap-6">
        

        <div className="flex items-center gap-2 text-[14px] font-medium">
          <ThemeToggle/>
          <Clock className="w-4 h-4 text-blue-600 text-black" />
          <span className="font-semibold">
            {currentTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <div className="text-[14px] font-medium  hidden lg:block ">
          {currentTime.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('.')}
        </div>
      </div>
    </header>
  );
}
