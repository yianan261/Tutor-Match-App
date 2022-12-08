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
            <ol>
              <li>{each.icon}</li>
              <li className="pricing-features">{each.plan}</li>
              <li className="pricing-features-items">{each.description}</li>
              <li className="pricing-features-items">{each.specifics}</li>
              <li className="pricing-features-items">{each.price}</li>
            </ol>
          </div>
        );
      })}
    </div>
  );
}

PricePanel.propTypes = {};

export default PricePanel;
