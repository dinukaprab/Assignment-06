import React from "react";
import "./ClickCard.css";

export default function ClickCard({ handleClick }) {
  return (
    <section>
      <div className="nic-section">
        <div className="check-text">
          <h1>Check NIC Details</h1>
          <h6>Click on the card</h6>
        </div>
        <div className="nic">
          <div className="img-container">
            <img src="/src/assets/nic-img.png" alt="NIC" />
            <div className="overlay" onClick={handleClick}>
              Click
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
