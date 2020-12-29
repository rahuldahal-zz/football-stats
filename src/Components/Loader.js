import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__wrap">
        <img
          src="/assets/images/juggle-96x96.png"
          alt=""
          className="loader__image"
        />
        <h2 className="loader__text">FootballStats</h2>
        <p>is loading...</p>
      </div>
    </div>
  );
};

export default Loader;
