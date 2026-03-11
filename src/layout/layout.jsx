// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Sidebar from '../layout/Sidebar';
// import { Header } from '../layout/Header';
// import backgroundImage from '../assets/images/DashboardPage.png';
// import ProfileModal from "../pages/ProfileModal";

// // function Layout({ user, onLogout, onUpdateUser }) {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //  const navigate = useNavigate();
// //  const [isProfileOpen, setIsProfileOpen] = useState(false);

// //   const [user, setUser] = useState(null);
// //   const handleToggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <div
// //       className="flex h-screen w-screen"
// //       style={{
// //         backgroundImage: `url(${backgroundImage})`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //         backgroundRepeat: 'no-repeat',
// //       }}
// //     >

// //       <Sidebar
// //         isOpen={isSidebarOpen}
// //         onToggle={handleToggleSidebar}
// //         user={user}
// //         onOpenProfile={() => setIsProfileOpen(true)}
// //         onLogout={onLogout}
// //         onUpdateUser ={onUpdateUser}
// //         currentPage=""
// //         onNavigate={() => { }}
// //       />

// //       <div className="flex-1 flex flex-col overflow-hidden bg-transparent">

// //         <Header user={user} onLogout={onLogout} />


// //         <main className="flex-1 overflow-auto p-4">
// //           <Outlet />
// //         </main>
// //         {/* <ProfileModal
// //   isOpen={isProfileOpen}
// //   onClose={() => setIsProfileOpen(false)}
// //   user={user}
// //    onUpdateUser={(updatedUser) }
// // /> */}
// // <ProfileModal
// //           isOpen={isProfileOpen}
// //           onClose={() => setIsProfileOpen(false)}
// //           user={user}
// //           onUpdateUser={onUpdateUser} // prop vasitəsilə dəyişiklikləri parent-ə göndər
// //         />

// //       </div>
// //     </div>
// //   );
// // }
// function Layout({ user, onLogout, onUpdateUser }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div
//       className="flex h-screen w-full overflow-x-hidden"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onToggle={handleToggleSidebar}
//         user={user}
//         onOpenProfile={() => setIsProfileOpen(true)}
//         onLogout={onLogout}
//         onUpdateUser={onUpdateUser}
//         currentPage=""
//         onNavigate={() => { }}
//       />

//       <div  className={`
//     flex-1 flex flex-col overflow-hidden bg-transparent
//     transition-all duration-300
//     ${isSidebarOpen ? "pl-[260px]" : "pl-[88px]"}
//   `}>
//         <Header user={user} onLogout={onLogout} />

//         {/* <main className="flex-1 overflow-auto p-4">
//           <Outlet/>
//         </main> */}
// {/* <main className="flex-1 overflow-y-auto px-6 py-6">
//   <div className=" w-full p-4 ">
//     <Outlet />
//   </div>
// </main> */}
// <main className="flex-1 py-6">
//   <div className="max-w-[1480px]  w-full">
//     <Outlet context={{ user }} />
//   </div>
// </main>
//         <ProfileModal
//           isOpen={isProfileOpen}
//           onClose={() => setIsProfileOpen(false)}
//           user={user}
//           onUpdateUser={onUpdateUser} // prop vasitəsilə dəyişiklikləri parent-ə göndər
//         />
//       </div>
//     </div>
//   );
// }

// export default Layout;


// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../layout/Sidebar';
// import { Header } from '../layout/Header';
// import backgroundImage from '../assets/images/DashboardPage.png';
// import ProfileModal from "../pages/ProfileModal";

// function Layout({ user, onLogout, onUpdateUser }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       {/* Background */}
//       <div 
//         className="fixed inset-0 -z-10"
//         style={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       />

//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onToggle={handleToggleSidebar}
//         user={user}
//         onOpenProfile={() => setIsProfileOpen(true)}
//         onLogout={onLogout}
//         onUpdateUser={onUpdateUser}
//         currentPage=""
//         onNavigate={() => {}}
//       />

//       {/* Main Content */}
//       <div 
//         className="flex-1 flex flex-col h-full transition-all duration-300"
//         style={{
//           marginLeft: isSidebarOpen ? '260px' : '88px'
//         }}
//       >
//         <Header user={user} onLogout={onLogout} />

//         <main className="flex-1 overflow-y-auto px-6 py-6">
//           {/* ✅ Bu hissə dəyişdi */}
//           <div className="max-w-[1480px] 2xl:max-w-[1620px] w-full mx-auto">
//             <Outlet context={{ user }} />
//           </div>
//         </main>

//         <ProfileModal
//           isOpen={isProfileOpen}
//           onClose={() => setIsProfileOpen(false)}
//           user={user}
//           onUpdateUser={onUpdateUser}
//         />
//       </div>
//     </div>
//   );
// }

// export default Layout;


import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import { Header } from '../layout/Header';
import backgroundImage from '../assets/images/DashboardPage.png';
import ProfileModal from "../pages/ProfileModal";
import { ThemeToggle } from '../pages/context/ThemeToggle';

function Layout({ user, onLogout, onUpdateUser }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsSidebarOpen(false); // 📱 mobile default closed
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    // <div className="flex h-screen w-full overflow-hidden">
    <div className="flex h-screen w-full overflow-hidden ">

      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay (Mobile only) */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onToggle={handleToggleSidebar}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={onLogout}
      />

      {/* Main */}
      <div
        className="flex-1 flex flex-col h-full transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : (isSidebarOpen ? '260px' : '88px')
        }}
      >
        {/* Mobile Hamburger */}
        {isMobile && (
          <div className="p-4">
            <button
              onClick={handleToggleSidebar}
              className="!px-[10px]  rounded-lg bg-white shadow-md"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        )}

        <Header user={user} onLogout={onLogout} />
         <ThemeToggle />

        {/* <main className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-6 py-6">
          <div className="max-w-[1480px] 2xl:max-w-[1620px] w-full mx-auto px-2 sm:px-0"> */}
          <main className="flex-1 overflow-y-auto overflow-hidden py-6">
  <div className="w-full max-w-[1480px] 2xl:max-w-[1620px] mx-auto px-2 sm:px-4 md:px-6">
            <Outlet context={{ user }} />
          </div>
        </main>

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onUpdateUser={onUpdateUser}
        />
      </div>
    </div>
  );
}

export default Layout;
