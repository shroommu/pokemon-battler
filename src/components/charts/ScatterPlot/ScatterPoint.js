import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

const MIN_HIT_RADIUS = 12;
const HIT_RADIUS_MULTIPLIER = 2;
const DIRECT_HOVER_SCALE = 1.5;
const PASS_THROUGH_PULSE_SCALE = 1.35;
const HOVER_TRANSITION_DURATION_MS = 70;
const PULSE_TRANSITION_DURATION_MS = 35;
const PASS_THROUGH_PULSE_DURATION_MS = HOVER_TRANSITION_DURATION_MS;

export default function ScatterPoint({
  testId,
  cx,
  cy,
  radius = 5,
  fill = "#2563eb",
  stroke = "#ffffff",
  strokeWidth = 1,
  delay = 0,
  pulseTrigger = 0,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const pulseTimeoutRef = useRef(null);

  const opacitySpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
    config: {
      friction: 40,
    },
  });

  const hitRadius = Math.max(MIN_HIT_RADIUS, radius * HIT_RADIUS_MULTIPLIER);

  useLayoutEffect(() => {
    if (!pulseTrigger) {
      return;
    }

    setIsPulseActive(true);

    if (pulseTimeoutRef.current) {
      clearTimeout(pulseTimeoutRef.current);
    }

    pulseTimeoutRef.current = setTimeout(() => {
      setIsPulseActive(false);
    }, PASS_THROUGH_PULSE_DURATION_MS);
  }, [pulseTrigger]);

  useEffect(() => {
    return () => {
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (event) => {
    setIsHovered(true);
    onMouseEnter?.(event);
  };

  const handleMouseMove = (event) => {
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event) => {
    setIsHovered(false);
    onMouseLeave?.(event);
  };

  return (
    <g className="scatter-point-group">
      <circle
        data-testid={testId ? `${testId}-hit-area` : undefined}
        className="scatter-point-hit-area"
        cx={cx}
        cy={cy}
        r={hitRadius}
        fill="transparent"
        pointerEvents="all"
        onMouseEnter={(event) => handleMouseEnter(event)}
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseLeave={(event) => handleMouseLeave(event)}
        onPointerEnter={(event) => handleMouseEnter(event)}
        onPointerMove={(event) => handleMouseMove(event)}
        onPointerLeave={(event) => handleMouseLeave(event)}
        onClick={(event) => onClick?.(event)}
      />
      <animated.circle
        data-testid={testId}
        cx={cx}
        cy={cy}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacitySpring.opacity}
        pointerEvents="none"
        onMouseEnter={(event) => handleMouseEnter(event)}
        onMouseLeave={(event) => handleMouseLeave(event)}
        onClick={(event) => onClick?.(event)}
        style={{
          transition: isPulseActive && !isHovered
            ? `transform ${PULSE_TRANSITION_DURATION_MS}ms ease-out`
            : `transform ${HOVER_TRANSITION_DURATION_MS}ms ease-in-out`,
          transformOrigin: "center",
          transformBox: "fill-box",
          transform: isHovered
            ? `scale(${DIRECT_HOVER_SCALE})`
            : isPulseActive
              ? `scale(${PASS_THROUGH_PULSE_SCALE})`
              : "scale(1)",
        }}
      />
    </g>
  );
}
