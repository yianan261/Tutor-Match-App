import React from "react";
import "../assets/styles/PricePanel.css";
import { pricePanelData } from "./PricePanelData";

/**
 * Amanda Au-Yeung Price Panel Component
 */
function PricePanel() {
  return (
    <div className="PricePanel">
      {pricePanelData.map((each, index) => {
        return (
          <div key={index} className="price-panelDiv">
            <ul>{each.icon}</ul>
            <ul className="pricing-features">{each.plan}</ul>
            <li className="pricing-features-items">{each.description}</li>
            <li className="pricing-features-items">{each.specifics}</li>
            <li className="pricing-features-items">{each.price}</li>
          </div>
        );
      })}
    </div>
  );
}

PricePanel.propTypes = {};

export default PricePanel;
