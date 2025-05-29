const Comment = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M3 6.5C3 5.11929 4.11929 4 5.5 4H14.5C15.8807 4 17 5.11929 17 6.5V11.5C17 12.8807 15.8807 14 14.5 14H10.6879L7.62533 16.6797C6.99168 17.2342 6 16.7842 6 15.9422V14H5.5C4.11929 14 3 12.8807 3 11.5V6.5ZM5.5 5C4.67157 5 4 5.67157 4 6.5V11.5C4 12.3284 4.67157 13 5.5 13H7V15.8981L10.3121 13H14.5C15.3284 13 16 12.3284 16 11.5V6.5C16 5.67157 15.3284 5 14.5 5H5.5Z"
      fill="currentColor"
    />
  </svg>
);

export default Comment;
