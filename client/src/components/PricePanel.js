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
          <div key={index} className="eachPlan">
            <ul>{each.icon}</ul>
            <ul>{each.plan}</ul>
            <ul>{each.description}</ul>
            <ul>{each.specifics}</ul>
            <ul>{each.price}</ul>
          </div>
        );
      })}
    </div>
  );
}

export default PricePanel;
