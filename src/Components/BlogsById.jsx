import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Auth/Action";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const BlogsById = () => {
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
    if (auth.user) {
      LoadPosts(auth.user.id);
    }
  }, [auth.user]);

  const LoadPosts = () => {
    axios
      .get(`http://localhost:9292/post/get/${auth.user.id}`)
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

  return (
    <div className="container">
      <h2 className="text-center"> Your Blogs </h2>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Image</th>
          <th>Title</th>
          <th>Short Info</th>
          <th>Date</th>
          <th>Category</th>
          <th>Tags</th>
          <th>Status</th>
          <th> Actions </th>
        </thead>

        <tbody>
          {blogs.map((post) => (
            <tr key={post.id}>
              <td>
                <img
                  loading="lazy"
                  className="img-fluid"
                  alt="post-thumb"
                  src={post.imageName}
                  style={{ height: "100px", objectFit: "cover" }}
                />
              </td>
              <td> {post.title} </td>
              <td> {post.shortInfo} </td>
              <td>{printDate(post.date)}</td>
              <td>{post.category.categoryName}</td>
              <td>{post.tags}</td>
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
                <Link
                  className="btn btn-success"
                  style={{ marginLeft: "10px" }} to={`/update/${post.id}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
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

export default BlogsById;
