import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Project Alpha',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Branding', 'Web Design'],
  },
  {
    id: 2,
    name: 'Project Beta',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Web Development', 'UI/UX'],
  },
  {
    id: 3,
    name: 'Project Gamma',
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Branding', 'Strategy'],
  },
  {
    id: 4,
    name: 'Project Delta',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Web Design', 'Web Development'],
  },
  {
    id: 5,
    name: 'Project Epsilon',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['UI/UX', 'Branding'],
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (sectionHeight + windowHeight))
      );

      const maxOffset = 150;
      setParallaxOffset(-scrollProgress * maxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={sectionRef} className="relative bg-white py-32 overflow-hidden min-h-screen">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          zIndex: 0,
        }}
      >
        <h2 className="text-[20vw] font-black text-black leading-none">
          WORK
        </h2>
      </div>

      <div className="relative z-10 px-8 lg:px-16">
        <div className="flex items-center justify-end gap-4 mb-8">
          <button className="px-6 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors">
            View all
          </button>
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="flex-shrink-0 w-[350px] lg:w-[400px] snap-start group"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="bg-white rounded-[20px] overflow-hidden shadow-lg">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-110"
          />
        </div>
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-black mb-3">{project.name}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
