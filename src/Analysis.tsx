import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Feather, Droplets, Sun, Activity } from "lucide-react";

const AnalysisCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="group relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
    <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors h-full">
      <div className="bg-slate-950/50 w-12 h-12 rounded-lg flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 font-['Cinzel']">
        {title}
      </h3>
      <div className="text-slate-400 leading-relaxed space-y-4">{children}</div>
    </div>
  </div>
);

export default function Analysis() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Start at top on load
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 selection:bg-cyan-500 selection:text-white font-['Inter']">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-40">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 hover:border-cyan-500 hover:text-cyan-400 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-wide text-sm">
            RETURN TO SURFACE
          </span>
        </Link>
      </nav>

      {/* Header */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-cyan-500 tracking-[0.4em] text-sm font-bold uppercase mb-6 animate-pulse">
            Literary Critique
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 font-['Cinzel'] leading-tight">
            Themes & <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Interpretation
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            "The Old Man and the Sea contains many of the themes that
            preoccupied Hemingway as a writer and as a man."
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Man vs Nature */}
          <AnalysisCard title="Heroism in Defeat" icon={<Activity />}>
            <p>
              Hemingway was famously fascinated with ideas of men proving their
              worth by facing and overcoming the challenges of nature.
            </p>
            <p>
              Through his struggle, Santiago demonstrates the ability of the
              human spirit to endure hardship and suffering in order to win.
              <span className="text-cyan-400 block mt-2 font-medium">
                "A man can be destroyed but not defeated."
              </span>
            </p>
          </AnalysisCard>

          {/* Card 2: The Style */}
          <AnalysisCard title="The Iceberg Theory" icon={<Feather />}>
            <p>
              The routines of life in a Cuban fishing village are evoked in the
              opening pages with a characteristic "economy of language."
            </p>
            <p>
              The stripped-down existence of the fisherman Santiago is crafted
              in a spare, elemental style that is as eloquently dismissive as a
              shrug of the old man's powerful shoulders.
            </p>
          </AnalysisCard>

          {/* Card 3: Dual Nature */}
          <AnalysisCard title="Cruelty & Beneficence" icon={<Droplets />}>
            <p>
              It is Santiago's deep love and knowledge of the sea, in its
              impassive cruelty and beneficence, that allows him to prevail.
            </p>
            <p>
              The essential physicality of the story—the smells of tar, salt,
              and fish blood—is set against the ethereal qualities of dazzling
              light and water.
            </p>
          </AnalysisCard>

          {/* Card 4: Isolation */}
          <AnalysisCard title="The Empty Arena" icon={<Sun />}>
            <p>
              With age and luck now against him, Santiago knows he must row out{" "}
              <em className="text-white">"beyond all people,"</em> away from
              land and into the Gulf Stream.
            </p>
            <p>
              The drama is played out in an empty arena of sea and sky. The
              narrative constantly tugs, unreeling a little more, and then
              pulling again, all in tandem with the old man's struggle.
            </p>
          </AnalysisCard>
        </div>

        {/* Conclusion Block */}
        <div className="mt-20 relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20"></div>
          <div className="relative p-12 text-center">
            <h2 className="text-3xl font-['Cinzel'] text-white mb-6">
              Critical Reception
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              The novel was an immediate success and came to be regarded as one
              of Hemingway's finest works. It was cited specifically when he won
              the{" "}
              <span className="text-yellow-400 font-bold">
                Nobel Prize for Literature in 1954
              </span>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
