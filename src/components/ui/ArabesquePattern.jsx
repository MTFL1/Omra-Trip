import React from 'react';

const ArabesquePattern = ({
  color = 'var(--color-gold)',
  opacity = 0.08,
  className = '',
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
      }}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="arabesque-tile"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* 8-pointed star: Square 1 at 0° — corners (18,18),(42,18),(42,42),(18,42) */}
          <polygon
            points="18,18 42,18 42,42 18,42"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />

          {/* 8-pointed star: Square 2 at 45° — corners (30,13),(47,30),(30,47),(13,30) */}
          <polygon
            points="30,13 47,30 30,47 13,30"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />

          {/*
            Connecting lattice lines: link each star point to the nearest tile edge
            to create the classic Islamic interlace / tracery effect.
            Top point (30,13) → top edge midpoint (30,0)
            Right point (47,30) → right edge midpoint (60,30)
            Bottom point (30,47) → bottom edge midpoint (30,60)
            Left point (13,30) → left edge midpoint (0,30)
          */}
          <line x1="30" y1="13" x2="30" y2="0"  stroke={color} strokeWidth="0.8" />
          <line x1="47" y1="30" x2="60" y2="30" stroke={color} strokeWidth="0.8" />
          <line x1="30" y1="47" x2="30" y2="60" stroke={color} strokeWidth="0.8" />
          <line x1="13" y1="30" x2="0"  y2="30" stroke={color} strokeWidth="0.8" />

          {/*
            Diagonal lattice lines: link the axis-aligned square corners to the tile
            corners so that adjacent tiles lock together seamlessly.
            Top-left corner of square (18,18) → tile top-left (0,0)
            Top-right corner (42,18) → tile top-right (60,0)
            Bottom-right corner (42,42) → tile bottom-right (60,60)
            Bottom-left corner (18,42) → tile bottom-left (0,60)
          */}
          <line x1="18" y1="18" x2="0"  y2="0"  stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="42" y1="18" x2="60" y2="0"  stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="42" y1="42" x2="60" y2="60" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="18" y1="42" x2="0"  y2="60" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />

          {/*
            Small diamond accent at each corner of the tile (rotated 45° squares).
            Each diamond is 4 units wide/tall, centered on the corner.
            Corner (0,0):  points (-2,0),(0,-2),(2,0),(0,2)  → clipped to visible quadrant
            We use a rotated rect via polygon for clarity.
          */}
          {/* Top-left corner diamond */}
          <polygon
            points="0,-3 3,0 0,3 -3,0"
            transform="translate(0,0)"
            fill={color}
            stroke="none"
          />
          {/* Top-right corner diamond */}
          <polygon
            points="0,-3 3,0 0,3 -3,0"
            transform="translate(60,0)"
            fill={color}
            stroke="none"
          />
          {/* Bottom-right corner diamond */}
          <polygon
            points="0,-3 3,0 0,3 -3,0"
            transform="translate(60,60)"
            fill={color}
            stroke="none"
          />
          {/* Bottom-left corner diamond */}
          <polygon
            points="0,-3 3,0 0,3 -3,0"
            transform="translate(0,60)"
            fill={color}
            stroke="none"
          />

          {/*
            Edge-midpoint diamonds: small accent marks where the lattice lines meet
            the tile edges, giving the pattern extra visual rhythm when tiled.
          */}
          {/* Top-edge midpoint */}
          <polygon
            points="30,-2 32,0 30,2 28,0"
            fill={color}
            stroke="none"
          />
          {/* Right-edge midpoint */}
          <polygon
            points="58,30 60,28 62,30 60,32"
            fill={color}
            stroke="none"
          />
          {/* Bottom-edge midpoint */}
          <polygon
            points="30,58 32,60 30,62 28,60"
            fill={color}
            stroke="none"
          />
          {/* Left-edge midpoint */}
          <polygon
            points="-2,30 0,28 2,30 0,32"
            fill={color}
            stroke="none"
          />

          {/*
            Inner fill accent: small filled octagon at tile center to reinforce
            the star shape and give the pattern depth.
          */}
          <polygon
            points="30,22 35,25 38,30 35,35 30,38 25,35 22,30 25,25"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#arabesque-tile)" />
    </svg>
  );
};

export default ArabesquePattern;
