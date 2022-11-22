import React from "react";
import "../assets/styles/PricePanel.css";
import { pricePanelData } from "./PricePanelData";

/**
 * Amanda Au-Yeung Price Panel Component
 */
function PricePanel() {
  return (
    <>
      <div className="PricePanel">
        <div>
          {pricePanelData.map((each, index) => {
            return (
              <li key={index} className="eachPlan">
                <span>{each.icon}</span>
                <span>{each.plan}</span>
                <span>{each.description}</span>
                <span>{each.specifics}</span>
                <span>{each.price}</span>
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PricePanel;
