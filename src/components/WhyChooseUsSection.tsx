const cards = [
  {
    number: '01',
    title: 'Creative Web Design',
    description: 'Unlike most agencies, we do not deal with templates. Our creative and seasoned designers craft modern, stunning digital presences. A complete interactive prototype is shared for deep understanding and collaboration.',
    iconColor: 'bg-blue-50 text-blue-500',
  },
  {
    number: '02',
    title: 'Designed for Global Scale',
    description: 'As a premier technical agency, we are well aware of global and localized design trends and standards. It is essential for modern organizations to have a digital presence that perfectly resonates with their ambition.',
    iconColor: 'bg-purple-50 text-purple-500',
  },
  {
    number: '03',
    title: 'SEO & Performance Friendly',
    description: 'Developing a website is just the beginning. SEO-friendly architecture is a necessity in a dynamic digital market. Deepwebstudio specializes in creating platforms that are structurally optimized and blazingly fast.',
    iconColor: 'bg-emerald-50 text-emerald-500',
  },
  {
    number: '04',
    title: 'Bespoke Engineering',
    description: 'Your platform stands as the digital core of your business. Relying on templates negatively affects brand value. We build unique, scalable architectures designed exactly from scratch to represent your unique identity.',
    iconColor: 'bg-orange-50 text-orange-500',
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white py-32 px-8 lg:px-24 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="max-w-3xl mb-24">
           <div className="flex items-center gap-3 text-blue-600 font-mono text-sm tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-[64px] font-bold text-gray-900 tracking-tight leading-[1.05] mb-10">
            Your trusted <br className="hidden lg:block"/>
            Technical Partner.
          </h2>
          <p className="text-gray-500 text-xl leading-relaxed max-w-2xl font-medium">
            Deepwebstudio is passionate about developing and delivering outstanding results. We offer bespoke web designs with the right combinations of creativity, technology, and functionality to help you mark a strong digital presence among your competitors.
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="bg-gray-50 rounded-[32px] p-10 lg:p-14 hover:bg-white transition-all duration-500 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group cursor-default">
              
              <div className="flex items-start justify-between mb-12">
                <span className="text-4xl font-bold text-gray-200 group-hover:text-gray-900 transition-colors duration-500">
                  {card.number}
                </span>
                
                {/* Decorative Abstract Icon Representation */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.iconColor} rotate-3 group-hover:-rotate-12 transition-transform duration-500`}>
                  <div className="w-6 h-6 rounded-full bg-current opacity-80 mix-blend-multiply"></div>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                {card.title}
              </h3>
              
              {/* Animated Divider */}
              <div className="w-12 h-[2px] bg-gray-200 mb-8 group-hover:w-full group-hover:bg-blue-600 transition-all duration-700 ease-out"></div>
              
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                {card.description}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
