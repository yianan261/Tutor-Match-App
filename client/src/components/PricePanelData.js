import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";

/**
 * Amanda Au-Yeung
 * exports data for price panel
 */
export const pricePanelData = [
  {
    icon: <img className="price-img" src={p1} alt="One-timer" />,
    plan: "One Timer",
    description: "Single booster",
    specifics: "1 class on any Subject",
    price: "$25",
  },
  {
    icon: <img className="price-img" src={p2} alt="Brush-Up Plan" />,
    plan: "Brush-Up Plan",
    description: "Just a few remedial classes",
    specifics: "3 classes on any subjects per month",
    price: "$70",
  },
  {
    icon: <img className="price-img" src={p3} alt="Pro Plan" />,
    plan: "Pro Plan",
    description: "For Eager Minds",
    specifics: "5 classes of any subject per month",
    price: "$100",
  },
];
