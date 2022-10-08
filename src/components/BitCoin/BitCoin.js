import React from "react";
import { Link } from "react-router-dom";

// coin's profile card to show high-level information regarding the specific coin as props
const BitCoin = ({ bitcoin }) => {
  return (
    <div>
      <div className="crypto">
        <img
          className="crypto-profile-img"
          src={bitcoin.image.large}
          alt="coin_image"
        />
        <div className="crypto-description-bk"></div>
        <div className="crypto-logo">
          <img src={bitcoin.image.small} alt="coin_image" />
        </div>
        <div className="crypto-description">
          <h1>{bitcoin.name}</h1>
        </div>
        <div className="crypto-symbol">
          <p>{bitcoin.symbol.toUpperCase()}</p>
        </div>
        <div className="crypto-btn">
          <Link to={bitcoin.id} className="crypto-link">
            Learn details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BitCoin;
