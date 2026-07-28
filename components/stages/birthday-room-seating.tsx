/**
 * The sofa and the two people sitting on it, drawn as SVG so the shapes have real
 * curvature, seams and lamp-side rim light instead of flat rounded rectangles.
 */
export function RoomSeating({ isTogether }: { isTogether: boolean }) {
  return (
    <svg
      className={`room-seating${isTogether ? " is-together" : ""}`}
      viewBox="0 0 520 330"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sofa-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8b3a2" />
          <stop offset="0.55" stopColor="#c39684" />
          <stop offset="1" stopColor="#a87464" />
        </linearGradient>
        <linearGradient id="sofa-seat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfa593" />
          <stop offset="1" stopColor="#9d6a5b" />
        </linearGradient>
        <linearGradient id="sofa-arm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d5ad9b" />
          <stop offset="1" stopColor="#a37160" />
        </linearGradient>
        <linearGradient id="figure-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a3630" />
          <stop offset="0.72" stopColor="#3b2a26" />
          <stop offset="1" stopColor="#6d4c3f" />
        </linearGradient>
        <radialGradient id="sofa-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(48,30,26,0.4)" />
          <stop offset="1" stopColor="rgba(48,30,26,0)" />
        </radialGradient>
      </defs>

      <ellipse cx="260" cy="308" rx="230" ry="20" fill="url(#sofa-shadow)" />

      {/* Back cushions, slightly bowed rather than a straight bar. */}
      <path
        d="M52 196 L52 108 Q52 74 88 70 Q260 52 432 70 Q468 74 468 108 L468 196 Z"
        fill="url(#sofa-back)"
      />
      <path d="M260 62 L260 196" stroke="rgba(120,74,60,0.34)" strokeWidth="2.5" fill="none" />
      <path
        d="M88 84 Q260 68 432 84"
        stroke="rgba(255,228,210,0.34)"
        strokeWidth="2"
        fill="none"
      />

      {/* Seat, with a soft front lip. */}
      <path
        d="M62 196 L458 196 Q476 196 476 214 L476 250 Q476 272 452 272 L68 272 Q44 272 44 250 L44 214 Q44 196 62 196 Z"
        fill="url(#sofa-seat)"
      />
      <path d="M260 200 L260 268" stroke="rgba(112,68,54,0.3)" strokeWidth="2.5" fill="none" />
      <path d="M56 208 Q260 200 464 208" stroke="rgba(255,230,214,0.26)" strokeWidth="2" fill="none" />

      {/* Arms. */}
      <path d="M18 262 L18 150 Q18 116 52 116 Q84 116 84 150 L84 262 Z" fill="url(#sofa-arm)" />
      <path d="M502 262 L502 150 Q502 116 468 116 Q436 116 436 150 L436 262 Z" fill="url(#sofa-arm)" />
      <ellipse cx="51" cy="150" rx="33" ry="15" fill="rgba(255,231,214,0.3)" />
      <ellipse cx="469" cy="150" rx="33" ry="15" fill="rgba(255,231,214,0.22)" />

      {/* Legs. */}
      <path d="M74 272 L88 272 L84 300 L74 300 Z" fill="#6a4838" />
      <path d="M432 272 L446 272 L446 300 L436 300 Z" fill="#5f402f" />

      {/* Two people, seated and leaning very slightly toward one another. */}
      <g className="room-figure room-figure-left">
        <path
          d="M168 262 Q160 214 176 190 Q186 174 206 174 Q226 174 234 192 Q246 220 240 262 Z"
          fill="url(#figure-body)"
        />
        <circle cx="204" cy="152" r="25" fill="#453029" />
        <path d="M204 127 Q226 130 228 152 Q206 148 204 127 Z" fill="#573b31" />
        <path d="M236 208 Q252 224 248 250" stroke="#3b2a26" strokeWidth="13" strokeLinecap="round" fill="none" />
      </g>

      <g className="room-figure room-figure-right">
        <path
          d="M280 262 Q274 216 286 194 Q296 176 316 176 Q336 176 346 196 Q360 222 352 262 Z"
          fill="url(#figure-body)"
        />
        <circle cx="316" cy="154" r="24" fill="#4b342c" />
        <path d="M316 130 Q296 134 294 156 Q314 152 316 130 Z" fill="#5d4034" />
        <path d="M286 210 Q272 226 276 250" stroke="#3b2a26" strokeWidth="13" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
