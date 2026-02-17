import React from 'react';
import { NavLink } from "react-router-dom";
import { Home, Pill, UtensilsCrossed, Dumbbell, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import sidebarBackground from '../assets/images/DashboardPage.png';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

function Sidebar({ isOpen, onToggle, user, onLogout, currentPage, onNavigate, onOpenProfile,isMobile, }) {
 
  const getInitials = (name = '') => {
  if (!name || typeof name !== 'string') return '';

  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};


  const menuItems = [
  { icon: Home, label: 'Ana Səhifə', path: '/home' },
  { icon: Pill, label: 'Dərmanlar', path: '/medications' },
  { icon: UtensilsCrossed, label: 'Qidalanma Planları', path: '/meal-plans' },
  { icon: Dumbbell, label: 'Məşqlər', path: '/workouts' },
];

const userCondition = user?.condition || localStorage.getItem('userCondition') || 'Xəstəlik seçilməyib';

  return (
    <aside
   
      className={`
        fixed top-0 left-0 h-full z-40
         border-r border-slate-200/80
        transition-all duration-300  ${isMobile ? 'bg-white shadow-xl' : ''}
        ${isMobile
          ? `w-[260px] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
          : `${isOpen ? 'w-[260px]' : 'w-[88px]'}`
        }
      `}

    >
     

      <div className="relative z-10 flex flex-col h-full ">

        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200/80">
          {isOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-[17px]">AI</span>
                </div>
                <span className="font-bold text-slate-800 text-[17px] tracking-tight">Health Assistant</span>
              </div>
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all !bg-transparent"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-[17px]">AI</span>
              </div>
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all"
                title="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

      
{/* <nav className="flex-1 py-8 px-4 overflow-y-auto">
  <ul className="space-y-1.5">
    {menuItems.map((item) => {
      const Icon = item.icon;

      return (
        <li key={item.label}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-700 shadow-sm border border-blue-100'
                  : 'text-slate-800 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Icon className="w-5 h-5 stroke-[2.5]" />
            {isOpen && (
              <span className="text-[15px] font-semibold">
                {item.label}
              </span>
            )}
          </NavLink>
        </li>
      );
    })}
  </ul>
</nav> */}

        <div className="border-t border-slate-200/80 p-4">
          {isOpen ? (
            <div className="space-y-3">
              <button
                onClick={onOpenProfile}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 !bg-transparent transition-all"
              >
                <Avatar className="h-10 w-10 ring-2 ring-slate-100 shadow-sm">
                  <AvatarImage src={user?.profilePhoto || ''} alt={user?.fullName || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-semibold text-[14px]">
                    {user ? getInitials(user.fullName) : 'GU'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[14px] font-semibold text-slate-800 truncate">
                    {user?.fullName || 'Giriş edilmeyib'}
                  </div>
                  <div className="text-[12px] text-slate-500 truncate">
                    {userCondition}
                  </div>
                </div>
              </button>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-800 hover:bg-red-50 hover:text-red-600 transition-all group !bg-transparent"
                >
                  <LogOut className="w-5 h-5 stroke-[2.5]" />
                  <span className="text-[15px] font-semibold">Çıxış</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3 flex flex-col items-center">
              <button
                onClick={onOpenProfile}
                className="w-full flex justify-center hover:opacity-80 transition-opacity"
              >
                <Avatar className="h-10 w-10 ring-2 ring-slate-100 shadow-sm">
                  <AvatarImage src={user?.profilePhoto || ''} alt={user?.fullName || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-semibold text-[14px]">
                    {user ? getInitials(user.fullName) : 'SJ'}
                  </AvatarFallback>
                </Avatar>
              </button>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center p-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
export default Sidebar

