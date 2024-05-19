import React, { useState } from "react";
import "./AccountPage.css";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleCustomerMessage = async (e) => {
    e.preventDefault();
    const MailElements = { name, email, message };
    const response = await toast.promise(
      axios.post("http://localhost:9292/profile/send/query", MailElements),
      {
        pending: "Sending Message...",
        success: "Message Sent to Admin👍",
        error: "Something Went Wrong❌",
      }
    );

    console.log(response.data);
  };

  return (
    <div>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title-bordered mb-5 d-flex align-items-center">
                <h1 className="h4">Talk To Me Anytime :)</h1>
                <ul className="list-inline social-icons ml-auto mr-3 d-none d-sm-block">
                  <li className="list-inline-item">
                    <a href="#">
                      <FaFacebook />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <FaTwitter />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <FaLinkedin />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <FaGithub />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="content mb-5">
                <h1 id="ask-us-anything-br-or-just-say-hi">
                  Ask Us Anything <br /> Or just Say Hi,
                </h1>
                <p>
                  Rather than just filling out a form, Sleeknote also offers
                  help to the user
                  <br />
                  with links directing them to find additional information or
                  take popular actions.
                </p>
                <h4 className="mt-5">Hate Forms? Write Us Email</h4>
                <p>
                  <TfiEmail size={15} color="#ce8460" />
                  <span>&nbsp;</span>
                  <span>
                    <a
                      href="mailto:owner.blogify@gmail.com"
                      style={{ textDecoration: "none", fontWeight: "500" }}
                    >
                      owner.blogify@gmail.com
                    </a>
                  </span>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <form method="POST" action="#">
                <div className="form-group">
                  <label htmlFor="name">Your Name (Required)</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email Address (Required)</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message Here</label>
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleCustomerMessage}
                >
                  Send Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
