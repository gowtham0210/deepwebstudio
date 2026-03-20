import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Website Development',
    tags: ['UI/UX', 'Next.js', 'React'],
    description: 'We build robust, scaling web platforms for ambitious modern brands. Our websites are meticulously engineered for performance and conversion.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#ffffff'
  },
  {
    id: 2,
    title: 'App Development',
    tags: ['iOS', 'Android', 'React Native'],
    description: 'Creating seamless, native-like mobile applications that engage users and deliver premium brand experiences on any device.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#f8fafc'
  },
  {
    id: 3,
    title: 'Brand Strategy',
    tags: ['Identity', 'Positioning', 'Copywriting'],
    description: 'Defining the core of your brand. We craft compelling narratives and visual identities that resonate deeply with your target audience.',
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: '#f1f5f9'
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const titleCard = document.querySelector('.title-card');
    const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
    const arrowIcon = document.querySelector('.arrow-icon');
    
    if (!titleCard || cards.length === 0 || !arrowIcon) return;

    const elements = [titleCard, ...cards];
    
    // Initial states: First service card peeks out from the bottom
    gsap.set(cards[0], { yPercent: 88 }); 
    if (cards.length > 1) {
      gsap.set(cards.slice(1), { yPercent: 100 });
    }

    // Explicitly set the arrow rotation to 180 degrees
    gsap.set(arrowIcon, { rotation: 180 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        scrub: 1,
        pin: true,
      }
    });

    // Arrow rotates perfectly from 180 to 90 across the whole timeline (counter-clockwise direction)
    tl.to(arrowIcon, {
      rotation: 90,
      ease: "none",
      duration: cards.length
    }, 0); // start at 0 so it runs in parallel with the first card animation

    elements.forEach((el, index) => {
      // Shrink current element when the NEXT one comes up.
      // E.g., titleCard (index 0) shrinks down and blurs when card 1 comes up.
      if (index < elements.length - 1) {
        tl.to(el, {
          scale: 0.92,
          opacity: 0.2, // dim heavily for deep stack effect
          filter: "blur(8px)",
          ease: "power1.inOut",
          duration: 1
        }, `step-${index}`);
      }

      // Slide current element UP (only applies to service cards, not the title card)
      if (index > 0) {
        tl.to(el, {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 1
        }, `step-${index - 1}`);
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-black z-10">
      <div className="h-screen w-full relative flex items-end justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        
        {/* Background 'Title Card' - Acts as Card 0 in stack sequence */}
        <div className="title-card absolute inset-0 z-0 flex flex-col justify-center pt-0 px-8 lg:px-24 will-change-transform">
          <div className="flex flex-col text-black font-normal tracking-[-0.05em] mb-32 lg:mb-20">
            <h2 className="text-[14vw] leading-[0.8] text-gray-800">OUR</h2>
            <h2 className="text-[14vw] leading-[0.8] text-gray-800 ml-[10vw] lg:ml-[15vw]">SERVICES</h2>
          </div>
          <ArrowUpRight 
            className="arrow-icon absolute right-10 lg:right-32 top-1/2 -translate-y-1/2 w-24 h-24 lg:w-40 lg:h-40 text-black stroke-[1px] will-change-transform" 
          />
        </div>

        {/* Service Cards */}
        {services.map((service, index) => (
          <div
            key={service.id}
            className="service-card absolute w-[92%] lg:w-[85%] h-[82vh] lg:h-[85vh] rounded-t-[40px] lg:rounded-t-[60px] shadow-[0_-20px_40px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row overflow-hidden will-change-transform"
            style={{ backgroundColor: service.color, zIndex: index + 10 }}
          >
            <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl lg:text-6xl font-bold text-black mb-8">{service.title}</h2>
                <div className="flex flex-wrap gap-3 mb-10">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-5 py-2 border border-black/20 rounded-full text-sm font-medium text-black">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>
              <div className="mt-12 lg:mt-0">
                <button className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  Explore Service
                </button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 h-64 lg:h-full p-4 lg:p-8">
              <div className="w-full h-full rounded-[30px] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
