import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import NewsSection from "./components/NewsSection";
import BeginnerSection from "./components/BeginnerSection";
import WeaponsSection from "./components/WeaponsSection";
import TierListSection from "./components/TierListSection";
import DungeonsSection from "./components/DungeonsSection";
import PvpSection from "./components/PvpSection";
import AreaEventsSection from "./components/AreaEventsSection";
import MorphSection from "./components/MorphSection";
import FishingSection from "./components/FishingSection";
import EconomySection from "./components/EconomySection";
import Footer from "./components/Footer";

import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll("section[id]").forEach((section) => {
      section.classList.add("section-hidden");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2 + 1, d: Math.random() * 6,
  }));

  return (
    <div className="min-h-screen bg-[#0a0a12] font-sans relative" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
      {/* Star field background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${star.x}%`, top: `${star.y}%`,
              width: `${star.s}px`, height: `${star.s}px`,
              animation: `star-twinkle ${3 + star.d}s ease-in-out infinite`,
              animationDelay: `${star.d}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        * {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #04040a;
        }
        ::-webkit-scrollbar-thumb {
          background: #3a2a10;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #c9a227;
        }
        ::selection {
          background: rgba(201, 162, 39, 0.3);
          color: #fff;
        }
      `}</style>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <BeginnerSection />
        <WeaponsSection />
        <TierListSection />
        <DungeonsSection />
        <AreaEventsSection />
        <PvpSection />
        <MorphSection />
        <FishingSection />
        <EconomySection />
        <NewsSection />
        <Footer />
      </div>
    </div>
  );
}
