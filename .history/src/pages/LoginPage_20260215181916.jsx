import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, X, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import medicalBg from "../assets/images/medicalBg.png";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (!email || !password) {
      setShowValidationError(true);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Qeydiyyatdan keçin!");
      }

      const data = await res.json();

      if (data.token) localStorage.setItem("token", data.token);

      onLogin(data);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };



  const getInputClassName = (value) => {
    if (!attemptedSubmit)
      return "pl-12 pr-4 py-6 text-[15px] border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";

    return !value
      ? "pl-12 pr-4 py-6 text-[15px] border border-red-500 focus:border-red-500 focus:ring-red-500/30 rounded-xl"
      : "pl-12 pr-4 py-6 text-[15px] border border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";
  };

  const getPasswordInputClassName = (value) => {
    if (!attemptedSubmit)
      return "pl-12 pr-12 py-6 text-[15px] border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";

    return !value
      ? "pl-12 pr-12 py-6 text-[15px] border border-red-500 focus:border-red-500 focus:ring-red-500/30 rounded-xl"
      : "pl-12 pr-12 py-6 text-[15px] border border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 rounded-xl";
  };


  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail) return;

    try {

      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (res.ok) {

        setResetSent(true);
      } else {
        alert(data.message || "Xəta baş verdi!");
      }
    } catch (error) {
      console.error(error);
      alert("Server ilə əlaqə qurulmadı.");
    }
  };


  return (
    
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 relative overflow-hidden">
 

      <style>{`
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
  to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-in-left {
    animation: slideInLeft 0.7s ease-out forwards;
    opacity: 0;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }
`}</style>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${medicalBg})` }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full min-h-screen px-6 lg:px-15 py-12">


        <div className="hidden lg:flex h-full items-center">
          <div className="space-y-10 pr-10 ml-[100px] mt-[100px]">

            <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-2xl">H</span>
              </div>
              <span className="font-bold text-slate-800 text-3xl tracking-tight">
                Health Assistant
              </span>
            </div>

            <div className="space-y-6 animate-slide-in-left" style={{ animationDelay: '0.25s' }}>
              <h1 className="!text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-[#008FA6] bg-clip-text text-transparent">
                  Xroniki xəstəliyinizə süni
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#009888] to-[#00A260] bg-clip-text text-transparent">
                  intellektlə nəzarət
                </span>
              </h1>

              <p className="text-slate-600 text-lg">
                AI ilə təchiz olunmuş sağlamlıq köməkçisi
              </p>
            </div>

            <div className="space-y-5 pt-4 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4 bg-[white] backdrop-blur-md p-5 rounded-2xl shadow-md border border-none w-[600px] xl:w-[450px] 2xl:w-[600px]">
                <span className="text-3xl">💊</span>
                <div>
                  <p className="font-semibold text-slate-800 ">Dərman izləmə</p>
                  <p className="text-slate-500 text-sm">Heç vaxt dozanı qaçırmayın</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[white] backdrop-blur-md p-5 rounded-2xl shadow-md border border-none w-[600px] xl:w-[450px] 2xl:w-[600px]">
                <span className="text-3xl">🥗</span>
                <div>
                  <p className="font-semibold text-slate-800">Qidalanma Planlaması</p>
                  <p className="text-slate-500 text-sm">Sağlam qidalanma sadələşdirildi</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[white] backdrop-blur-md p-5 rounded-2xl shadow-md border border-none w-[600px] xl:w-[450px] 2xl:w-[600px]">
                <span className="text-3xl">💪</span>
                <div>
                  <p className="font-semibold text-slate-800">Məşq Cədvəlləri</p>
                  <p className="text-slate-500 text-sm">Aktiv və sağlam qalın</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full flex flex-col items-center justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-[white] rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 w-full max-w-[520px]">

            <div className="mb-8">
              <h2 className="text-slate-900 text-[28px] font-bold">Xoş Gəlmisiniz</h2>
              <p className="text-slate-600 text-[15px]">Sağlamlıq panelinizə daxil olun</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-2">
                <Label>Email Ünvanı</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="sizin.email@gmail.com "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${getInputClassName(email)} bg-[#F3F3F5] text-slate-500`}
                    required
                  />

                </div>
              </div>

              <div className="space-y-2">
                <Label>Şifrə</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 " />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    className={`${getPasswordInputClassName(password)}  bg-[#F3F3F5] text-slate-500`}
                    required
                  />


                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 !bg-transparent"
                  >
                    {showPassword ? <EyeOff className="w-[18px]" /> : <Eye className="w-[18px]" />}
                  </button>
                </div>
              </div>


              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  />
                  <label htmlFor="remember" className="text-[14px] text-slate-600 font-medium cursor-pointer">
                    Məni xatırla
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-[14px] text-blue-600 hover:text-blue-700 font-semibold !bg-transparent"
                >
                  Şifrəni unutmusunuz?
                </button>
              </div>

              {showValidationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-red-600 text-[13px]">
                    Zəhmət olmasa bütün xanaları doldurun
                  </p>
                </div>
              )}


              <Button
                type="submit"
                className="w-full h-[45px] 
             bg-gradient-to-r from-green-600 to-blue-600 
             hover:from-green-700 hover:to-blue-700
             text- rounded-xl
             shadow-lg hover:shadow-2xl
             transition-all duration-200
             flex items-center justify-center gap-2"
              >
                Daxil ol
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

            </form>

            <div className="relative py-4 mt-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg- text-slate-500">VƏ YA</span>
              </div>
            </div>

            <div className="text-center">
              <p>
                Hesabınız yoxdur?{" "}
                <button type="button"
                  onClick={() => navigate('/register')}
                  className="text-blue-600 font-semibold !bg-transparent">
                  Qeydiyyatdan keçin
                </button>
              </p>
            </div>

          </div>
          <p className="text-center text-[13px] text-slate-500 mt-6">
            Daxil olmaqla siz bizim{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Xidmət Şərtləri
            </a>
            {' '}və{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Məxfilik Siyasəti
            </a>
            {' '}ilə razılaşırsınız
          </p>


        </div>

      </div>


      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[white] rounded-2xl p-10 shadow-2xl shadow-slate-300/50 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900 text-[20px] font-bold">Şifrəni Bərpa Et</h3>
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="resetEmail" className="text-[15px] font-semibold text-slate-700">
                  Email Ünvanı
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="resetEmail"
                    type="email"
                    placeholder="sizin.email@numune.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 text-[15px] border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 rounded-xl outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-[16px] rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                Şifrəni Bərpa Et
                <ArrowRight className="w-5 h-5" />
              </button>
              {resetSent && (
                <div className="mt-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mb-2 mx-auto" />
                  <p className="text-slate-600 text-[14px]">Şifrə bərpa emaili göndərildi!</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;


