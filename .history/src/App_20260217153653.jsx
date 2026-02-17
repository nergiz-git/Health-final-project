
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Layout from './layout/layout';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MedicationsPage from './pages/MedicationsPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import MealPlansPage from './pages/MealPlansPage';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Auth check failed:', err);
          localStorage.removeItem('token');
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

 const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">Yüklənir...</p>
        </div>
      </div>
    );
  }

//   return (
//     <Router>
//       <Routes>

//         <Route
//           path="/login"
//           element={
//             user ? (
//               <Navigate to="/home" replace />
//             ) : (
//               <LoginPage onLogin={handleLogin} />
//             )
//           }
//         />


//         <Route
//           path="/register"
//           element={
//             user ? (
//               <Navigate to="/home" replace />
//             ) : (
//               <RegisterPage />
//             )
//           }
//         />

//         <Route
//           path="/reset-password"
//           element={<ResetPasswordPage />}
//         />


//         <Route
//           path="/"
//           element={
//             user ? (
//               <Layout user={user} onLogout={handleLogout} 
//                 onUpdateUser={handleUpdateUser}
//               />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         >
//           <Route path="home" element={<Home user={user} />} />
//           <Route index element={<Navigate to="home" replace />} />
//         </Route>
//   <Route
//   path="/"
//   element={
//     user ? (
//       <Layout 
//         user={user} 
//         onLogout={handleLogout} 
//         onUpdateUser={handleUpdateUser}
//       />
//     ) : (
//       <Navigate to="/login" replace />
//     )
//   }
// >
//   <Route index element={<Navigate to="home" replace />} />

//   <Route path="home" element={<Home user={user} />} />
//   <Route path="medications" element={<MedicationsPage/>} />
// </Route>


//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }
return (
  <Router>
    <Routes>

      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/register"
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />

      {/* 🔐 PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          user ? (
            <Layout
              user={user}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* default → /home */}
        <Route index element={<Navigate to="home" replace />} />

        {/* pages */}
        <Route path="home" element={<Home user={user} />} />
        <Route path="medications" element={<MedicationsPage />} />
        <Route path="meal-plans" element={<MealPlansPage/>} />
        <Route path="workouts" element={<WorkoutsPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  </Router>
);
}

export default App;