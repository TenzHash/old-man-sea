import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";

// --- Types ---
type Speaker = "Santiago" | "Manolin" | "Narrator" | "The Marlin";

interface DialogueLine {
  id: number;
  speaker: Speaker;
  text: string;
  effect?: "shake" | "fade" | "normal";
}

interface Scene {
  id: string;
  title: string;
  day: string;
  audio: string;
  background: string;
  dialogues: DialogueLine[];
}

// --- Assets ---
const characterImages: Record<Speaker, string> = {
  Santiago: "/characters/santiago.png",
  Manolin: "/characters/manolin.png",
  "The Marlin": "/characters/marlin.png",
  Narrator: "/characters/narrator.png",
};

// --- Content Data ---
const scenes: Scene[] = [
  {
    id: "intro",
    title: "The Boy and the Old Man",
    day: "Day 1 - The Shack",
    background: "bg-gradient-to-b from-slate-800 to-slate-900",
    audio: "/audio/calm.mp3",
    dialogues: [
      {
        id: 1,
        speaker: "Narrator",
        text: "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish.",
        effect: "normal",
      },
      {
        id: 2,
        speaker: "Manolin",
        text: "Santiago, I could go with you again. We've made some money.",
        effect: "normal",
      },
      {
        id: 3,
        speaker: "Santiago",
        text: "No. You are with a lucky boat. Stay with them.",
        effect: "normal",
      },
      {
        id: 4,
        speaker: "Manolin",
        text: "But remember how you went eighty-seven days without fish and then we caught big ones every day for three weeks.",
        effect: "normal",
      },
      {
        id: 5,
        speaker: "Santiago",
        text: "I remember. I know you did not leave me because you doubted.",
        effect: "normal",
      },
    ],
  },
  {
    id: "hooking",
    title: "The Great Catch",
    day: "Day 2 - The Deep Sea",
    audio: "/audio/calm2.mp3",
    background: "bg-gradient-to-b from-sky-900 to-blue-950",
    dialogues: [
      {
        id: 1,
        speaker: "Narrator",
        text: "The boat began to move slowly off towards the North-West. The fish was moving steadily and they travelled slowly on the calm water.",
        effect: "normal",
      },
      {
        id: 2,
        speaker: "Santiago",
        text: "He is a big one. I must keep him tight, but not too tight.",
        effect: "normal",
      },
      {
        id: 3,
        speaker: "The Marlin",
        text: "*The line goes taut, vibrating with immense power against the old man's back*",
        effect: "shake",
      },
      {
        id: 4,
        speaker: "Santiago",
        text: "Fish, I love you and respect you very much. But I will kill you dead before this day ends.",
        effect: "normal",
      },
    ],
  },
  {
    id: "battle",
    title: "Brotherhood & Pain",
    day: "Day 3 - Exhaustion",
    audio: "/audio/thrill.mp3",
    background: "bg-gradient-to-b from-indigo-950 to-black",
    dialogues: [
      {
        id: 1,
        speaker: "Santiago",
        text: "I am tired, old fish. You are tired too.",
        effect: "normal",
      },
      {
        id: 2,
        speaker: "Santiago",
        text: "You are killing me, fish. But you have a right to. Never have I seen a greater, or more beautiful, or a calmer or more noble thing than you, brother.",
        effect: "normal",
      },
      {
        id: 3,
        speaker: "Santiago",
        text: "Come on and kill me! I do not care who kills who!",
        effect: "shake",
      },
      {
        id: 4,
        speaker: "Narrator",
        text: "He summoned all his pain and what strength he had left and he put it against the fish's agony.",
        effect: "normal",
      },
    ],
  },
  {
    id: "sharks",
    title: "The Sharks",
    day: "Day 4 - The Loss",
    audio: "/audio/thrill2.mp3",
    background: "bg-gradient-to-b from-red-950 to-slate-900",
    dialogues: [
      {
        id: 1,
        speaker: "Narrator",
        text: "The shark was not an accident. He had come up from deep down in the water as the dark cloud of blood had settled.",
        effect: "normal",
      },
      {
        id: 2,
        speaker: "Santiago",
        text: "Ay. Galanos. Come on then.",
        effect: "normal",
      },
      {
        id: 3,
        speaker: "Narrator",
        text: "He drove his harpoon into the shark's head. The shark rolled over and sank, taking the harpoon with him.",
        effect: "shake",
      },
      {
        id: 4,
        speaker: "Santiago",
        text: "A man can be destroyed but not defeated.",
        effect: "normal",
      },
      {
        id: 5,
        speaker: "Narrator",
        text: "But more came. In the night, he fought them with the tiller until it broke. They ate all the silver flesh, leaving only the white skeleton.",
        effect: "normal",
      },
    ],
  },
  {
    id: "return",
    title: "The Return",
    day: "Day 5 - The Village",
    audio: "/audio/calm.mp3",
    background: "bg-gradient-to-b from-slate-900 to-slate-800",
    dialogues: [
      {
        id: 1,
        speaker: "Narrator",
        text: "He pulled the skiff up on the rocks. He unstepped the mast and furled the sail and tied it. Then he shouldered the mast and started to climb.",
        effect: "normal",
      },
      {
        id: 2,
        speaker: "Narrator",
        text: "The boy saw that the old man was breathing and then he saw the old man's hands and he started to cry.",
        effect: "normal",
      },
      {
        id: 3,
        speaker: "Manolin",
        text: "They beat you, Santiago. They truly beat you.",
        effect: "normal",
      },
      {
        id: 4,
        speaker: "Santiago",
        text: "He didn't beat me. Not the fish. It was afterwards.",
        effect: "normal",
      },
      {
        id: 5,
        speaker: "Manolin",
        text: "Now we fish together again. The hell with luck. I'll bring the luck with me.",
        effect: "normal",
      },
    ],
  },
  {
    id: "dream",
    title: "The Dream",
    day: "Epilogue",
    audio: "/audio/calm.mp3",
    background: "bg-gradient-to-b from-amber-950 to-black",
    dialogues: [
      {
        id: 1,
        speaker: "Narrator",
        text: "Up the road, in his shack, the old man was sleeping again. He was still sleeping on his face and the boy was sitting by him watching him.",
        effect: "normal",
      },
      {
        id: 2,
        speaker: "Narrator",
        text: "The old man was dreaming about the lions.",
        effect: "fade",
      },
      { id: 3, speaker: "Narrator", text: "THE END", effect: "fade" },
    ],
  },
];

// --- Sub-components ---

const Avatar = ({ speaker }: { speaker: Speaker }) => {
  return (
    <div
      className={`
      w-20 h-20 rounded-full border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden bg-slate-900 relative
      ${speaker === "Santiago" ? "border-cyan-400" : ""}
      ${speaker === "Manolin" ? "border-emerald-400" : ""}
      ${speaker === "The Marlin" ? "border-purple-400" : ""}
      ${speaker === "Narrator" ? "border-slate-500" : ""}
    `}
    >
      <img
        src={characterImages[speaker]}
        alt={speaker}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// --- Main Component ---

export default function StoryMode() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);

  // Audio State
  const [isMuted, setIsMuted] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const scene = scenes[currentSceneIdx];
  const currentLine = scene.dialogues[dialogueIdx];

  // 1. Initialize Audio & Load Voices
  useEffect(() => {
    // BG Audio Setup
    bgAudioRef.current = new Audio();
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.3;

    // Load Voices (Browsers load these asynchronously)
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    // Chrome requires this event listener
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // 2. Handle Background Track Switching
  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.src = scene.audio;

      if (!isMuted) {
        const playPromise = bgAudioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [currentSceneIdx, scene.audio, isMuted]);

  // 3. Handle Voice (TTS) - CORRECTED LOGIC
  useEffect(() => {
    window.speechSynthesis.cancel();

    if (!isMuted && availableVoices.length > 0) {
      const utterance = new SpeechSynthesisUtterance(currentLine.text);

      // --- VOICE SELECTION LOGIC ---
      // We try to find a specific voice type, otherwise fallback to default
      const maleVoice = availableVoices.find(
        (v) =>
          v.name.includes("Male") ||
          v.name.includes("David") ||
          v.name.includes("Google US English")
      );
      const femaleVoice = availableVoices.find(
        (v) =>
          v.name.includes("Female") ||
          v.name.includes("Zira") ||
          v.name.includes("Google UK English Female")
      );

      if (currentLine.speaker === "Santiago") {
        // Santiago: Deep, slow, Male voice
        if (maleVoice) utterance.voice = maleVoice;
        utterance.pitch = 0.1;
        utterance.rate = 0.8;
      } else if (currentLine.speaker === "Manolin") {
        // Manolin: Higher pitch (Female voice often sounds like a young boy), faster
        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.pitch = 1.3;
        utterance.rate = 1.1;
      } else if (currentLine.speaker === "Narrator") {
        // Narrator: Neutral/Male standard
        if (maleVoice) utterance.voice = maleVoice;
        utterance.pitch = 1.1;
        utterance.rate = 0.85;
      }

      window.speechSynthesis.speak(utterance);
    }
  }, [currentLine, isMuted, availableVoices]);

  // 4. Toggle Mute Handler
  const toggleMute = () => {
    if (bgAudioRef.current) {
      if (isMuted) {
        bgAudioRef.current.play().catch(() => {});
        setIsMuted(false);
      } else {
        bgAudioRef.current.pause();
        window.speechSynthesis.cancel();
        setIsMuted(true);
      }
    }
  };

  // 5. Typing Effect
  useEffect(() => {
    const fullText = currentLine.text;
    setDisplayedText("");
    setIsTyping(true);

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentLine]);

  // Handlers
  const handleNext = () => {
    if (bgAudioRef.current && bgAudioRef.current.paused && !isMuted) {
      bgAudioRef.current.play().catch(() => {});
    }

    if (isTyping) {
      setDisplayedText(currentLine.text);
      setIsTyping(false);
    } else {
      if (dialogueIdx < scene.dialogues.length - 1) {
        setDialogueIdx((prev) => prev + 1);
      } else if (currentSceneIdx < scenes.length - 1) {
        setCurrentSceneIdx((prev) => prev + 1);
        setDialogueIdx(0);
      }
    }
  };

  const handlePrev = () => {
    if (dialogueIdx > 0) setDialogueIdx((prev) => prev - 1);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 ${scene.background} text-white font-['Inter'] relative overflow-hidden flex flex-col`}
    >
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-6 z-30 bg-gradient-to-b from-black/80 to-transparent">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold text-sm tracking-widest">EXIT STORY</span>
        </Link>

        {/* Title & Audio Toggle */}
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <h2 className="text-xl font-['Cinzel'] font-bold text-cyan-400">
              {scene.title}
            </h2>
            <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">
              {scene.day}
            </p>
          </div>
          <button
            onClick={toggleMute}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5 text-cyan-400" />
            )}
          </button>
        </div>
      </div>

      {/* Visual Stage (Center) - Character Portraits */}
      <div
        className="flex-1 flex items-center justify-center relative z-10 overflow-hidden"
        onClick={handleNext}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

          {/* Active Character Portrait - Big Center Image */}
          <div
            key={currentLine.speaker}
            className="absolute inset-0 flex items-center justify-center animate-fade-in"
          >
            {currentLine.speaker !== "Narrator" && (
              <div className="relative w-full h-full max-w-4xl max-h-[60vh] opacity-40 md:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
                <img
                  src={characterImages[currentLine.speaker]}
                  alt="Character"
                  className="w-full h-full object-contain mix-blend-lighten animate-[pulse_8s_ease-in-out_infinite]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Scene Progress Indicator */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden md:flex">
          {scenes.map((s, idx) => (
            <button
              key={s.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSceneIdx(idx);
                setDialogueIdx(0);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSceneIdx
                  ? "bg-cyan-400 scale-125 shadow-[0_0_10px_#22d3ee]"
                  : "bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dialogue Area (Bottom) */}
      <div className="w-full max-w-4xl mx-auto mb-8 px-6 z-30 relative">
        <div
          className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 pt-10 shadow-2xl relative cursor-pointer group"
          onClick={handleNext}
        >
          {/* Speaker Avatar & Tag */}
          <div className="absolute -top-10 left-8 flex items-end gap-4">
            <Avatar speaker={currentLine.speaker} />
            <div className="mb-4">
              <span
                className={`px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase border shadow-lg
                ${
                  currentLine.speaker === "Narrator"
                    ? "bg-slate-800 text-slate-300 border-slate-600"
                    : "bg-cyan-950 text-cyan-300 border-cyan-500"
                }
              `}
              >
                {currentLine.speaker}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <p
            className={`text-xl md:text-2xl leading-relaxed min-h-[5rem] font-light text-slate-100
            ${
              currentLine.effect === "shake"
                ? "animate-[shake_0.5s_ease-in-out_infinite]"
                : ""
            }
          `}
          >
            {displayedText}
            {!isTyping && (
              <span className="inline-block w-2 h-6 bg-cyan-400 ml-2 animate-pulse align-middle"></span>
            )}
          </p>

          {/* Controls Hint */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
            <span>Click to continue</span>
            <SkipForward className="w-3 h-3" />
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all disabled:opacity-30 border border-white/5"
            disabled={dialogueIdx === 0}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="px-10 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            {dialogueIdx === scene.dialogues.length - 1 &&
            currentSceneIdx === scenes.length - 1
              ? "Replay Story"
              : "Next"}
            {dialogueIdx === scene.dialogues.length - 1 &&
            currentSceneIdx === scenes.length - 1 ? (
              <RotateCcw className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
