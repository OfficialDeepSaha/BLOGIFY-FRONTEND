import React, { useEffect, useState } from "react";
import { getUser } from "../Auth/Action";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if(auth.user){
    LoadPosts();
    }
  }, [auth.user]);

  const LoadPosts = () => {
    axios
      .get(`http://localhost:9292/post/getAll`)
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePostById = (postId) => {
    axios
      .delete(`http://localhost:9292/post/delete/ + ${postId}`)
      .then((res) => {
        LoadPosts();
        console.log(res + "Post Deleted !!");
        toast.success("Post Deleted !!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Problem❌");
      });
  };

  const printDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const changePostStatus = (postId) => {
    axios
      .post(`http://localhost:9292/post/status/ + ${postId}`)
      .then((res) => {
        LoadPosts();

        console.log(res + "Status Changed");
        toast.success("Status Approved !!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Problem❌");
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Manage Blogs</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Blogs</th>
          <th>Status</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </thead>

        <tbody>
          {blogs.map((post) => (
            <tr key={post.id}>
              <td>
                <img
                  loading="lazy"
                  className="img-fluid"
                  alt="post-thumb"
                  src={post.user.image}
                  style={{ height: "100px", objectFit: "cover" }}
                />
              </td>
              <td> {post.user.name} </td>
              <td> {post.user.email} </td>
              <td>{printDate(post.date)}</td>
              <td>{post.title}</td>
              {post.postStatus == "PENDING" ? (
                <td style={{ color: "red", fontWeight: "600" }}>
                  {post.postStatus}
                </td>
              ) : (
                <td style={{ color: "green", fontWeight: "600" }}>
                  {post.postStatus}
                </td>
              )}

              <td>
                <button
                  className="btn btn-success"
                  style={{
                    marginLeft: "10px",
                    width: "10px",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => changePostStatus(post.id)}
                >
                  Change
                </button>
                <button
                  className="btn btn-danger"
                  style={{
                    marginLeft: "10px",
                    width: "10px",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => deletePostById(post.id)}
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
