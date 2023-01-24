import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../../../images/logo.png";

const Header = () => {
  return (
    <>
      <ReactNavbar
        burgerColorHover="#eb4034"
        logo={logo}
        logoWidth="20vmax"
        navColor1="#ffff"
        logoHoverSize="10px"
        logoHoverColor="#eb4034"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.5vmax"
        link1Color="rgba(35,35,35,0.8)"
        nav1JustifyContent="flex-end"
        nav2JustifyContent="flex-end"
        nav3JustifyContent="flex-start"
        nav4JustifyContent="flex-start"
        link1ColorHover="#eb4034"
        link1Margin="2vmax"
        profileIcon={true}
        ProfileIconElement={FaUserAlt}
        profileIconColor="rgba(35,35,35,0.8)"
        profileIconUrl="/login"
        searchIcon={true}
        SearchIconElement={FaSearch}
        searchIconColor="rgba(35,35,35,0.8)"
        cartIcon={true}
        CartIconElement={FaShoppingCart}
        cartIconColor="rgba(35,35,35,0.8)"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1.5vmax"
      />
    </>
  );
};

export default Header;
