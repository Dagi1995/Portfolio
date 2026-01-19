import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const text = `Passionate about clean architecture
I build scalable, high-performance solutions
from prototype to production`;

  const aboutText = `My work is driven by clarity, accessibility, and motion with purpose.
Every component, interaction, and transition is thoughtfully designed
to feel effortless while staying technically sound.

Beyond the screen:
⚡️ Designing reusable UI systems and design tokens
🎨 Exploring modern layout, motion, and micro-interactions
🧠 Translating complex problems into simple, human-centered solutions`;

  const imgRef = useRef(null);
  const linesRef = useRef(null);

  useGSAP(() => {
    /* Section depth */
    gsap.to("#about", {
      scale: 0.96,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 85%",
        end: "bottom 25%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    /* Image reveal */
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      y: 80,
      scale: 1.06,
    });

    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      y: 0,
      scale: 1,
      duration: 1.8,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 85%",
      },
    });

    /* Parallax drift */
    gsap.to(imgRef.current, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    /* Floating micro-motion */
    gsap.to(imgRef.current, {
      y: -14,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    /* Background line drift */
    gsap.to(linesRef.current, {
      backgroundPositionX: "120px",
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    /* Grain breathing */
    gsap.to(".bg-grain", {
      opacity: 0.45,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0b493a] overflow-hidden"
    >
      {/* Awwwards background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div ref={linesRef} className="absolute inset-0 bg-lines" />
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <AnimatedHeaderSection
        subTitle={"Code with purpose — Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-[#cfa355]"}
        withScrollTrigger={true}
      />

      <div className="relative flex flex-col items-center justify-between gap-20 px-10 pb-20 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-[#cfa355]/60">
        <img
          ref={imgRef}
          src="images/main.png"
          alt="Portrait"
          className="w-md rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.45)] transition-transform duration-700 hover:scale-[1.03]"
        />

        <AnimatedTextLines text={aboutText} className="w-full" />
      </div>
    </section>
  );
};

export default About;
