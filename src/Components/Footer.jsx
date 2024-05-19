import React from "react";
import "../Plugins/themify-icons.css";
import "./Application.css";
import "../Plugins/bootstrap.min.css";
import "slick-carousel/slick/slick";
import "jquery/dist/jquery.js";
import "../Plugins/script.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { FaLocationArrow } from "react-icons/fa";


const Footer = () => {


  return (
    <div>
      <footer className="section-sm pb-0 border-top border-default">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-3 mb-4">
              <a className="mb-4 d-block" href="index.html">
                <a className="navbar-brand" href="index.html">
                  <img
                    className="img-fluid"
                    width="35px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_-d23N9bIDv1elovJe1vxi--7ZEFdxyMPwYBMUKXhg&s"
                    alt="LogBook"
                  />
                  <a
                    className="navbar-brand"
                    style={{
                      color: "#ff6666",
                      fontWeight: "700",
                      width: "300px",
                    }}
                  >
                    BLO<span>GIFY</span>
                  </a>
                </a>
              </a>
              <p>
                Welcome to BLOGIFY, crafted by Deep Saha, a haven for passionate
                bloggers to unleash their creativity. Dive into a realm where
                your thoughts find expression, your voice resonates, and your
                stories captivate. Join the journey of words, only on BLOGIFY.
              </p>
            </div>

            <div className="col-lg-2 col-md-3 col-6 mb-4">
              <h6 className="mb-4">Quick Links</h6>
              <ul className="list-unstyled footer-list">
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
                <li>
                  <a href="privacy-policy.html">Privacy Policy</a>
                </li>
                <li>
                  <a href="terms-conditions.html">Terms Conditions</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 col-6 mb-4">
              <h6 className="mb-4">Social Links</h6>
              <ul className="list-unstyled footer-list">
                <li>
                  <a href="#">facebook</a>
                </li>
                <li>
                  <a href="#">twitter</a>
                </li>
                <li>
                  <a href="#">linkedin</a>
                </li>
                <li>
                  <a href="#">github</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h6 className="mb-4">Subscribe Newsletter</h6>
              <form
                className="subscription"
                action="javascript:void(0)"
                method="post"
              >
                <div className="position-relative">
                  <i className="ti-email email-icon"></i>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email Address"
                  />
                </div>
                <button
                  className="btn btn-primary btn-block rounded"
                  type="submit"
                >
                  Subscribe now
                </button>
              </form>
            </div>
          </div>
          <div className="scroll-top">
            <a id="scrollTop" >
              <FaLocationArrow />
            </a>
          </div>
          <div className="text-center">
            <p className="content">&copy; 2024 Blogify.com. All Rights Reserved. - Develop By <span style={{color:"#ce8460"}}>Deep Saha</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
