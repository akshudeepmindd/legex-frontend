// import NavigationItems from "../NavigationItems/NavigationItems";
// import classes from "./SideDrawer.css";
// import BackDrop from "../../UI/Backdrop/Backdrop";
import React from "react";
import { Link } from "react-router-dom";
import BackDrop from "./BackDrop";
import classes from "./SideDrawer.css";
import Logo from "../assets/images/logo.png";
import NavigationItems from "./NavigationItems";
const SideDrawer = (props) => {
  // ... Render some css
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <a href="https://resolve.legex.in/" target="_blank">
            <img src={Logo} alt="Legex" className="logo" />
          </a>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
