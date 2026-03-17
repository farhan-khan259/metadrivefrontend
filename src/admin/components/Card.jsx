import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import "../styles/cards.css";

const Card = ({ 
  title, 
  value, 
  icon: Icon, 
  variant = "primary", 
  trend, 
  trendUp, 
  subtitle,
  badge,
  badgeType = "info",
  onClick 
}) => {
  return (
    <div className={`admin-card admin-card-${variant}`} onClick={onClick}>
      <div className="admin-card-header">
        <div className="admin-card-icon-wrapper">
          <Icon className="admin-card-icon" />
        </div>
        {trend && (
          <div className={`admin-card-trend ${trendUp ? 'up' : 'down'}`}>
            {trendUp ? <FiTrendingUp /> : <FiTrendingDown />}
            <span>{trend}</span>
          </div>
        )}
      </div>
      
      <div className="admin-card-body">
        <h3 className="admin-card-title">{title}</h3>
        <p className="admin-card-value">{value}</p>
        {badge && (
          <span className={`admin-card-badge ${badgeType}`}>{badge}</span>
        )}
        {subtitle && <p className="admin-card-subtitle">{subtitle}</p>}
      </div>
      
      <div className="admin-card-footer">
        <span className="admin-card-footer-text">View details →</span>
      </div>
      
      <div className="admin-card-glow"></div>
    </div>
  );
};

export default Card;