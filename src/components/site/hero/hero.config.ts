import sports from "@/assets/hero/hero-sports.webp";
import arts from "@/assets/hero/hero-arts.webp";
import culture from "@/assets/hero/hero-culture.webp";

export type HeroSlide = {
  /** ghost word */
  w: string;
  /** ghost word font size */
  z: string;
  /** kicker / tab label */
  k: string;
  /** headline plain part */
  a: string;
  /** headline emphasised part */
  e: string;
  /** description */
  p: string;
  img: string;
  alt: string;
  /** accent colour for <em> */
  ac: string;
  /** figure foot position (fraction of figure height) */
  fy: number;
  /** background gradient stops */
  bg: string;
  /** figure glow colour */
  g: string;
  /** rim lights */
  rm: [string, string];
};

export const HERO_SLIDES: HeroSlide[] = [
  { w: "MOVE", z: "40vw", k: "Passions", a: "Where every ", e: "move matters.", p: "Sports, athletics and the drive to compete. Find the next event and be part of it.", img: sports, alt: "Indian sprinter in a red racing kit", ac: "#ffc65a", fy: 0.885, bg: "#7a2a0c 0%,#2a0d04 68%,#150603 100%", g: "rgba(255,150,70,.55)", rm: ["rgba(255,70,90,.40)", "rgba(255,210,120,.28)"] },
  { w: "STAGE", z: "36vw", k: "Possibilities", a: "Where every stage is a ", e: "possibility.", p: "Dance, music and theatre. Step into the spotlight at the next SAC showcase.", img: arts, alt: "Dancer in red leaping with a microphone", ac: "#ffb48a", fy: 0.93, bg: "#34446a 0%,#121828 68%,#0a0d15 100%", g: "rgba(170,195,245,.55)", rm: ["rgba(255,160,120,.34)", "rgba(120,200,255,.25)"] },
  { w: "PEOPLE", z: "32vw", k: "People", a: "Where every tradition brings ", e: "people together.", p: "Festivals, heritage and celebration. Come for the event, stay for the community.", img: culture, alt: "Kathakali performer in full costume", ac: "#f5d36b", fy: 0.94, bg: "#126042 0%,#082a1d 68%,#04150e 100%", g: "rgba(80,210,150,.5)", rm: ["rgba(240,200,80,.34)", "rgba(60,220,200,.25)"] },
];
