const pillStyle = ({ selected }) =>
  `flex justify-center items-center p-2 rounded-md bg-gray-300 cursor-pointer${
    selected ? " bg-gray-400" : ""
  }`;

function shouldBypassClientNavigation(event) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export default function PagePill({ text, href, selected }) {
  return (
    <a
      href={href}
      className={pillStyle({ selected })}
      onClick={(event) => {
        if (shouldBypassClientNavigation(event)) {
          return;
        }

        event.preventDefault();
        window.history.pushState(null, "", href);
      }}
    >
      {text}
    </a>
  );
}
