import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { id: 1, title: 'Strategy & Analysis', description: 'We start by understanding your business, your goals, and your market inside out.' },
  { id: 2, title: 'Design & UX', description: 'We breathe life into concepts, creating vibrant, frictionless experiences that captivate.' },
  { id: 3, title: 'Development', description: 'Our engineers build robust, scalable platforms using cutting-edge technical architecture.' },
  { id: 4, title: 'Testing & QA', description: 'Rigorous end-to-end testing ensures a flawless, high-performance user experience globally.' },
  { id: 5, title: 'Launch & Scale', description: 'Deploying your digital asset flawlessly and setting up deep analytics for continuous vertical growth.' },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only apply horizontal scroll pinning on desktop
    if (window.innerWidth < 1024) return;

    const track = document.querySelector('.cards-track') as HTMLElement;
    const trackWrapper = document.querySelector('.track-wrapper') as HTMLElement;
    const cards = gsap.utils.toArray('.process-card');
    
    if (!track || !trackWrapper) return;

    // The distance to translate horizontal is the track's full scrollable width minus the visible wrapper width
    const moveDistance = track.scrollWidth - trackWrapper.clientWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${cards.length * 80}%`, // Timeline runs for 400% of viewport height (smooth scrubbing)
        pin: true,
        scrub: 1,
      }
    });

    // 1. Horizontally pan the track
    tl.to(track, {
      x: -moveDistance,
      ease: 'none',
      duration: 1
    }, 0);

    // 2. Animate the 'S T E P S' letters turning orange sequentially
    tl.to('.step-letter', {
      color: '#FD3F00',
      stagger: 1 / 5, // Divides the 1-second total duration evenly across the 5 letters
      ease: 'power1.inOut',
      duration: 0.2 // It takes 20% of the timeline for a single letter to fully transition
    }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#050505] text-white lg:h-screen flex flex-col lg:flex-row relative z-10 w-full overflow-hidden border-t border-white/5">
      
      {/* Left Column (Pinned Area on Desktop) */}
      <div className="w-full lg:w-[40%] lg:h-full flex flex-col justify-between p-10 lg:p-20 lg:border-r border-white/10 shrink-0 relative overflow-hidden">
        
        {/* Top Header Information */}
        <div className="flex flex-col gap-6 z-10 relative">
          <div className="flex items-center gap-2 text-[#FD3F00] font-mono text-sm tracking-wider uppercase">
            <span>[ Process ]</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
            Our Working<br/>process
          </h2>
          <p className="text-gray-400 text-lg max-w-sm leading-relaxed mt-4">
            We begin by listening, gaining a deep understanding of your goals, audience, and challenges through research and conversation.
          </p>
          <div className="w-3 h-3 rounded-full bg-[#FD3F00] mt-4 shadow-[0_0_15px_#FD3F00]"></div>
        </div>

        {/* Vertical animated 'S T E P S' text (Desktop Only) */}
        <div className="hidden lg:flex flex-col text-[12vw] font-bold leading-[0.8] tracking-tighter uppercase pointer-events-none select-none text-[#1a1a1a] absolute bottom-10 right-10">
          {"steps".split('').map((char, i) => (
            <span key={i} className="step-letter transition-colors duration-300">{char}</span>
          ))}
        </div>
      </div>

      {/* Right Column (Horizontal Track for Desktop) */}
      <div className="track-wrapper hidden lg:flex w-[60%] h-full items-center overflow-hidden">
        <div className="cards-track flex gap-8 pl-12 pr-[15vw] items-center w-max">
          {processSteps.map((step, index) => (
            <div key={step.id} className="process-card w-[450px] bg-[#111111] rounded-[24px] p-12 flex flex-col shrink-0 border border-white/5 hover:bg-[#151515] transition-colors duration-500 shadow-2xl">
              
              {/* Card Header */}
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-medium text-white">Step 0{index + 1}</span>
                  <Sparkles className="text-[#FD3F00] w-6 h-6 fill-[#FD3F00]" />
                </div>
                <div className="flex items-center gap-4 bg-black rounded-full py-2.5 px-5 shadow-sm border border-white/10 cursor-pointer group hover:bg-[#FD3F00] transition-colors duration-300">
                  <span className="text-sm font-medium group-hover:text-black">Explore</span>
                  <div className="border-l border-white/20 pl-4 group-hover:border-black/20">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-black transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <h3 className="text-4xl font-semibold text-white mb-8 tracking-tight">
                {step.title}
              </h3>
              
              <div className="w-full h-px bg-white/10 mb-8"></div>
              
              <p className="text-gray-400 text-xl leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}
        </div>
      </div>

      {/* Mobile Fallback (Vertical Stack) */}
      <div className="lg:hidden w-full flex flex-col gap-6 p-6 sm:p-10 bg-[#050505]">
        {processSteps.map((step, index) => (
          <div key={step.id} className="w-full bg-[#111111] rounded-[24px] p-8 flex flex-col border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xl font-medium text-[#FD3F00]">Step 0{index + 1}</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
            <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
