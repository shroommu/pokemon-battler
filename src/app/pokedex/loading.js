export default function PokedexHomeLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 6 6" className="h-48 w-96 animate-pulse">
        <g>
          <path
            d="M 0 3 C 0 1.5 1.5 0 3 0 C 4.5 0 6 1.5 6 3 L 4 3 C 4 2.5 3.5 2 3 2 C 2.5 2 2 2.5 2 3 L 0 3 Z"
            className="fill-gray-600 opacity-50"
          />
          <rect
            width="6px"
            height=".25px"
            y="2.75px"
            className="fill-gray-200"
          />
        </g>
        <g>
          <path
            d="M 6 3 C 6 4.5 4.5 6 3 6 C 1.5 6 0 4.5 0 3 L 2 3 C 2 3.5 2.5 4 3 4 C 3.5 4 4 3.5 4 3 L 6 3 Z"
            className="fill-gray-500 opacity-50"
          />
          <rect width="6px" height=".25px" y="3px" className="fill-gray-200" />
        </g>
        <circle r="0.75px" cx={3} cy={3} className="fill-gray-500 opacity-50" />
      </svg>
    </div>
  );
}
