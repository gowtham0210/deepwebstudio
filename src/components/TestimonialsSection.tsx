import { Star, Play } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    type: 'text',
    author: { name: 'Sarah Jenkins', role: 'CMO at FinTech Scale', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' },
    content: "Deepwebstudio didn't just deliver a beautiful website; they completely overhauled our conversion funnel. We saw a 140% increase in demo bookings within the first 30 days.",
    platform: 'Trustpilot', rating: 5,
  },
  {
    id: 2,
    type: 'text',
    author: { name: 'David Chen', role: 'Founder at CloudSync', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    content: "The level of technical execution and design polish is astonishing. They kept to the rigorous timelines and the final platform was beyond our expectations.",
    platform: 'Clutch', rating: 5,
  },
  {
    id: 3,
    type: 'video',
    author: { name: 'Marcus L.', role: 'CEO at NexusAI' },
    thumbnail: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    type: 'text',
    author: { name: 'Elena Rostova', role: 'E-commerce Dir. at Lumière', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
    content: "Our Shopify store's load time dropped by 60%, and mobile conversions have skyrocketed. An incredibly dependable ally when you need top-tier technical quality.",
    platform: 'Google', rating: 5,
  },
  {
    id: 5,
    type: 'text',
    author: { name: 'James Wilson', role: 'VP Marketing at Streamline', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
    content: "Communication is brilliant, on-time delivery is consistent, and work ethic is unparalleled. They are the rare type of team who actually care about your growth.",
    platform: 'GoodFirms', rating: 5,
  }
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white px-8 lg:px-24 py-32 rounded-b-[40px] z-10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-10 lg:gap-0">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-[54px] font-bold text-gray-900 leading-[1.1] tracking-tight">
              Your dependable ally for <br className="hidden lg:block"/>
              top-tier <span className="inline-flex items-center justify-center align-middle mx-2 bg-pink-100 text-pink-600 rounded-full w-12 h-12 text-2xl">S</span> quality <br className="hidden lg:block"/>
              and punctual delivery.
            </h2>
          </div>
          
          <div className="flex flex-col items-start lg:items-end">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-4xl font-bold text-gray-900">Clutch 5.0</h3>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-gray-500 font-medium">30+ Reviews on Clutch</p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-6">
              {item.type === 'text' ? (
                <div className="bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] cursor-pointer">
                  {/* Author Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={item.author.avatar} 
                      alt={item.author.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{item.author.name}</h4>
                      <p className="text-gray-500 text-sm">{item.author.role}</p>
                    </div>
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-gray-600 leading-relaxed font-medium text-[16px] mb-8">
                    {item.content}
                  </p>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200">
                    <span className="text-gray-600 font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500">★ {item.platform}</span>
                    <span className="text-gray-900 font-bold text-sm">{item.rating}.0 <span className="text-yellow-400">★</span></span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-[480px] rounded-[32px] overflow-hidden group cursor-pointer shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <img 
                    src={item.thumbnail} 
                    alt="Video Testimonial Cover"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <div className="flex items-end justify-between w-full">
                      <div>
                        <h4 className="font-bold text-white text-xl mb-1">{item.author.name}</h4>
                        <p className="text-gray-300 text-sm">{item.author.role}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
