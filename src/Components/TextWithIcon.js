import React from "react";

export default function TextWithIcon({
  textContent,
  pathData,
  strokeWidth = 2,
  iconAlign = "left",
  iconWidth = "1.25rem",
  viewBox = "0 0 24 24",
}) {
  return (
    <span
      className={
        iconAlign === "right"
          ? "textWithIcon textWithIcon--iconRight"
          : "textWithIcon"
      }
    >
      <svg
        className="textWithIcon__icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox={viewBox}
        stroke="currentColor"
        style={{ width: iconWidth }}
      >
        {pathData.map((data, index) => {
          return (
            <path
              key={index}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={strokeWidth}
              d={data}
            />
          );
        })}
      </svg>
      <span className="textWithIcon__text">{textContent}</span>
    </span>
  );
}
