import medicalBg from "../assets/images/medicalBg.png";
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CheckCircle, Heart, HeartPulse, Ruler, Weight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function RegisterPage({ onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [conditionCategory, setConditionCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [severity, setSeverity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const healthConditionCategories = [
    'Ürək–damar sistemi', 'Tənəffüs sistemi', 'Endokrin və maddələr mübadiləsi',
    'Sinir sistemi', 'Əzələ–skelet sistemi', 'Həzm sistemi (mədə–bağırsaq)',
    'İmmun və autoimmun xəstəliklər', 'Psixi pozuntular',
    'Qan və qan yaradan orqanlar', 'Böyrək və qaraciyər xəstəlikləri'
  ];

  const conditionsByCategory = {
    'Ürək–damar sistemi': ['Arterial hipertenziya', 'İskemik ürək xəstəliyi', 'Ürək çatışmazlığı', 'Aritmiya', 'Ateroskleroz'],
    'Tənəffüs sistemi': ['Bronxial astma', 'Xroniki bronxit', 'XOAX', 'Allergik rinit'],
    'Endokrin və maddələr mübadiləsi': ['Şəkərli diabet', 'Hipotireoz', 'Hipertireoz', 'Piylənmə', 'Metabolik sindrom'],
    'Sinir sistemi': ['Epilepsiya', 'Miqren', 'Parkinson', 'Dağınıq skleroz'],
    'Əzələ–skelet sistemi': ['Osteoxondroz', 'Artroz', 'Artrit', 'Revmatoid artrit', 'Osteoporoz'],
    'Həzm sistemi (mədə–bağırsaq)': ['Xroniki qastrit', 'Xora', 'Pankreatit', 'Qıcıqlanmış bağırsaq'],
    'İmmun və autoimmun xəstəliklər': ['Psoriaz', 'Qurdeşənəyi', 'Kron', 'Çölyak'],
    'Psixi pozuntular': ['Depressiya', 'Anksiyete', 'Bipolyar'],
    'Qan və qan yaradan orqanlar': ['Anemiya', 'Talassemiya'],
    'Böyrək və qaraciyər xəstəlikləri': ['Böyrək çatışmazlığı', 'Hepatit', 'Sirroz']
  };

  const validatePassword = (value) => {
    const hasLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid = hasLength && hasUpper && hasNumber && hasSpecial;
    setPasswordValid(isValid);


    if (isValid) setShowPasswordRules(false);
  };

  const getAvailableConditions = () => conditionCategory ? conditionsByCategory[conditionCategory] || [] : [];
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName,
      email,
      password,
      dateOfBirth,

      gender: gender.toLowerCase(),
      height: Number(height),
      weight: Number(weight),
      conditionId: 1,
      severity: "mild"
    };

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Qeydiyyat uğursuz oldu");
      }

      console.log("REGISTER SUCCESS:", data);

      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert(err.message);
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
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
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${medicalBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/80 to-teal-50/60 backdrop-blur-[2px]" />


      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen px-6 lg:px-16 py-10 items-center gap-12">


        <div className="hidden lg:flex flex-col justify-center space-y-12">


          <div className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">H</span>
            </div>
            <span className="font-bold text-3xl text-slate-800">Health Assistant</span>
          </div>


          <div className="animate-slide-in-left" style={{ animationDelay: '0.25s' }}>
            <h1 className="!text-4xl font-bold leading-tight text-slate-900">
              Səyahətinizə Başlayın
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                Daha Yaxşı Sağlamlığa
              </span>
            </h1>
            <p className="text-slate-600 text-lg mt-6 leading-relaxed">
              Xroniki xəstəliklərini effektiv şəkildə idarə etmək üçün HealthAssist-ə etibar edən minlərlə istifadəçiyə qoşulun.
            </p>
          </div>


          <div className="grid grid-cols-2 gap-5 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-slate-100">
              <p className="text-2xl font-bold bg-gradient-to-br from-teal-600 to-cyan-500 bg-clip-text text-transparent">50K+</p>
              <p className="text-slate-600 mt-1">Aktiv İstifadəçilər</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-slate-100">
              <p className="text-2xl font-bold bg-gradient-to-br from-teal-600 to-cyan-500 bg-clip-text text-transparent">98%</p>
              <p className="text-slate-600 mt-1">Məmnuniyyət Dərəcəsi</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-slate-100">
              <p className="text-2xl font-bold bg-gradient-to-br from-teal-600 to-cyan-500 bg-clip-text text-transparent">24/7</p>
              <p className="text-slate-600 mt-1">Dəstək Mövcuddur</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-md border border-slate-100">
              <p className="text-2xl font-bold bg-gradient-to-br from-teal-600 to-cyan-500 bg-clip-text text-transparent">100%</p>
              <p className="text-slate-600 mt-1">Təhlükəsiz və Məxfi</p>
            </div>
          </div>


          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl border border-teal-100 shadow-sm animate-slide-in-left" style={{ animationDelay: '0.55s' }}>
            <p className="text-slate-700 italic leading-relaxed">
              "HealthAssist diabetimi idarə etmə üsulumu tamamilə dəyişdi. Dərman xatırlatmaları və qidalanma planlaması funksiyaları inanılmaz dərəcədə faydalıdır!"
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                MJ
              </div>
              <div>
                <p className="font-semibold text-slate-800">Mikayıl Cəfərov</p>
                <p className="text-sm text-slate-500">Tip 2 Diabet Xəstəsi</p>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full max-w-[550px] mx-auto animate-fade-in-up overflow-auto max-h-screen lg:overflow-visible lg:max-h-full pb-10 scrollbar-none" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-8 lg:p-10">


            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Hesab Yaradın</h2>
              <p className="text-slate-600 mt-2">Bu gün sağlamlıq səyahətinizə başlayın</p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tam Ad</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-[#F3F3F5] text-slate-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Ünvanı</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="sizin.email@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-[#F3F3F5] text-slate-500"
                    required
                  />
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Doğum Tarixi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    className="w-full pl-12 pr-4  py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-[#F3F3F5] text-slate-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cins</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full h-[60px] pl-12 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer text-slate-500"
                  >
                    <option value="male">Kişi</option>
                    <option value="female">Qadın</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Boy (sm)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">

                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Ruler className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <input
                      type="number"
                      placeholder="165"
                      value={height || ''}
                      onChange={e => setHeight(Number(e.target.value))}
                      className="w-full h-[43px] pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-[#F3F3F5] text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Çəki (kq)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">


                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Weight className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <input
                      type="number"
                      placeholder="68"
                      value={weight || ''}
                      onChange={e => setWeight(Number(e.target.value))}
                      className="w-full h-[43px] pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-[#F3F3F5] text-slate-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Xəstəlik Kateqoriyası</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <select
                    value={conditionCategory}
                    onChange={e => setConditionCategory(e.target.value)}
                    className="w-full h-[60px] pl-12 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer text-slate-500"
                  >
                    <option value="">Xəstəlik kateqoriyanızı seçin</option>
                    {healthConditionCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Xəstəlik Növü</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <select
                    value={condition}
                    onChange={e => setCondition(e.target.value)}
                    className="w-full h-[60px] pl-12 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer text-slate-500"
                    disabled={!conditionCategory}
                  >
                    <option value="">Xəstəliyinizi seçin</option>
                    {getAvailableConditions().map(c => <option key={c} value={c}>{c}</option>)}
                  </select>



                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400 h-[60px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>



              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Xəstəliyin Ağırlıq Dərəcəsi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Heart className="w-5 h-5 text-slate-400" />
                  </div>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value)}
                    className="w-full h-[60px] pl-12 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white appearance-none cursor-pointer text-slate-500"
                  >
                    <option value="">Ağırlıq dərəcəsini seçin</option>
                    <option value="mild">Yüngül</option>
                    <option value="moderate">Orta</option>
                    <option value="severe">Ağır</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Şifrə</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}

                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);

                      if (value.length > 0) {
                        setShowPasswordRules(true);
                      }
                      validatePassword(value);
                    }}
                    className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-[#F3F3F5] text-slate-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors !bg-transparent"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {showPasswordRules && !passwordValid && (
                  <div className=" text-red-500 text-[13px] rounded-xl  mt-4 w-full max-w-[330px]">
                    <p className="font-semibold mb-2">Şifrə aşağıdakı tələblərə cavab verməlidir:</p>

                    <div className="space-y-1 text-red-500">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} />
                        <span>Ən azı 8 simvol</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} />
                        <span>Ən azı bir böyük hərf</span>
                      </div>

                      {/* <div className="flex items-center gap-2">
        <CheckCircle size={14} />
        <span>Ən azı bir rəqəm</span>
      </div> */}

                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} />
                        <span>Ən azı bir xüsusi simvol</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Şifrəni Təsdiqləyin</label>
                <div className="relative ">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-[#F3F3F5] text-slate-500"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors !bg-transparent"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  Mən razıyam{' '}
                  <span className="text-teal-600 hover:text-teal-700 cursor-pointer font-medium">
                    Xidmət Şərtləri
                  </span>
                  {' '}və{' '}
                  <span className="text-teal-600 hover:text-teal-700 cursor-pointer font-medium">
                    Məxfilik Siyasəti
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Hesab Yarat
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">VƏ YA</span>
                </div>
              </div>
              <p className="text-center text-slate-600">
                Artıq hesabınız var?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-teal-600 hover:text-teal-700 font-semibold transition-colors !bg-transparent"
                >
                  Daxil olun
                </button>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RegisterPage;


