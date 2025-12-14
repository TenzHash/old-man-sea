import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Anchor,
  Wind,
  Fish,
  Skull,
  BookOpen,
  ChevronRight,
} from "lucide-react";

// --- Types ---
interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  align?: "left" | "right";
  bgImage?: string;
  cardImageSrc?: string; // --- NEW PROP added here ---
}

// --- Components ---

const ParallaxSection: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  icon,
  align = "left",
  bgImage,
  cardImageSrc, // --- Destructure new prop ---
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Dynamic Background Element */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-20" : "opacity-0"
        }`}
      >
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
      </div>

      <div
        className={`relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        {/* Text Content */}
        <div
          className={`order-2 ${
            align === "right" ? "md:order-1 text-right" : "md:order-2 text-left"
          }`}
        >
          <div
            className={`flex items-center gap-4 mb-6 ${
              align === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <span className="p-3 bg-cyan-900/30 rounded-full text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
              {icon}
            </span>
            <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-500 uppercase">
              {subtitle}
            </h2>
          </div>

          <h3 className="text-4xl md:text-6xl font-black text-white mb-8 font-['Cinzel'] leading-tight">
            {title}
          </h3>

          <div className="text-lg md:text-xl text-slate-400 leading-relaxed space-y-6 font-light">
            {children}
          </div>
        </div>

        {/* Visual/Card */}
        <div
          className={`order-1 ${
            align === "right" ? "md:order-2" : "md:order-1"
          }`}
        >
          <div
            className={`relative group transition-all duration-1000 delay-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="h-64 md:h-96 flex items-center justify-center bg-slate-950/50 rounded-lg overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
                {/* Overlay texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-10 pointer-events-none"></div>

                {/* --- UPDATED LOGIC: Render Image if provided, else render letter --- */}
                {cardImageSrc ? (
                  <img
                    src={cardImageSrc}
                    alt={title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 z-0"
                  />
                ) : (
                  <span className="text-9xl opacity-10 text-white font-['Cinzel'] select-none z-0">
                    {title.charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Home Component ---

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-white">
      {/* Fishing Line Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-cyan-900 z-50 w-full">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0 pointer-events-none"></div>
        {/* --- START OF NEW VIDEO BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
          {/* 1. The Video Layer */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Make sure the src matches where you saved the file in the public folder */}
            <source src="/video/bg.mp4" type="video/mp4" />
          </video>

          {/* 2. Overlay Layer (Important for text readability) */}
          {/* This adds a dark tint so your white text stays readable against the bright sea */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>
        </div>
        {/* --- END OF NEW VIDEO BACKGROUND --- */}

        <div className="z-10 animate-float pointer-events-none select-none">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 font-['Cinzel'] tracking-tighter mix-blend-overlay">
            HEMINGWAY
          </h1>
        </div>

        <div className="z-20 max-w-2xl px-6 relative">
          <p className="text-cyan-500 tracking-[0.5em] text-sm md:text-base font-bold mb-4 uppercase">
            Pulitzer Prize for Fiction, 1953
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-8 font-['Cinzel']">
            The Old Man <br /> and the Sea
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            An epic battle of will between an aging fisherman and the greatest
            catch of his life.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToContent}
              className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Start the Journey
            </button>
            <Link
              to="/story"
              className="group px-8 py-4 bg-transparent border border-cyan-500/30 text-cyan-400 font-bold rounded-full hover:bg-cyan-950/30 hover:border-cyan-400 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Play Story Mode</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ArrowDown className="w-8 h-8 text-cyan-500 animate-bounce mx-auto opacity-50" />
        </div>
      </header>

      {/* Content Sections */}
      <main className="relative">
        {/* Section 1: Santiago */}
        <ParallaxSection
          title="The Fisherman"
          subtitle="Santiago"
          icon={<Anchor className="w-6 h-6" />}
          align="left"
          cardImageSrc="/characters/santiago.png"
          // You can add images to other sections too:
          // cardImageSrc="https://images.unsplash.com/photo-1534567083098-b636dc99b19e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        >
          <p>
            The central character is an old Cuban fisherman named{" "}
            <strong>Santiago</strong>, who has not caught a fish for 84 days.
            The family of his apprentice, Manolin, has forced the boy to leave
            him.
          </p>
          <p className="border-l-2 border-cyan-500 pl-6 italic text-slate-500">
            "Everything about him was old except his eyes and they were the same
            color as the sea and were cheerful and undefeated."
          </p>
        </ParallaxSection>

        {/* Section 2: The Marlin - --- IMAGE ADDED HERE --- */}
        <ParallaxSection
          title="The Giant"
          subtitle="The Antagonist"
          icon={<Fish className="w-6 h-6" />}
          align="right"
          cardImageSrc="/characters/marlin.png" // --- NEW IMAGE PROP ---
        >
          <p>
            Santiago hooks a giant marlin. With all his great experience and
            strength, he struggles with the fish for three days, admiring its
            strength, dignity, and faithfulness to its identity.
          </p>
          <ul className="space-y-4 mt-4">
            <li className="flex items-center gap-3 text-cyan-300">
              <span className="w-12 h-[1px] bg-cyan-500"></span>
              18 Feet Long
            </li>
            <li className="flex items-center gap-3 text-cyan-300">
              <span className="w-12 h-[1px] bg-cyan-500"></span>
              Purple Stripes
            </li>
            <li className="flex items-center gap-3 text-cyan-300">
              <span className="w-12 h-[1px] bg-cyan-500"></span>
              Noble Spirit
            </li>
          </ul>
        </ParallaxSection>

        {/* Section 3: The Sharks */}
        <ParallaxSection
          title="The Loss"
          subtitle="Nature's Cruelty"
          icon={<Skull className="w-6 h-6" />}
          align="left"
          cardImageSrc="/characters/shark.png" //
        >
          <p>
            Santiago's exhausting effort goes for naught. Sharks are drawn to
            the tethered marlin. Although Santiago kills a few, they eat the
            fish, leaving only a skeleton.
          </p>
          <div className="bg-red-950/20 p-6 rounded-xl border border-red-900/30 mt-6">
            <p className="text-red-200/80 text-sm">
              The sharks represent the destructive forces of nature that strip a
              man of his material rewards, but cannot touch his dignity.
            </p>
          </div>
        </ParallaxSection>

        {/* Section 4: Themes */}
        <div className="min-h-[80vh] flex items-center justify-center py-20 bg-gradient-to-b from-slate-950 to-cyan-950/20">
          <div className="text-center max-w-3xl px-6">
            <Wind className="w-12 h-12 text-cyan-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 font-['Cinzel']">
              "Man is not made for defeat."
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-12">
              A man can be destroyed but not defeated. Santiago demonstrates the
              ability of the human spirit to endure hardship and suffering in
              order to win.
            </p>
            <Link
              to="/analysis"
              className="inline-block px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
            >
              Read the Full Analysis
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-600 bg-black border-t border-white/5">
        <p className="text-sm font-['Cinzel']">
          Based on Britannica • Coded with React & Tailwind
        </p>
      </footer>
    </div>
  );
}
