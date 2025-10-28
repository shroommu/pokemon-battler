import { tv } from "tailwind-variants";

const tooltipContainerClass = tv({
  base: "absolute",
  variants: {
    position: {
      top: "-translate-x-1/2",
      bottom: "-translate-x-1/2",
      left: "-translate-y-1/2",
      right: "-translate-y-1/2",
    },
  },
});

const tooltipBodyClass = tv({
  base: "relative p-2 bg-white text-xs rounded-md",
  variants: {
    position: {
      top: "mb-2",
      bottom: "mt-2",
      left: "mr-2",
      right: "ml-2",
    },
  },
});

const tooltipArrowClass = tv({
  base: "absolute h-0 w-0",
  variants: {
    position: {
      top: "left-1/2 -translate-x-1/2 top-full border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white",
      bottom:
        "left-1/2 -translate-x-1/2 bottom-full border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white",
      left: "top-1/2 -translate-y-1/2 left-full border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-white",
      right:
        "top-1/2 -translate-y-1/2 right-full border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-white",
    },
  },
});

export default function Tooltip({ interactionData, position }) {
  if (!interactionData) {
    return null;
  }

  const { xPos, yPos, children } = interactionData;

  let coordinates;
  switch (position) {
    case "top":
      coordinates = {
        left: xPos,
        bottom: yPos,
      };
      break;
    case "right":
      coordinates = {
        left: xPos,
        top: yPos,
      };
      break;
    case "bottom":
      coordinates = {
        left: xPos,
        bottom: yPos,
      };
      break;
    case "left":
      coordinates = {
        left: xPos,
        top: yPos,
      };
      break;
    default:
      coordinates = {
        left: xPos,
        top: yPos,
      };
  }

  return (
    <div
      style={coordinates}
      className={tooltipContainerClass({
        position: position,
      })}
      data-testid="tooltip-container"
    >
      <div
        className={tooltipBodyClass({
          position: position,
        })}
        data-testid="tooltip-body"
      >
        {children}
        <div
          className={tooltipArrowClass({
            position: position,
          })}
          data-testid="tooltip-arrow"
        />
      </div>
    </div>
  );
}
