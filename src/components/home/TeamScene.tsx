"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* =====================================================================
   Friendly cartoon scenes for each team discipline, drawn in SVG with the
   UVOKA palette. They have no names or faces from real people, only roles.
   Animations only run while the card is on screen (`play`).
   ===================================================================== */

export type SceneKind = "writer" | "designer" | "leads" | "analyst";

/** Picks a scene from the role text (so it follows whatever is in your data). */
export function sceneKindFor(role: string, index: number): SceneKind {
  const r = role.toLowerCase();
  if (/writ|content|copy|strateg/.test(r)) return "writer";
  if (/design|creative|graphic|visual/.test(r)) return "designer";
  if (/lead|outreach|sales|pipeline/.test(r)) return "leads";
  if (/growth|analy|report|data/.test(r)) return "analyst";
  return (["writer", "designer", "leads", "analyst"] as const)[index % 4];
}

/** Soft background colour behind each scene. */
export const SCENE_TINT: Record<SceneKind, string> = {
  writer: "bg-gradient-to-br from-primary/10 via-white to-[var(--color-ivory)]",
  designer: "bg-gradient-to-br from-gold/25 via-white to-primary/10",
  leads: "bg-gradient-to-br from-primary-muted/20 via-white to-[var(--color-ivory)]",
  analyst: "bg-gradient-to-br from-primary/10 via-white to-gold/20",
};

const SKINS = ["#F2C9A5", "#D9A27A", "#B9805A", "#8D5A3B"];
const HAIRS = ["#2A1A30", "#4A2C2A", "#1F1A24", "#5B3A29"];
const INK = "#2A1A30";
const DARK = "#382044";
const STAR = "M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z";

/* transform origins for SVG shapes */
const fb = { transformBox: "fill-box", transformOrigin: "center" } as const;
const fbBottom = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;
const fbLeft = { transformBox: "fill-box", transformOrigin: "0% 50%" } as const;

type Hair = "short" | "bun" | "curly" | "long";
type Acc = "none" | "glasses" | "headset" | "beret";

/* ---------- a round cartoon head with hair, face and an accessory ---------- */
function Character({
  cx, cy, skin, hair, hairStyle, acc = "none", dir = 1, play,
}: {
  cx: number; cy: number; skin: string; hair: string; hairStyle: Hair;
  acc?: Acc; dir?: 1 | -1; play: boolean;
}) {
  return (
    <motion.g
      animate={play ? { y: [0, -1.6, 0] } : undefined}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <g transform={`translate(${cx} ${cy})`}>
        {hairStyle === "long" && (
          <>
            <rect x="-17" y="-8" width="7" height="27" rx="3.5" fill={hair} />
            <rect x="10" y="-8" width="7" height="27" rx="3.5" fill={hair} />
          </>
        )}
        <circle r="15" fill={skin} />
        <path d="M-15 -1 C-17 -19 17 -19 15 -1 C11 -9 -9 -11 -15 -1Z" fill={hair} />
        {hairStyle === "bun" && <circle cx="0" cy="-20" r="6" fill={hair} />}
        {hairStyle === "curly" &&
          [-12, -5, 5, 12].map((x, i) => (
            <circle key={x} cx={x} cy={i % 3 === 0 ? -9 : -15} r="6.5" fill={hair} />
          ))}

        <g transform={`scale(${dir} 1)`}>
          <motion.g
            style={fb}
            animate={play ? { scaleY: [1, 1, 0.1, 1, 1] } : undefined}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.94, 0.98, 1] }}
          >
            <circle cx="-4" cy="1" r="1.8" fill={INK} />
            <circle cx="7" cy="1" r="1.8" fill={INK} />
          </motion.g>
          <path d="M-2 7 Q3 11 8 7" stroke={INK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <circle cx="-8" cy="6" r="2.6" fill="#F08A8A" opacity="0.45" />
          <circle cx="11" cy="6" r="2.6" fill="#F08A8A" opacity="0.45" />
          {acc === "glasses" && (
            <g stroke={INK} strokeWidth="1.4" fill="none">
              <circle cx="-4" cy="1" r="5" />
              <circle cx="7" cy="1" r="5" />
              <path d="M1 1 H2" />
            </g>
          )}
        </g>

        {acc === "headset" && (
          <g stroke={DARK} fill="none" strokeLinecap="round">
            <path d="M-16 -2 C-16 -23 16 -23 16 -2" strokeWidth="3" />
            <rect x="-20" y="-5" width="6" height="11" rx="3" fill={DARK} />
            <rect x="14" y="-5" width="6" height="11" rx="3" fill={DARK} />
            <path d="M-17 6 C-17 14 -8 15 -1 12" strokeWidth="1.6" />
            <circle cx="-1" cy="12" r="2" fill="var(--color-gold)" stroke="none" />
          </g>
        )}
        {acc === "beret" && (
          <g>
            <ellipse cx="2" cy="-14" rx="16" ry="6.5" fill="var(--color-primary)" />
            <circle cx="3" cy="-21" r="2.2" fill="var(--color-primary-dark)" />
          </g>
        )}
      </g>
    </motion.g>
  );
}

function Twinkle({ x, y, size = 10, delay = 0, play }: { x: number; y: number; size?: number; delay?: number; play: boolean }) {
  return (
    <motion.svg
      x={x} y={y} width={size} height={size} viewBox="0 0 24 24"
      style={{ color: "var(--color-gold)" }}
      animate={play ? { opacity: [0.15, 1, 0.15], scale: [0.6, 1.2, 0.6] } : { opacity: 0.8 }}
      transition={{ duration: 2.6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d={STAR} fill="currentColor" />
    </motion.svg>
  );
}

const Floor = () => <ellipse cx="120" cy="158" rx="96" ry="6" fill={DARK} opacity="0.08" />;

/* =====================================================================
   WRITER and LEAD-GEN: someone at a desk with a laptop
   ===================================================================== */
function DeskScene({
  variant, skin, hair, hairStyle, play,
}: { variant: "writer" | "leads"; skin: string; hair: string; hairStyle: Hair; play: boolean }) {
  const writer = variant === "writer";
  const shirt = writer ? "var(--color-primary)" : "var(--color-primary-dark)";

  return (
    <svg viewBox="0 0 240 170" preserveAspectRatio="xMidYMax meet" className="h-full w-full" aria-hidden="true">
      <Floor />
      {/* desk */}
      <rect x="26" y="126" width="188" height="9" rx="4.5" fill={DARK} />
      <rect x="40" y="135" width="7" height="22" rx="2" fill={DARK} />
      <rect x="193" y="135" width="7" height="22" rx="2" fill={DARK} />

      {/* person */}
      <rect x="78" y="80" width="8" height="12" fill={skin} />
      <path d="M58 128 C58 98 66 90 82 90 C98 90 104 98 104 128 Z" fill={shirt} />
      <Character cx={82} cy={68} skin={skin} hair={hair} hairStyle={hairStyle} acc={writer ? "glasses" : "headset"} play={play} />

      {/* laptop */}
      <path d="M112 126 L172 126 L168 120 L116 120 Z" fill="var(--color-primary-muted)" />
      <rect x="119" y="82" width="48" height="38" rx="4" fill="white" stroke="var(--color-primary-dark)" strokeWidth="2" />

      {writer ? (
        <>
          {/* lines that get typed */}
          {[[92, 34], [101, 26], [110, 30]].map(([y, w], i) => (
            <motion.rect
              key={y} x="126" y={y} width={w} height="4" rx="2" fill="var(--color-primary)" opacity="0.85"
              style={fbLeft}
              animate={play ? { scaleX: [0, 1, 1, 0] } : { scaleX: 1 }}
              transition={{ duration: 4, times: [0, 0.4, 0.85, 1], delay: i * 0.5, repeat: Infinity }}
            />
          ))}
          <motion.rect
            x="161" y="108" width="2" height="8" fill="var(--color-gold)"
            animate={play ? { opacity: [1, 0, 1] } : undefined}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {/* speech bubble "Aa" */}
          <motion.g animate={play ? { y: [0, -4, 0] } : undefined} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
            <rect x="176" y="26" width="46" height="30" rx="10" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
            <path d="M188 56 L184 66 L198 56 Z" fill="white" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M187 55 H199" stroke="white" strokeWidth="3" />
            <text x="199" y="47" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--color-primary)" fontFamily="inherit">Aa</text>
          </motion.g>
          {/* pencil */}
          <motion.g
            style={fb}
            animate={play ? { rotate: [-35, -25, -35], y: [0, -3, 0] } : { rotate: -35 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="196" y="86" width="7" height="30" rx="2" fill="var(--color-gold)" />
            <path d="M196 116 L203 116 L199.5 124 Z" fill="#F2C9A5" />
            <rect x="196" y="86" width="7" height="6" rx="2" fill="var(--color-primary-dark)" />
          </motion.g>
          <Twinkle x={150} y={36} play={play} />
          <Twinkle x={26} y={52} size={8} delay={0.8} play={play} />
        </>
      ) : (
        <>
          {/* chat bubbles that pop */}
          <motion.rect
            x="124" y="90" width="26" height="9" rx="4.5" fill="var(--color-primary-muted)" style={fbLeft}
            animate={play ? { scale: [0, 1, 1, 0] } : { scale: 1 }}
            transition={{ duration: 4.5, times: [0, 0.15, 0.85, 1], repeat: Infinity }}
          />
          <motion.rect
            x="138" y="103" width="24" height="9" rx="4.5" fill="var(--color-primary)" style={{ ...fb, transformOrigin: "100% 50%" }}
            animate={play ? { scale: [0, 0, 1, 1, 0] } : { scale: 1 }}
            transition={{ duration: 4.5, times: [0, 0.25, 0.4, 0.85, 1], repeat: Infinity }}
          />
          {/* "+1 lead" notification */}
          <motion.g
            style={fb}
            animate={play ? { scale: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, -6] } : { scale: 1 }}
            transition={{ duration: 4.5, times: [0, 0.4, 0.55, 0.9, 1], repeat: Infinity }}
          >
            <rect x="170" y="30" width="62" height="28" rx="14" fill="white" stroke="var(--color-gold)" strokeWidth="2" />
            <circle cx="186" cy="44" r="8" fill="var(--color-gold)" />
            <path d="M182.5 44.2 L185.2 47 L190 41.8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="212" y="48" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--color-primary-dark)" fontFamily="inherit">+1 lead</text>
          </motion.g>
          {/* connection network */}
          <g stroke="var(--color-primary-muted)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.7">
            <path d="M190 100 L208 84" /><path d="M190 100 L212 112" />
          </g>
          {[[190, 100, 5], [208, 84, 3.5], [212, 112, 3.5]].map(([x, y, r], i) => (
            <motion.circle
              key={i} cx={x} cy={y} r={r} fill="var(--color-primary)" style={fb}
              animate={play ? { scale: [1, 1.35, 1] } : undefined}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
          <Twinkle x={150} y={36} play={play} />
        </>
      )}

      {/* typing arm */}
      <motion.g animate={play ? { y: [0, -2.2, 0] } : undefined} transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M92 100 C104 108 112 116 118 118" stroke={shirt} strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="121" cy="118" r="4.6" fill={skin} />
      </motion.g>
    </svg>
  );
}

/* =====================================================================
   DESIGNER: beret, easel, a picture that draws itself
   ===================================================================== */
function DesignerScene({ skin, hair, hairStyle, play }: { skin: string; hair: string; hairStyle: Hair; play: boolean }) {
  const loop = (times: number[], delay = 0) => ({ duration: 6, times, delay, repeat: Infinity });
  return (
    <svg viewBox="0 0 240 170" preserveAspectRatio="xMidYMax meet" className="h-full w-full" aria-hidden="true">
      <Floor />
      {/* easel */}
      <path d="M138 112 L128 156 M206 112 L216 156 M172 112 L172 156" stroke={DARK} strokeWidth="3" strokeLinecap="round" />
      <rect x="122" y="28" width="100" height="86" rx="8" fill="white" stroke="var(--color-primary-dark)" strokeWidth="2.5" />

      {/* the artwork that builds up */}
      <motion.circle
        cx="148" cy="56" r="13" fill="var(--color-gold)" style={fb}
        animate={play ? { scale: [0, 1, 1, 0] } : { scale: 1 }} transition={loop([0, 0.15, 0.9, 1])}
      />
      <motion.path
        d="M170 84 L194 84 L182 58 Z" fill="var(--color-primary)" style={fb}
        animate={play ? { scale: [0, 0, 1, 1, 0] } : { scale: 1 }} transition={loop([0, 0.15, 0.3, 0.9, 1])}
      />
      <motion.path
        d="M132 102 C146 88 158 114 172 100 S198 94 212 102" stroke="var(--color-primary-muted)" strokeWidth="3.5" fill="none" strokeLinecap="round"
        initial={false}
        animate={play ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }} transition={loop([0, 0.25, 0.55, 0.9, 1])}
      />

      {/* colour swatches */}
      {["var(--color-gold)", "var(--color-primary)", "var(--color-primary-muted)", "#F4EFE7"].map((c, i) => (
        <motion.circle
          key={i} cx={134 + i * 16} cy={134} r="5.5" fill={c} stroke="var(--color-primary-dark)" strokeWidth="1" style={fb}
          animate={play ? { scale: [1, 1.3, 1] } : undefined}
          transition={{ duration: 1.2, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}

      {/* person */}
      <rect x="58" y="84" width="8" height="16" fill={skin} />
      <path d="M26 170 C26 116 40 100 62 100 C84 100 98 116 98 170 Z" fill="var(--color-gold)" />
      <path d="M50 100 L62 114 L74 100" fill="white" opacity="0.7" />
      <Character cx={62} cy={70} skin={skin} hair={hair} hairStyle={hairStyle} acc="beret" play={play} />

      {/* drawing arm with a stylus */}
      <motion.g
        animate={play ? { x: [0, 6, 0, -4, 0], y: [0, -4, 4, 0, 0] } : undefined}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M86 112 C100 108 110 98 124 92" stroke="#B8955C" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="126" cy="91" r="4.6" fill={skin} />
        <path d="M128 90 L137 83" stroke={DARK} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="137.5" cy="82.5" r="1.7" fill="var(--color-primary)" />
      </motion.g>
      <Twinkle x={104} y={34} play={play} />
      <Twinkle x={226} y={18} size={8} delay={1} play={play} />
    </svg>
  );
}

/* =====================================================================
   ANALYST: bar chart that grows, pointing at the results
   ===================================================================== */
function AnalystScene({ skin, hair, hairStyle, play }: { skin: string; hair: string; hairStyle: Hair; play: boolean }) {
  const bars = [
    { x: 36, h: 24, c: "var(--color-primary-muted)" },
    { x: 60, h: 38, c: "var(--color-primary)" },
    { x: 84, h: 54, c: "var(--color-primary-dark)" },
    { x: 108, h: 70, c: "var(--color-gold)" },
  ];
  return (
    <svg viewBox="0 0 240 170" preserveAspectRatio="xMidYMax meet" className="h-full w-full" aria-hidden="true">
      <Floor />
      <rect x="20" y="30" width="112" height="92" rx="8" fill="white" stroke="var(--color-primary-dark)" strokeWidth="2.5" />
      <g stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="1">
        <path d="M28 56 H124 M28 80 H124 M28 104 H124" />
      </g>
      {bars.map((b, i) => (
        <motion.rect
          key={b.x} x={b.x} y={110 - b.h} width="14" height={b.h} rx="3" fill={b.c} style={fbBottom}
          animate={play ? { scaleY: [0, 1, 1, 0] } : { scaleY: 1 }}
          transition={{ duration: 6, times: [0, 0.25, 0.9, 1], delay: i * 0.25, repeat: Infinity }}
        />
      ))}
      <motion.path
        d="M34 78 L58 64 L82 68 L116 42" stroke="var(--color-gold)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={false}
        animate={play ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
        transition={{ duration: 6, times: [0, 0.3, 0.6, 0.9, 1], repeat: Infinity }}
      />
      {/* +24% chip */}
      <motion.g animate={play ? { y: [0, -4, 0] } : undefined} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <rect x="92" y="8" width="46" height="20" rx="10" fill="var(--color-gold)" />
        <text x="115" y="22" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--color-primary-dark)" fontFamily="inherit">+24%</text>
      </motion.g>

      {/* person */}
      <rect x="176" y="86" width="8" height="14" fill={skin} />
      <path d="M148 170 C148 116 162 100 180 100 C198 100 212 116 212 170 Z" fill="var(--color-primary-dark)" />
      <path d="M172 100 L180 113 L188 100 Z" fill="white" />
      <Character cx={180} cy={72} skin={skin} hair={hair} hairStyle={hairStyle} acc="glasses" dir={-1} play={play} />

      {/* pointing arm with a pointer stick */}
      <motion.g animate={play ? { y: [0, -3, 0], rotate: [0, -3, 0] } : undefined} style={{ transformOrigin: "162px 112px" }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M162 114 C150 110 142 102 134 96" stroke="var(--color-primary-dark)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="132" cy="94" r="4.6" fill={skin} />
        <path d="M130 92 L116 78" stroke={DARK} strokeWidth="2.4" strokeLinecap="round" />
      </motion.g>

      {/* magnifier */}
      <motion.g animate={play ? { y: [0, 4, 0] } : undefined} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx="206" cy="34" r="8" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
        <path d="M212 40 L220 48" stroke="var(--color-primary)" strokeWidth="3.4" strokeLinecap="round" />
      </motion.g>
      <Twinkle x={146} y={30} play={play} />
    </svg>
  );
}

/* =====================================================================
   Public component
   ===================================================================== */
export function TeamScene({ role, index, play }: { role: string; index: number; play: boolean }) {
  const reduced = useReducedMotion();
  const kind = sceneKindFor(role, index);
  const skin = SKINS[index % SKINS.length];
  const hair = HAIRS[index % HAIRS.length];
  const active = play && !reduced;

  switch (kind) {
    case "writer":
      return <DeskScene variant="writer" skin={skin} hair={hair} hairStyle={index % 2 ? "bun" : "long"} play={active} />;
    case "leads":
      return <DeskScene variant="leads" skin={skin} hair={hair} hairStyle={index % 2 ? "short" : "bun"} play={active} />;
    case "designer":
      return <DesignerScene skin={skin} hair={hair} hairStyle={index % 2 ? "long" : "curly"} play={active} />;
    default:
      return <AnalystScene skin={skin} hair={hair} hairStyle="short" play={active} />;
  }
}