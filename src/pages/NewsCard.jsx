import { Clock, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../pages/ImageWithFallback";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function NewsCard() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [news, setNews] = useState([]);
 const [savedNews, setSavedNews] = useState([]);
// const token = localStorage.getItem('token');
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/news/load`,{
//   headers: { 'Authorization': `Bearer ${token}` }
// }
      
//     )
    
//       .then((res) => res.json())
//       .then((data) => {
//         setNews(data);
//       })
//       .catch((err) => console.error("Error loading news:", err));
//   }, []);
// useEffect(() => {
//   const token = localStorage.getItem('token');
//   fetch(`${API_BASE_URL}/news/load`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setNews(Array.isArray(data) ? data : []);  // ← bura
//     })
//     .catch((err) => console.error("Error loading news:", err));
// }, []);
// useEffect(() => {
//   fetch(`${API_BASE_URL}/news/load`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   })
//     .then(async (res) => {
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       console.log("News data:", data);
//       setNews(Array.isArray(data) ? data : []);
//     })
//     .catch((err) => {
//       console.error("Error loading news:", err);
//       setNews([]);
//     });
// }, []);

// useEffect(() => {
//   const token = localStorage.getItem('token');

//   fetch(`${API_BASE_URL}/news/load`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   })
//     .then(async (res) => {
//       const data = await res.json().catch(() => ({}));

//       console.log("STATUS:", res.status);
//       console.log("DATA:", data);

//       setNews(Array.isArray(data) ? data : []);
//     })
//     .catch((err) => console.error("Error loading news:", err));
// }, []);
// useEffect(() => {
//   const token = localStorage.getItem('token');

//   fetch(`${API_BASE_URL}/news/load`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   })
//     .then(res => res.json())
//     .then(data => {
//       setNews(Array.isArray(data) ? data : []);
//     })
//     .catch(err => console.error(err));
// }, []);
// useEffect(() => {
//   fetch(`${API_BASE_URL}/news/saved/all`,{
//   headers: { 'Authorization': `Bearer ${token}` }
// })
//     .then((res) => res.json())
//     .then((data) => setSavedNews(data))
//     .catch((err) => console.error(err));
// }, []);
 useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE_URL}/news/load`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error loading news:", err);
        setNews([]);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE_URL}/news/saved/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setSavedNews(data))
      .catch((err) => console.error(err));
  }, []);
  const handleSave = async (item) => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          link: item.link,
          sourceDomain: item.sourceDomain,
          publishedAt: item.publishedAt,
        }),
      });

      if (response.ok) {
        alert("News saved successfully!");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };


const handleDelete = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/news/saved/${id}/delete`,
      {
        method: "POST",
      }
    );

    if (response.ok) {
      setSavedNews((prev) => prev.filter((item) => item.id !== id));
    }
  } catch (error) {
    console.error(error);
  }
};
  const getCategoryColor = (category) => {
    switch (category) {
      case "Health":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Activity":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Mental Health":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Nutrition":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "Lifestyle":
        return "bg-pink-50 text-pink-700 border border-pink-200";
      case "General":
        return "bg-slate-50 text-slate-700 border border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  // const visibleNews = news.slice(0, visibleCount);
  
const visibleNews = news.slice(0, visibleCount);
  return (
    <div>
      
    {news.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {/* <div className="text-5xl mb-4">📰</div> */}
        <h3 className="text-slate-700 font-semibold text-[30px] mb-2">Aktual xəbərlər yoxdur!</h3>
        {/* <p className="text-slate-500 text-sm">Hal-hazırda göstəriləcək xəbər tapılmadı.</p> */}
      </div>
    ) : (
      <>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-all group"
          >
            {/* Image */}
            {/* <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              /> */}
              {/* Image */}
<div className="relative h-48 overflow-hidden bg-slate-100">
  <img
    src={item.image || `https://picsum.photos/seed/${encodeURIComponent(item.sourceDomain)}/400/200`}
    alt={item.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    onError={(e) => {
      e.target.src = "https://placehold.co/400x200/e2e8f0/64748b?text=Health+News";
    }}
  />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold backdrop-blur-sm ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
              </div>
            </div>


            <div className="p-5">
              <div className="flex items-center gap-1.5 text-slate-500 text-[13px] mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.time}</span>
              </div>

              <h3 className="text-slate-900 font-bold text-[16px] mb-2 leading-snug line-clamp-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-[14px] mb-4 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-slate-900 font-semibold text-[13px]">
                  {item.source}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSave(item)}
                    className="text-green-600 hover:text-green-700 text-[13px] font-semibold"
                  >
                    Save
                  </button>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[13px] font-semibold"
                  >
                    <span>Read</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < news.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-6 py-3 bg-white border border-slate-300 rounded-xl text-slate-700 font-semibold text-[14px] hover:bg-slate-50 transition-all shadow-sm"
          >
            Show More
          </button>
        </div>
      )}
      
 </>
    )}
    </div>
  );
}


export default NewsCard;