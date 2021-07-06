import React from "react";

export default function Error({ options }) {
  const { message } = options;

  return (
    <div className="error">
      <h1>{message}</h1>
    </div>
  );
}
