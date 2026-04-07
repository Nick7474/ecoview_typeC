/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SECTIONS } from "../constants";

const createCustomIcon = (marker: any) => {
  const isAlert = marker.type === "alert";
  
  const tooltipHtml = isAlert ? `
    <div class="absolute top-1/2 left-14 -translate-y-1/2 w-64 bg-white backdrop-blur-md border border-gray-200 rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl z-[999]">
      <div class="flex items-center gap-2 mb-2">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <div class="text-red-500 font-extrabold text-sm uppercase tracking-wider">${marker.label}</div>
      </div>
      <div class="text-gray-800 font-medium text-sm leading-tight">${marker.description}</div>
    </div>
  ` : "";

  return L.divIcon({
    html: `
      <div class="group relative z-[1000] cursor-pointer">
        <div class="relative flex items-center justify-center w-10 h-10 rounded-full ${isAlert ? 'bg-red-500/20' : 'bg-orange-500/20'}">
          <div class="w-4 h-4 rounded-full ${isAlert ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] animate-ping' : 'bg-orange-500'}" style="animation-duration: 2s"></div>
          <div class="absolute w-4 h-4 rounded-full ${isAlert ? 'bg-red-500' : 'bg-orange-500'}"></div>
        </div>
        ${tooltipHtml}
      </div>
    `,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

gsap.registerPlugin(ScrollTrigger);

const TAB_ICONS: Record<string, React.ReactElement> = {
  energy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  mobility: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v7a2 2 0 0 1-2 2h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M14 2v5h5" />
    </svg>
  ),
  safety: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  data: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
};

export default function StackingLayout() {
  const [activeTab, setActiveTab] = useState("energy");
  const containerRef = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const s35Ref = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);
  
  const s1BgRef = useRef<HTMLDivElement>(null);
  const s2BgRef = useRef<HTMLDivElement>(null);
  const s3BgRef = useRef<HTMLDivElement>(null);
  const s35BgRef = useRef<HTMLDivElement>(null);
  const s2TrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Section 1 to 2 Transition (S1 scales down as S2 covers) ---
      gsap.to(s1BgRef.current, {
        scale: 0.85,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: s2Ref.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      // --- Section 2: Pinning and Horizontal Scroll ---
      const s2Items = gsap.utils.toArray(".s2-card");
      
      const s2Timeline = gsap.timeline({
        scrollTrigger: {
          id: "s2Horizontal",
          trigger: s2Ref.current,
          start: "top top",
          end: "+=300%", 
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      s2Timeline.to(s2TrackRef.current, {
        x: () => {
          const trackWidth = s2TrackRef.current?.scrollWidth || 0;
          const viewportWidth = window.innerWidth;
          // Move the track so the last card is visible
          return -(trackWidth - viewportWidth * 0.6); 
        },
        ease: "none",
      });

      // Card Fade-in effect using containerAnimation
      s2Items.forEach((card: any) => {
        gsap.fromTo(card, 
          { opacity: 0, scale: 0.9, y: 50 },
          { 
            opacity: 1, 
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: s2Timeline,
              start: "left 90%",
              end: "left 60%",
              scrub: true,
            }
          }
        );
      });

      // --- Section 2 to 3 Transition (S2 scales down as S3 covers) ---
      // Note: S3 is sticky, so it will start covering S2 after S2's pinning ends.
      gsap.to(s2BgRef.current, {
        scale: 0.85,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: s3Ref.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      // --- Section 3 to 3.5 Transition ---
      gsap.to(s3BgRef.current, {
        scale: 0.85,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: s35Ref.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      // --- Section 3.5 to 4 Transition ---
      gsap.to(s35BgRef.current, {
        scale: 0.85,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: s4Ref.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      // --- Section 4 Counting Animation ---
      const stats = document.querySelectorAll(".stat-value");
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-value") || "0");
        gsap.to(stat, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: s4Ref.current,
            start: "top center",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black overflow-x-hidden">
      {/* Scene 1: Vision */}
      <section
        ref={s1Ref}
        className="sticky top-0 h-screen w-full overflow-hidden z-10"
      >
        <div ref={s1BgRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] min-w-[177.77vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              src="https://www.youtube.com/embed/j5C_koNRdrM?autoplay=1&mute=1&controls=0&loop=1&playlist=j5C_koNRdrM&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-[56px] md:text-[90px] font-bold text-white mb-6 leading-tight tracking-tight">
            {SECTIONS.vision.title}
          </h1>
          <h2 className="text-[32px] md:text-[64px] font-bold text-white/80 mb-10 tracking-tight">
            {SECTIONS.vision.subtitle}
          </h2>
          <p className="text-xl text-white/40 uppercase tracking-[0.4em] font-bold">
            {SECTIONS.vision.description}
          </p>
        </div>
      </section>

      {/* Scene 2: Living Lab (Sticky with Horizontal Scroll) */}
      <section
        ref={s2Ref}
        className="relative h-screen w-full z-20 bg-black"
      >
        <div ref={s2BgRef} className="absolute inset-0 h-screen w-full">
          <img
            src={SECTIONS.livingLab.imageUrl}
            alt="Living Lab Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-30 h-full w-full flex items-center overflow-hidden">
          {/* Fixed Title on Left - Absolute to stay fixed while track moves */}
          <div className="absolute left-0 top-0 h-full w-[45vw] z-50 flex items-center pl-[6vw] md:pl-[10vw] bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm mb-8 block">Living Lab</span>
              <h2 className="text-[48px] md:text-[80px] font-bold text-white mb-6 tracking-tight leading-[1.1] whitespace-pre-line">
                {SECTIONS.livingLab.title}
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-md">
                시민이 주도하는 도시 혁신,<br />광명의 내일을 직접 그려나갑니다.
              </p>
            </div>
          </div>
          
          {/* Horizontal Track - Starts after the title area */}
          <div ref={s2TrackRef} className="flex flex-row items-center gap-12 md:gap-20 pl-[45vw] pr-[10vw]">
            {SECTIONS.livingLab.items.map((item) => (
              <div key={item.id} className="s2-card w-[75vw] md:w-[55vw] flex-shrink-0">
                <div className="relative w-full aspect-video rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] group border border-white/10">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-12 left-12 md:bottom-20 md:left-20">
                    <span className="text-blue-400 font-bold text-xl md:text-2xl mb-4 block">0{item.id}</span>
                    <h3 className="text-3xl md:text-6xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scene 3: Open Lab */}
      <section
        ref={s3Ref}
        className="sticky top-0 h-screen w-full overflow-hidden z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
      >
        <div ref={s3BgRef} className="absolute inset-0">
          <img
            src={SECTIONS.openLab.imageUrl}
            alt="Open Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm mb-8 block">Open Lab</span>
          <h2 className="text-[56px] md:text-[90px] font-bold text-white mb-10 leading-tight tracking-tight whitespace-pre-line">
            {SECTIONS.openLab.title}
          </h2>
          <p className="text-2xl md:text-4xl text-white/80 font-medium max-w-4xl mx-auto leading-relaxed">
            당신의 아이디어가 데이터가 되고,<br />광명의 정책이 되는 혁신 플랫폼
          </p>
        </div>
      </section>

      {/* Scene 3.5: Four Mile */}
      <section
        ref={s35Ref}
        className="sticky top-0 h-screen w-full overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
        style={{ zIndex: 35 }}
      >
        <div ref={s35BgRef} className="absolute inset-0">
          <img
            src={SECTIONS.fourMile.bgUrl}
            alt="Smart City Database"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-20 h-full flex items-center justify-center px-6">
          {/* Glass Dashboard Panel */}
          <div className="w-full max-w-[1400px] aspect-[21/9] min-h-[600px] rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header Area */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/30">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {SECTIONS.fourMile.title}
              </h2>
              <div className="flex gap-4">
                {SECTIONS.fourMile.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[8px] font-bold text-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-[#1F64FC] text-white shadow-[0_0_20px_rgba(31,100,252,0.4)]" 
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <span>{TAB_ICONS[tab.id] ?? tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Central Map Area */}
            <div className="relative flex-1 w-full overflow-hidden z-10 bg-[#e4e4e4]">
              <MapContainer 
                center={[37.478, 126.864]} 
                zoom={14} 
                className="w-full h-full absolute inset-0"
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {SECTIONS.fourMile.markers.map((marker) => (
                  <Marker 
                    key={marker.id} 
                    position={[marker.lat, marker.lng]} 
                    icon={createCustomIcon(marker)} 
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 4: Education */}
      <section
        ref={s4Ref}
        className="sticky top-0 h-screen w-full overflow-hidden z-40 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0">
          <img
            src={SECTIONS.education.imageUrl}
            alt="Education"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm mb-8 block">Education</span>
          <h2 className="text-[56px] md:text-[90px] font-bold text-white mb-6 tracking-tight">
            {SECTIONS.education.title}
          </h2>
          <p className="text-2xl md:text-3xl text-white/70 mb-24 font-medium">
            시민에서 기후의병으로, 성장을 시각화합니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 max-w-6xl w-full">
            {SECTIONS.education.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <span className="text-white/40 text-lg uppercase tracking-[0.2em] mb-6 font-bold group-hover:text-blue-400 transition-colors">
                  {stat.label}
                </span>
                <div className="text-7xl md:text-[110px] font-black text-white flex items-baseline leading-none">
                  <span className="stat-value" data-value={stat.value}>0</span>
                  <span className="text-3xl md:text-4xl ml-3 text-blue-500 font-bold">{stat.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
