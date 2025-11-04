export default function Tab({ text }) {
  return (
    <div className="flex relative h-12 w-24">
      <svg
        viewBox="0 0 5 2"
        className="absolute h-full w-full"
        preserveAspectRatio="none"
      >
        <svg>
          <path
            d="M 0 2 C 1 2 1 0 2 0 C 2.6667 0 3.3333 0 4 0 C 5 0 5 0 5 1 L 5 2 L 0 2 Z"
            className="fill-gray-200"
          />
        </svg>
      </svg>
      <div className="absolute flex h-full w-full">
        <div className="flex h-full mr-4 ml-auto items-center text-xl">
          {text}
        </div>
      </div>
    </div>
  );
}
