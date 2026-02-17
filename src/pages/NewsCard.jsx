import { Clock, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../pages/ImageWithFallback";
import { useState } from "react";

function NewsCard() {
  const [visibleCount, setVisibleCount] = useState(6);


   const news = [
  {
    id: '1',
    title: 'Medication adherence and chronic disease management',
    description: 'Chronic diseases require consistent medication intake to maintain long-term health.',
    source: 'MD1 10',
    time: '4 days ago',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1769699877650-ed81a504aaee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2F0aW9uJTIwcGlsbHMlMjBibGlzdGVyJTIwcGFja3xlbnwxfHx8fDE3NzAwNzQyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Physical activity and hypertension management',
    description: 'Regular physical activity helps reduce blood pressure and maintain cardiovascular health.',
    source: 'MD1 8',
    time: '6 days ago',
    category: 'Activity',
    image: 'https://images.unsplash.com/photo-1525296416200-59aaed194d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGV4ZXJjaXNlJTIwZml0bmVzc3xlbnwxfHx8fDE3NzAwNzQyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Stress management',
    description: 'Daily stress reduction through practical methods can improve your well-being.',
    source: 'MD1 6',
    time: '5 days ago',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1635617240041-c95219c05542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIweW9nYSUyMHN1bnNldHxlbnwxfHx8fDE3NzAwNzQyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'The importance of hydration',
    description: 'Chronic conditions like diabetes benefit from adequate water intake for overall health.',
    source: 'MD1 5',
    time: '3 days ago',
    category: 'General',
    image: 'https://images.unsplash.com/photo-1565256080583-df488fd02195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGdsYXNzJTIwaHlkcmF0aW9ufGVufDF8fHx8MTc3MDAwNjMwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Sleep quality and overall health',
    description: 'Quality sleep strengthens the immune system and supports overall well-being.',
    source: 'MD1 3',
    time: '7 days ago',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1606312704696-23f5d07a6590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlcCUyMHJlc3QlMjBiZWR8ZW58MXx8fHwxNzcwMDc0Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'Healthy eating habits for diabetes',
    description: 'Proper nutrition plays a key role in managing blood sugar levels effectively.',
    source: 'MD1 12',
    time: '2 days ago',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1692780941266-96892bb6c9df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMHNhbGFkfGVufDF8fHx8MTc2OTk1MzE4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    title: 'Regular check-ups and preventive care',
    description: 'Routine medical consultations help catch potential health issues early and maintain wellness.',
    source: 'MD1 15',
    time: '1 day ago',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1758691463606-1493d79cc577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjb25zdWx0YXRpb24lMjBtZWRpY2FsfGVufDF8fHx8MTc3MDAwNTg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    title: 'Walking outdoors',
    description: 'Nature walks provide mental clarity and physical benefits for chronic condition management.',
    source: 'MD1 9',
    time: '8 days ago',
    category: 'Activity',
    image: 'https://images.unsplash.com/photo-1767015708232-c83099c0bd8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxraW5nJTIwbmF0dXJlJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzcwMDc0NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '9',
    title: 'Blood pressure monitoring at home',
    description: 'Regular home monitoring empowers patients to track their cardiovascular health effectively.',
    source: 'MD1 7',
    time: '4 days ago',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1649877510851-10effb9a59b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMHByZXNzdXJlJTIwbW9uaXRvcnxlbnwxfHx8fDE3Njk5NjcwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '10',
    title: 'Vitamin supplements and dietary balance',
    description: 'Understanding which vitamins support your condition can enhance overall health outcomes.',
    source: 'MD1 11',
    time: '9 days ago',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1683394541762-f96c0d03dc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWlucyUyMHN1cHBsZW1lbnRzfGVufDF8fHx8MTc3MDAwNjI1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '11',
    title: 'Digital health tools for chronic disease management',
    description: 'Technology innovations make tracking symptoms and medications easier than ever before.',
    source: 'MD1 14',
    time: '10 days ago',
    category: 'General',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAwNzQ0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '12',
    title: 'Building sustainable healthy habits',
    description: 'Small, consistent lifestyle changes lead to long-term improvements in health management.',
    source: 'MD1 4',
    time: '11 days ago',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1525296416200-59aaed194d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGV4ZXJjaXNlJTIwZml0bmVzc3xlbnwxfHx8fDE3NzAwNzQyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];
    

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

  const visibleNews = news.slice(0, visibleCount);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-all group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-[13px] font-semibold">
                  <span>Read</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
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
    </div>
  );
}


export default NewsCard;