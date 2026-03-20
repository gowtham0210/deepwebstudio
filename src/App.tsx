import { useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProcessSection from './components/ProcessSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import WorkSection from './components/WorkSection';

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <TestimonialsSection />
      <ProcessSection />
      <WhyChooseUsSection />
    </div>
  );
}

export default App;
