import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem";

const NavigationItems = (props) => (
  <ul className= {classes.NavigationItems}>
    <NavigationItem link="/">Legex</NavigationItem>
    <NavigationItem link="/how-we-help-you">How we help you</NavigationItem>
    <NavigationItem link="/our-services">Our services</NavigationItem>
    <NavigationItem link="/our-people">Our people</NavigationItem>
    <NavigationItem link="/our-clients">Our clients</NavigationItem>
    <NavigationItem link="/login">Login</NavigationItem>
    <NavigationItem link="/register">Register</NavigationItem>
    <NavigationItem link="/logout">Logout</NavigationItem>
  </ul>
);

export default NavigationItems;
