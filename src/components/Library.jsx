export function Button({ onClick, children, className }) {
  return (
    <button
      className={
        "flex justify-center items-center p-2.5 rounded bg-indigo-800 gap-2.5 text-white antialiased hover:bg-indigo-700 transition " +
        (className || "")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function GoogleIcon() {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7422 10.2846V14.4005H19.6862C19.4042 16.1672 17.5862 19.5754 12.7422 19.5754C8.5625 19.5754 5.1524 16.1824 5.1524 12.0004C5.1524 7.81902 8.5625 4.42592 12.7422 4.42592C15.1193 4.42592 16.7122 5.42024 17.6214 6.27682L20.9458 3.14062C18.8128 1.1821 16.0484 0 12.744 0C5.97624 0 0.5 5.3671 0.5 12C0.5 18.6328 5.97624 24 12.744 24C19.8088 24 24.5 19.1298 24.5 12.276C24.5 11.4885 24.4142 10.8888 24.3084 10.2886L12.744 10.2838L12.7422 10.2847V10.2846Z"
        fill="white"
      />
    </svg>
  );
}

export function SatchelTwoIcon({ height, width, dependant }) {
  if (dependant === undefined) {
    dependant = true;
  }
  return (
    <svg
      viewBox="0 0 114 114"
      fill="none"
      className={`${height} ${width}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_42_214)">
        <line y1="3.5" x2="49" y2="3.5" stroke="#3730A3" strokeWidth="7" />
        <line x1="3.5" y1="49" x2="3.5" stroke="#3730A3" strokeWidth="7" />
        <line x1="110.5" y1="49" x2="110.5" stroke="#3730A3" strokeWidth="7" />
        <line
          x1="3.5"
          y1="114"
          x2="3.5"
          y2="65"
          stroke="#3730A3"
          strokeWidth="7"
        />
        <line
          x1="110.5"
          y1="114"
          x2="110.5"
          y2="65"
          stroke="#3730A3"
          strokeWidth="7"
        />
        <line y1="110.5" x2="49" y2="110.5" stroke="#3730A3" strokeWidth="7" />
        <line
          x1="65"
          y1="110.5"
          x2="114"
          y2="110.5"
          stroke="#3730A3"
          strokeWidth="7"
        />
        <line
          x1="65"
          y1="3.5"
          x2="114"
          y2="3.5"
          stroke="#3730A3"
          strokeWidth="7"
        />
        <path
          d="M40.528 66.192V64.752C40.528 63.744 41.032 63.24 42.04 63.24H48.16C49.168 63.24 49.672 63.744 49.672 64.752V65.328C49.672 67.152 50.032 68.4 50.752 69.072C51.472 69.744 52.792 70.08 54.712 70.08H58.096C59.968 70.08 61.264 69.72 61.984 69C62.752 68.28 63.136 66.936 63.136 64.968V64.104C63.136 62.712 62.56 61.656 61.408 60.936C60.304 60.168 58.912 59.712 57.232 59.568C55.552 59.424 53.728 59.16 51.76 58.776C49.84 58.344 48.04 57.816 46.36 57.192C44.68 56.52 43.264 55.248 42.112 53.376C41.008 51.456 40.456 49.008 40.456 46.032V43.512C40.456 39.768 41.512 36.864 43.624 34.8C45.736 32.736 48.664 31.704 52.408 31.704H59.608C63.4 31.704 66.352 32.736 68.464 34.8C70.576 36.864 71.632 39.768 71.632 43.512V44.88C71.632 45.888 71.128 46.392 70.12 46.392H64C62.992 46.392 62.488 45.888 62.488 44.88V44.448C62.488 42.576 62.128 41.304 61.408 40.632C60.688 39.96 59.368 39.624 57.448 39.624H54.64C52.672 39.624 51.328 40.008 50.608 40.776C49.936 41.496 49.6 42.936 49.6 45.096V46.464C49.6 48.72 51.568 50.016 55.504 50.352C59.584 50.688 63.208 51.504 66.376 52.8C68.056 53.52 69.448 54.816 70.552 56.688C71.704 58.512 72.28 60.864 72.28 63.744V66.192C72.28 69.936 71.224 72.84 69.112 74.904C67 76.968 64.072 78 60.328 78H52.48C48.736 78 45.808 76.968 43.696 74.904C41.584 72.84 40.528 69.936 40.528 66.192Z"
          className={
            dependant ? "fill-neutral-800 dark:fill-white" : "fill-white"
          }
        />
      </g>
      <defs>
        <clipPath id="clip0_42_214">
          <rect width="114" height="114" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function HomeworksNavigationIcon({ className }) {
  className = className || "w-5 h-5";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

export function SubscriptionsNavigationIcon({ className }) {
  className = className || "w-5 h-5";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}
