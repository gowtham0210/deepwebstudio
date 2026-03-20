import { useState } from 'react';
import ParticleLogo from './ParticleLogo';

export default function HeroSection() {
  const [showCalendly, setShowCalendly] = useState(false);

  const openCalendly = () => {
    setShowCalendly(true);
  };

  const closeCalendly = () => {
    setShowCalendly(false);
  };

  return (
    <section className="relative bg-black text-white overflow-hidden z-20">
      <div className="min-h-screen flex flex-col lg:flex-row pb-[8vw]">
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16 py-20 lg:py-0">
          <div className="max-w-xl">
            <p className="text-white text-xs uppercase tracking-[0.3em] font-light mb-6">
              TOP RATED
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              #1 Award winning Web Agency
            </h1>
            <p className="text-white text-lg mb-8 opacity-60 leading-relaxed">
              Transform your digital presence with cutting-edge design and development solutions that drive results.
            </p>
            <button
              onClick={openCalendly}
              className="bg-[#0000FF] text-white px-8 py-4 font-semibold hover:bg-[#0000CC] transition-colors"
            >
              Book a Free Call
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen">
          <ParticleLogo />
        </div>
      </div>

      {showCalendly && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeCalendly}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCalendly}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <iframe
              src="https://calendly.com/YOUR_CALENDLY_URL"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full overflow-hidden text-white pointer-events-none translate-y-[1px]">
        <svg
          viewBox="0 0 1440 100"
          className="w-full"
          style={{ height: '8vw', minHeight: '60px', maxHeight: '120px' }}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0,100 L1440,100 L1440,0 Q720,200 0,0 Z"
          />
        </svg>
      </div>
    </section>
  );
}
