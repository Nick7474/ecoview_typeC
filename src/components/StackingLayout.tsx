/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTIONS } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function StackingLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);
  
  const s1BgRef = useRef<HTMLDivElement>(null);
  const s2BgRef = useRef<HTMLDivElement>(null);
  const s3BgRef = useRef<HTMLDivElement>(null);
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

      // --- Section 3 to 4 Transition ---
      gsap.to(s3BgRef.current, {
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
        <div ref={s1BgRef} className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={SECTIONS.vision.videoUrl} type="video/mp4" />
          </video>
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
            src={SECTIONS.livingLab.items[0].imageUrl}
            alt="Living Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-30 h-full w-full flex items-center overflow-hidden">
          {/* Fixed Title on Left - Absolute to stay fixed while track moves */}
          <div className="absolute left-0 top-0 h-full w-[45vw] z-50 flex items-center pl-[6vw] md:pl-[10vw] bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm mb-8 block">Living Lab</span>
              <h2 className="text-[48px] md:text-[80px] font-bold text-white mb-6 tracking-tight leading-[1.1]">
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
