"use client";

import { useRef, useState } from "react";
import {
  AudioLines,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Heart,
  Languages,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Volume2,
  X,
} from "lucide-react";

const voiceBars = [18, 34, 22, 47, 29, 58, 40, 71, 33, 53, 26, 62, 42, 30, 50, 24, 38, 17, 44, 28, 54, 33, 22, 41, 19, 31, 15, 27];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [icebreaker, setIcebreaker] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [notice, setNotice] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);

  async function toggleRecording() {
    if (isRecording) {
      recorder.current?.stop();
      stream.current?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setNotice("Voice intro saved privately. You can publish it when you are ready.");
      return;
    }

    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder.current = new MediaRecorder(stream.current);
      recorder.current.start();
      setIsRecording(true);
      setNotice("");
    } catch {
      setNotice("Microphone access is needed to record your intro.");
    }
  }

  async function createIcebreaker() {
    setIsThinking(true);
    setIcebreaker("");
    try {
      const response = await fetch("/api/icebreaker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: ["Aarav", "Nitya"], languages: "Telugu-English and Hinglish" }),
      });
      const data = await response.json();
      setIcebreaker(data.icebreaker ?? data.error ?? "Try again in a moment.");
    } catch {
      setIcebreaker("Suno could not create an icebreaker right now.");
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <main className="shell">
      <aside className="rail" aria-label="Primary navigation">
        <div className="brand-mark">s</div>
        <nav>
          <button className="rail-item active" aria-label="Discover"><Compass size={20} /></button>
          <button className="rail-item" aria-label="Matches"><Heart size={20} /></button>
          <button className="rail-item" aria-label="Messages"><MessageCircle size={20} /></button>
        </nav>
        <button className="rail-item bottom" aria-label="Notifications"><Bell size={20} /><span className="notif-dot" /></button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">IIIT Hyderabad · closed community</p>
            <h1>Discover voices</h1>
          </div>
          <div className="header-actions">
            <div className="blind-pill"><LockKeyhole size={14} /> Blind mode on</div>
            <button className="avatar" aria-label="Your profile">A</button>
          </div>
        </header>

        <div className="content-grid">
          <section className="discover-panel">
            <div className="discover-head">
              <div className="filter-row">
                <button className="filter selected">For you</button>
                <button className="filter">Nearby vibes</button>
                <button className="filter">Language match</button>
              </div>
              <button className="quiet-button" aria-label="More filters"><MoreHorizontal size={20} /></button>
            </div>

            <article className="voice-card">
              <div className="card-glow one" />
              <div className="card-glow two" />
              <div className="card-topline">
                <span className="listen-label"><Radio size={14} /> now playing</span>
                <span className="time">0:24</span>
              </div>
              <button className="play-button" onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause voice intro" : "Play voice intro"}>
                {isPlaying ? <Pause fill="currentColor" size={28} /> : <Play fill="currentColor" size={28} />}
              </button>
              <div className="waveform" aria-hidden="true">
                {voiceBars.map((height, index) => <span key={index} className={isPlaying ? "bar moving" : "bar"} style={{ height: `${height}%`, animationDelay: `${index * 0.04}s` }} />)}
              </div>
              <p className="intro-quote">“I will defend the pineapple on pizza people, but only over a chai at Nilgiri.”</p>
              <div className="person-line">
                <div><h2>Nitya, 21</h2><p>ECE · Old hostel</p></div>
                <button className="small-play" onClick={() => setIsPlaying(!isPlaying)}><Volume2 size={17} /> Replay</button>
              </div>
              <div className="language-chips">
                <span><Languages size={14} /> Telugu · English</span>
                <span className="warm-chip">Night owl</span>
                <span className="warm-chip">Felicity core</span>
              </div>
            </article>

            <div className="action-row">
              <button className="round-action" onClick={() => setIsPlaying(false)} aria-label="Skip"><X size={25} /></button>
              <button className="round-action replay" onClick={() => setIsPlaying(!isPlaying)} aria-label="Replay"><RotateCcw size={20} /></button>
              <button className="connect-button" onClick={() => setShowMatch(true)}><Heart fill="currentColor" size={20} /> Connect</button>
              <button className="round-action" aria-label="Save for later"><Sparkles size={21} /></button>
            </div>
            <p className="reversible-note"><ShieldCheck size={15} /> Your interest is private until it is mutual.</p>

            <section className="record-cta">
              <div className="record-icon"><Mic size={20} /></div>
              <div><h3>Let people hear you</h3><p>A 30 second intro goes further than a perfect bio.</p></div>
              <button onClick={() => setShowRecorder(true)}>Record mine <ChevronRight size={16} /></button>
            </section>
          </section>

          <aside className="side-panel">
            <section className="match-card">
              <div className="match-header"><span className="tiny-label">YOUR VIBE SYNC</span><Sparkles size={18} /></div>
              <div className="score-wrap"><div className="score-ring"><strong>92</strong><span>%</span></div><div><h3>Easy conversation</h3><p>You both switch naturally between English and your home language.</p></div></div>
              <div className="match-reasons">
                <div><span className="reason-dot green" /><p><b>Language rhythm</b><br />Telugu-English × Hinglish</p></div>
                <div><span className="reason-dot yellow" /><p><b>Shared setting</b><br />Both up after 11 pm</p></div>
                <div><span className="reason-dot pink" /><p><b>Conversation energy</b><br />Playful and curious</p></div>
              </div>
              <button className="text-link">How does this work? <ChevronRight size={15} /></button>
            </section>

            <section className="safety-card">
              <div className="safety-icon"><ShieldCheck size={18} /></div>
              <div><h3>Soft landings, always.</h3><p>Voice is private. Photos reveal only after a mutual yes.</p></div>
            </section>

            <section className="online-card">
              <div className="online-title"><span><span className="live-dot" /> 38 people listening</span><Users size={17} /></div>
              <div className="face-stack"><span>R</span><span>M</span><span>S</span><span>K</span><span>+34</span></div>
            </section>
          </aside>
        </div>
      </section>

      {showRecorder && <div className="modal-backdrop"><section className="recorder-modal" role="dialog" aria-modal="true" aria-label="Record voice intro">
        <button className="modal-close" onClick={() => { setShowRecorder(false); if (isRecording) toggleRecording(); }}><X size={20} /></button>
        <div className={isRecording ? "recording-orb live" : "recording-orb"}><Mic size={30} /></div>
        <p className="eyebrow">YOUR VOICE INTRO</p>
        <h2>{isRecording ? "You’re on the mic" : "What would you defend forever?"}</h2>
        <p className="modal-copy">Try a hot take, a Felicity plan, or your perfect mess order. Keep it under 30 seconds.</p>
        <div className="record-wave">{voiceBars.slice(0, 18).map((height, index) => <span key={index} style={{ height: `${height}%`, animationDelay: `${index * 0.06}s` }} />)}</div>
        <button className={isRecording ? "stop-recording" : "start-recording"} onClick={toggleRecording}>{isRecording ? <><span className="stop-square" /> Stop recording</> : <><Mic size={19} /> Start recording</>}</button>
        {notice && <p className="notice">{notice}</p>}
      </section></div>}

      {showMatch && <div className="modal-backdrop"><section className="match-modal" role="dialog" aria-modal="true" aria-label="New match">
        <button className="modal-close" onClick={() => setShowMatch(false)}><X size={20} /></button>
        <div className="match-hearts"><Heart fill="currentColor" /><Heart fill="currentColor" /><Heart fill="currentColor" /></div>
        <p className="eyebrow">MUTUAL VOICE VIBE</p>
        <h2>You and Nitya<br />just connected.</h2>
        <p>You both chose to hear more. Photos stay hidden until either of you chooses to reveal.</p>
        <div className="match-choice-row">
          <button className="secondary-button" onClick={() => setShowPhoto(!showPhoto)}>{showPhoto ? <><Check size={17} /> Photo revealed</> : "Reveal my photo"}</button>
          <button className="primary-button" onClick={createIcebreaker} disabled={isThinking}>{isThinking ? "Thinking…" : <><Sparkles size={17} /> Start a warm-up</>}</button>
        </div>
        {showPhoto && <div className="photo-reveal"><div className="photo-placeholder">N</div><span>Nitya has been notified that you revealed your photo.</span></div>}
        {icebreaker && <div className="icebreaker"><AudioLines size={18} /><p>{icebreaker}</p><button aria-label="Send icebreaker"><Send size={16} /></button></div>}
        <p className="consent-foot"><LockKeyhole size={13} /> You can unmatch or report at any time.</p>
      </section></div>}
    </main>
  );
}
