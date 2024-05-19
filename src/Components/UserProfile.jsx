import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Auth/Action";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9292/profile/getdetails/ + ${id}`)
      .then((res) => {
        setProfile([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <section className="section-sm border-bottom">
        {profile.map((prof) => (
          <div className="container" key={prof.id}>
            <div className="row">
              <div className="col-12">
                <div className="title-bordered mb-5 d-flex align-items-center">
                  <h1 className="h4">{prof.name}</h1>
                  <ul className="list-inline social-icons ml-auto mr-3 d-none d-sm-block">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="ti-facebook"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="ti-twitter-alt"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="ti-github"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mb-4 mb-md-0 text-center text-md-left">
                <img
                  loading="lazy"
                  className="rounded-lg img-fluid"
                  src={prof.image}
                />
              </div>
              <div className="col-lg-9 col-md-8 content text-center text-md-left">
                <p>
                Email:-  {prof.email}
                </p>
                <p>
                About:- {prof.about}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserProfile;
