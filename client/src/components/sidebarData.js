import { FaEdit, FaRegCalendarCheck, FaHistory } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";

/**
 * Amanda Au-Yeung
 * exports sidebar data, including title, path, icon, className
 */
export const sidebarData = [
  {
    title: "Edit Profile",
    path: "/profile/editProfile",
    icon: <FaEdit />,
    cName: "sidenav__list-item",
  },
  {
    title: "Manage Booking",
    path: "/profile/manageBooking",
    icon: <FaRegCalendarCheck />,
    cName: "sidenav__list-item",
  },
  {
    title: "Class History",
    path: "/profile/classHistory",
    icon: <FaHistory />,
    cName: "sidenav__list-item",
  },
  {
    title: "Account Settings",
    path: "/profile/accountSettings",
    icon: <BsFillGearFill />,
    cName: "sidenav__list-item",
  },
];
