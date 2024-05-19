import React, { useEffect, useState } from "react";
import "../Plugins/themify-icons.css";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import "../Plugins/bootstrap.min.css";
import "slick-carousel/slick/slick";
import "jquery/dist/jquery.js";
import "../Plugins/script.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";

import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../Auth/Action.js";

import "./Application.css";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSigninButton = () => {
    navigate("/login");
  };

  const handleLogoutButton = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout Successful👍");
  };

  const handlePostOption = () => {
    navigate("/post-blogs");
  };

  const handleAccountOption = () => {
    navigate("/account/user");
  };

  const handleYourBlogs = () => {
    navigate("/your-blogs");
  };

  const handleAdminOption = () => {
    navigate("/adminDashboard");
  };

  const handleContact = () => {
    navigate("/contact-us");
  };

  return (
    <header className="sticky-top bg-white border-bottom border-default">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-white">
          <a className="navbar-brand" href="/">
            <img
              className="img-fluid"
              width="35px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_-d23N9bIDv1elovJe1vxi--7ZEFdxyMPwYBMUKXhg&s"
              alt="LogBook"
            />
            <a
              className="navbar-brand"
              href="/"
              style={{ color: "#ff6666", fontWeight: "700", width: "300px" }}
            >
              BLOG<span style={{}}>IFY</span>
            </a>
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse text-center" id="navigation">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleContact}>
                  Contact
                </a>
              </li>

              {!auth.user?.name ? (
                <li className="nav-item">
                  <a className="nav-link" onClick={handleSigninButton}>
                    Sign in
                  </a>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a className="nav-link">
                    {auth.user?.name} <MdVerifiedUser />
                    <FaAngleDown />
                  </a>

                  <div className="dropdown-menu">
                    {auth.user?.role == "ROLE_ADMIN" ? (
                      <a className="dropdown-item" onClick={handleAdminOption}>
                        Admin Dashboard <MdAdminPanelSettings />
                      </a>
                    ) : null}

                    <a className="dropdown-item" onClick={handleAccountOption}>
                      Account
                    </a>

                    <a className="dropdown-item" onClick={handlePostOption}>
                      Post
                    </a>
                    <a className="dropdown-item" onClick={handleYourBlogs}>
                      Your Blogs
                    </a>
                    <a className="dropdown-item" onClick={handleLogoutButton}>
                      Logout
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
