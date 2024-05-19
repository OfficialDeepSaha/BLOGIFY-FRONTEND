import React, { useEffect, useState } from "react";
import "./AccountPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Auth/Action";
import axios from "axios";
import { toast } from "react-toastify";

const AccountPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      axios
        .get(`http://localhost:9292/profile/getdetails/ + ${auth.user.id}`)
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
          setAbout(res.data.about);
          setImage(res.data.image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth.user]);

  const handleSave = (e) => {
    e.preventDefault();
    const updateUserData = { name, email, about };
    if (auth.user.id) {
      axios
        .post(
          `http://localhost:9292/profile/update/ + ${auth.user.id}`,
          updateUserData
        )
        .then((res) => {
          console.log(res.data);
          toast.success("User updated successfully");

          if (auth.user.id) {
            let formData = new FormData();
            formData.append("image", image);

            axios.post(
              `http://localhost:9292/profile/upload/image/ + ${auth.user.id}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            toast.success("Image Uploaded!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error updating❌");
        });
    }
  };

  return (
    <div className="account-page">
      <h1>Account Information</h1>

      <div className="round-image-uploader">
        <input id="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input"
        />
        {image ? (
          <div className="preview-container">
            <img src={image} alt="Uploaded" className="preview-image" />
          </div>
        ) : (
          <div className="upload-prompt">
            <p>Click to upload an image</p>
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>About:</label>
        <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AccountPage;
