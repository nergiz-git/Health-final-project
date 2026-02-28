

import { useEffect, useState } from 'react';
import { X, Mail, Activity, Calendar, User, Weight, Ruler, Heart, AlertCircle, Edit, Save, Camera, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

 function ProfileModal({ isOpen, onClose, user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: user?.fullName || 'Sarah Johnson',
    email: user?.email || 'sarah.johnson@gmail.com',
    dateOfBirth: user?.dateOfBirth || '1985-05-15',
    gender: user?.gender || 'female',
    height: user?.height || 165,
    weight: user?.weight || 68,
    conditionCategory: user?.conditionCategory || 'Diabetes',
    condition: user?.condition || '',
    severity: user?.severity || 'moderate',
    profilePhoto: user?.profilePhoto || '',
  });
  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);
console.log("Token:", localStorage.getItem("token"));

  // const healthConditionCategories = [
  //   'Ürək–damar sistemi',
  //   'Tənəffüs sistemi',
  //   'Endokrin və maddələr mübadiləsi',
  //   'Sinir sistemi',
  //   'Əzələ–skelet sistemi',
  //   'Həzm sistemi (mədə–bağırsaq)',
  //   'İmmun və autoimmun xəstəliklər',
  //   'Psixi pozuntular',
  //   'Qan və qan yaradan orqanlar',
  //   'Böyrək və qaraciyər xəstəlikləri',
  // ];

  // const conditionsByCategory = {
  //   'Ürək–damar sistemi': [
  //     'Arterial hipertenziya',
  //     'İskemik ürək xəstəliyi',
  //     'Ürək çatışmazlığı',
  //     'Aritmiya',
  //     'Ateroskleroz',
  //   ],
  //   'Tənəffüs sistemi': [
  //     'Bronxial astma',
  //     'Xroniki bronxit',
  //     'Xroniki obstruktiv ağciyər xəstəliyi (XOAX)',
  //     'Allergik rinit',
  //   ],
  //   'Endokrin və maddələr mübadiləsi': [
  //     'Şəkərli diabet (I və II tip)',
  //     'Hipotireoz',
  //     'Hipertireoz',
  //     'Piylənmə',
  //     'Metabolik sindrom',
  //   ],
  //   'Sinir sistemi': [
  //     'Epilepsiya',
  //     'Miqren',
  //     'Parkinson xəstəliyi',
  //     'Dağınıq skleroz',
  //   ],
  //   'Əzələ–skelet sistemi': [
  //     'Osteoxondroz',
  //     'Artroz',
  //     'Artrit',
  //     'Revmatoid artrit',
  //     'Osteoporoz',
  //   ],
  //   'Həzm sistemi (mədə–bağırsaq)': [
  //     'Xroniki qastrit',
  //     'Mədə və onikibarmaq bağırsaq xorası',
  //     'Xroniki pankreatit',
  //     'Qıcıqlanmış bağırsaq sindromu',
  //   ],
  //   'İmmun və autoimmun xəstəliklər': [
  //     'Psoriaz',
  //     'Sistem qırmızı qurdeşənəyi',
  //     'Kron xəstəliyi',
  //     'Çölyak xəstəliyi',
  //   ],
  //   'Psixi pozuntular': [
  //     'Depressiv pozuntular',
  //     'Anksiyete pozuntuları',
  //     'Bipolyar pozuntu',
  //   ],
  //   'Qan və qan yaradan orqanlar': [
  //     'Xroniki anemiya',
  //     'Talassemiya',
  //   ],
  //   'Böyrək və qaraciyər xəstəlikləri': [
  //     'Xroniki böyrək çatışmazlığı',
  //     'Xroniki hepatit',
  //     'Qaraciyər sirrozu',
  //   ],
  // };
  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch(`${API_BASE_URL}/conditions`)
    .then(res => res.json())
    .then(data => setCategories(data))
    .catch(err => console.error(err));
}, []);
  // const getAvailableConditions = () => {
  //   if (!editedUser.conditionCategory) return [];
  //   return conditionsByCategory[editedUser.conditionCategory] || [];
  // };
 const getAvailableConditions = () => {
  if (!editedUser.conditionCategory) return [];
  const cat = categories.find(c => c.name === editedUser.conditionCategory);
  return cat?.conditions || [];
};
  if (!isOpen) return null;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('az-AZ', { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric' 
  //   });
  // };
  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};


  const getGenderLabel = (gender) => {
    return gender === 'male' ? 'Kişi' : 'Qadın';
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'mild': return 'Yüngül';
      case 'moderate': return 'Orta';
      case 'severe': return 'Ağır';
      default: return 'Orta';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-700 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'severe': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({
      fullName: user?.fullName || 'Sarah Johnson',
      email: user?.email || 'sarah.johnson@gmail.com',
      dateOfBirth: user?.dateOfBirth || '1985-05-15',
      gender: user?.gender || 'female',
      height: user?.height || 165,
      weight: user?.weight || 68,
      conditionCategory: user?.conditionCategory || 'Diabetes',
      condition: user?.condition || '',
      severity: user?.severity || 'moderate',
      profilePhoto: user?.profilePhoto || '',
    });
  };






    const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Token tapılmadı. Yenidən giriş edin.');
        return;
      }

      // Backend-ə PUT sorğusu göndər
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: editedUser.fullName,
          email: editedUser.email,
          dateOfBirth: editedUser.dateOfBirth,
          gender: editedUser.gender,
          height: editedUser.height,
          weight: editedUser.weight,
          conditionCategory: editedUser.conditionCategory,
          condition: editedUser.condition,
          severity: editedUser.severity,
          profilePhoto: editedUser.profilePhoto
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Profil yenilənmədi');
      }

      const data = await res.json();
      console.log('✅ PROFILE UPDATE SUCCESS:', data);
 localStorage.setItem('userCondition', editedUser.condition);
  onUpdateUser(data.user || editedUser);
      // Parent component-ə yenilənmiş user məlumatlarını göndər
      if (onUpdateUser) {
        onUpdateUser(data.user || editedUser);
      }

      setIsEditing(false);
      alert('Profil uğurla yeniləndi!');

    } catch (err) {
      console.error('❌ PROFILE UPDATE ERROR:', err);
      alert(err.message || 'Profil yenilənmədi');
    }
  };
 
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setEditedUser({ ...editedUser, profilePhoto: '' });
  };

  // const currentData = isEditing ? editedUser : (user || editedUser);
 const currentData = editedUser; 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-5 border-b border-slate-200 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-slate-900">Xəstə Profili</h2>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600 !bg-transparent"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors !bg-transparent"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar and Name Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 ring-4 ring-slate-100 shadow-lg">
                <AvatarImage src={currentData.profilePhoto} alt={currentData.fullName} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-bold text-2xl">
                  {getInitials(currentData.fullName)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  {editedUser.profilePhoto && (
                    <button
                      onClick={handlePhotoRemove}
                      className="!p-2 !bg-red-500 !hover:bg-red-600 !text-white !rounded-full !shadow-lg !transition-colors"
                      title="Şəkli sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <label
                    htmlFor="photo-upload"
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors cursor-pointer"
                    title="Şəkil yüklə"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {currentData.fullName}
            </h3>
            <p className="text-slate-500 text-[15px]">
              {/* {currentData.condition} */}
              {currentData.healthCondition || currentData.condition || "-"}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200"></div>

          {/* Personal Information */}
          <div>
            <h4 className="text-[16px] font-bold text-slate-900 mb-4">Şəxsi Məlumatlar</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Ad və Soyad</div>
                  {isEditing ? (
                    <Input
                      value={editedUser.fullName}
                      onChange={(e) => setEditedUser({ ...editedUser, fullName: e.target.value })}
                      className="text-[14px] font-semibold h-8 px-2 py-1"
                    />
                  ) : (
                    <div className="text-[14px]  font-semibold truncate">
                      {currentData.fullName}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-purple-100 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Email</div>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="text-[14px] font-semibold h-8 px-2 py-1"
                    />
                  ) : (
                    <div className="text-[14px] text-slate-900 font-semibold truncate">
                      {currentData.email}
                    </div>
                  )}
                  
                </div>
              </div>

              {/* Date of Birth */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-pink-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Doğum Tarixi</div>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editedUser.dateOfBirth}
                      onChange={(e) => setEditedUser({ ...editedUser, dateOfBirth: e.target.value })}
                      className="text-[14px] font-semibold h-8 px-2 py-1"
                    />
                  ) : (
                    <div className="text-[14px] text-slate-900 font-semibold">
                      {formatDate(currentData.dateOfBirth)}
                    </div>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-indigo-100 rounded-lg">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Cins</div>
                  {isEditing ? (
                    <select
                      value={editedUser.gender}
                      onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
                      className="w-full text-[14px] font-semibold h-8 px-2 py-1 border border-slate-300 rounded-md bg-white"
                    >
                      <option value="male">Kişi</option>
                      <option value="female">Qadın</option>
                    </select>
                  ) : (
                    <div className="text-[14px] text-slate-900 font-semibold">
                      {getGenderLabel(currentData.gender)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200"></div>

          {/* Physical Metrics */}
          <div>
            <h4 className="text-[16px] font-bold text-slate-900 mb-4">Fiziki Göstəricilər</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Height */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-cyan-100 rounded-lg">
                  <Ruler className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Boy</div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={editedUser.height}
                        onChange={(e) => setEditedUser({ ...editedUser, height: Number(e.target.value) })}
                        className="text-[14px] font-semibold h-8 px-2 py-1 w-20"
                        min="100"
                        max="250"
                      />
                      <span className="text-[14px] text-slate-600">sm</span>
                    </div>
                  ) : (
                    <div className="text-[14px] text-slate-900 font-semibold">
                      {currentData.height} sm
                    </div>
                  )}
                </div>
              </div>

              {/* Weight */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-orange-100 rounded-lg">
                  <Weight className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Çəki</div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={editedUser.weight}
                        onChange={(e) => setEditedUser({ ...editedUser, weight: Number(e.target.value) })}
                        className="text-[14px] font-semibold h-8 px-2 py-1 w-20"
                        min="30"
                        max="300"
                      />
                      <span className="text-[14px] text-slate-600">kq</span>
                    </div>
                  ) : (
                    <div className="text-[14px] text-slate-900 font-semibold">
                      {currentData.weight} kq
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200"></div>

          {/* Health Information */}
          <div>
            <h4 className="text-[16px] font-bold text-slate-900 mb-4">Tibbi Məlumatlar</h4>
            <div className="space-y-4">
              {/* Condition Category */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-green-100 rounded-lg">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Xəstəlik Kateqoriyası</div>
                  {isEditing ? (
                    <select
                      value={editedUser.conditionCategory}
                      onChange={(e) => setEditedUser({ ...editedUser, conditionCategory: e.target.value })}
                      className="w-full text-[14px] font-semibold h-8 px-2 py-1 border border-slate-300 rounded-md bg-white"
                    >
                      {healthConditionCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-[14px] text-slate-900 font-semibold">
                      {currentData.conditionCategory}
                    </div>
                  )}
                </div>
              </div>

              {/* Specific Condition */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-red-100 rounded-lg">
                  <Activity className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Xəstəlik Növü</div>
                  {isEditing ? (
                    // <select
                    //   value={editedUser.condition}
                    //   onChange={(e) => setEditedUser({ ...editedUser, condition: e.target.value })}
                    //   className="w-full text-[14px] font-semibold h-8 px-2 py-1 border border-slate-300 rounded-md bg-white "
                    // >
                    //   {getAvailableConditions().map((condition) => (
                    //     <option key={condition} value={condition}>
                    //       {condition}
                    //     </option>
                    //   ))}
                    // </select>
                    <select
  value={editedUser.condition || editedUser.healthCondition || ""}
  onChange={(e) => setEditedUser({ ...editedUser, condition: e.target.value })}
  className="w-full text-[14px] font-semibold h-8 px-2 py-1 border border-slate-300 rounded-md bg-white"
>
  <option value="">Seçin</option>
  {getAvailableConditions().map((c) => (
    <option key={c.id} value={c.name}>{c.name}</option>
  ))}
</select>
                  ) : (
                    <div className="text-[14px] text-slate-900 font-semibold">
                      {/* {currentData.condition} */}
                      {currentData.healthCondition || currentData.condition || ""}
                    </div>
                  )}
                  
                </div>
              </div>

              {/* Severity */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${isEditing ? 'bg-white border border-slate-200' : 'bg-slate-50'}`}>
                <div className="p-2.5 bg-amber-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-slate-500 font-medium mb-0.5">Vəziyyət</div>
                  {isEditing ? (
                    <select
                      value={editedUser.severity}
                      onChange={(e) => setEditedUser({ ...editedUser, severity: e.target.value })}
                      className="w-full text-[14px] font-semibold h-8 px-2 py-1 border border-slate-300 rounded-md bg-white"
                    >
                      <option value="mild">Yüngül</option>
                      <option value="moderate">Orta</option>
                      <option value="severe">Ağır</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-semibold border ${
                        getSeverityColor(currentData.severity)
                      }`}>
                        {getSeverityLabel(currentData.severity)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveClick}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Dəyişiklikləri Saxla
              </Button>
              <Button
                onClick={handleCancelClick}
                variant="outline"
                className="flex-1 border-slate-300 hover:bg-slate-50"
              >
                Ləğv Et
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;