import React from "react";
import "../../App.css";

const ReadMoreButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="readmore-btn flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-all duration-300"
    >
      {/* Book Wrapper */}
      <span className="book-wrapper relative flex items-center justify-end w-12 h-12">
        {/* Book Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="rgb(86, 69, 117)"
          viewBox="0 0 126 75"
          className="book w-full h-auto"
        >
          <rect
            strokeWidth="3"
            stroke="#fff"
            rx="7.5"
            height="70"
            width="121"
            y="2.5"
            x="2.5"
          ></rect>
          <line
            strokeWidth="3"
            stroke="#fff"
            y2="75"
            x2="63.5"
            x1="63.5"
          ></line>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="#fff"
            d="M25 20H50"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="#fff"
            d="M101 20H76"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="#fff"
            d="M16 30L50 30"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="#fff"
            d="M110 30L76 30"
          ></path>
        </svg>

        {/* Animated Page */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 65 75"
          className="book-page absolute w-6 h-auto origin-left transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="#fff"
            d="M40 20H15"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="#fff"
            d="M49 30L15 30"
          ></path>
          <path
            strokeWidth="3"
            stroke="#fff"
            d="M2.5 2.5H55C59.1421 2.5 62.5 5.85786 62.5 10V65C62.5 69.1421 59.1421 72.5 55 72.5H2.5V2.5Z"
          ></path>
        </svg>
      </span>

      {/* Text */}
      <span className="text-white font-semibold text-sm">Read More</span>
    </button>
  );
};

export default ReadMoreButton;
