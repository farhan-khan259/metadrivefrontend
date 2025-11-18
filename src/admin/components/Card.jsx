// src/admin/components/Card.jsx
import React from "react";
import "../styles/cards.css";

const Card = ({ title, value, icon: Icon, variant = "primary", onClick }) => {
  return (
    <div className={`admin-card admin-card-${variant}`} onClick={onClick}>
      <div className="admin-card-content">
        <div className="admin-card-icon">{Icon && <Icon />}</div>
        <div className="admin-card-text">
          <h3 className="admin-card-title">{title}</h3>
          <p className="admin-card-value">{value}</p>
        </div>
      </div>
      <div className="admin-card-glow"></div>
    </div>
  );
};

export default Card;
