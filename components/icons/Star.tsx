const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_1526_14353)">
      <path
        d="M7.22411 30.887C6.45211 31.283 5.57611 30.589 5.73211 29.703L7.39211 20.243L0.346114 13.531C-0.311886 12.903 0.0301145 11.755 0.912115 11.631L10.7081 10.239L15.0761 1.585C15.4701 0.805 16.5361 0.805 16.9301 1.585L21.2981 10.239L31.0941 11.631C31.9761 11.755 32.3181 12.903 31.6581 13.531L24.6141 20.243L26.2741 29.703C26.4301 30.589 25.5541 31.283 24.7821 30.887L16.0001 26.375L7.22211 30.887H7.22411Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1526_14353">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Star;
