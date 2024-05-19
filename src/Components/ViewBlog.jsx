import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Application.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Auth/Action";
import { CardText } from "reactstrap";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const ViewBlog = () => {
  const [viewBlog, setViewBlog] = useState([]);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [commentInfo, setCommentInfo] = useState([]);
  const [likes, setLikes] = useState([]);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    handleViewBlog(id);
    fetchLikes();
  }, [id]);

  useEffect(() => {
    fetchComments(id);
  }, [id]);

 useEffect(() => {
  if (auth.user) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const liked = likedPosts.includes(id , auth.user.id);
    setLiked(liked);
  }
}, [id, auth.user]);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleViewBlog = (postId) => {
    axios
      .get(`http://localhost:9292/post/getpost/${postId}`)
      .then((response) => {
        console.log(response.data);

        const postData = response.data;
        // const plainTextContent = convertHtmlToPlainText(postData.content);
        // Update the state with plain text content
        setViewBlog([{ ...postData }]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Fetching post failed !!");
      });
  };

  const printDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const fetchComments = () => {
    axios
      .get(`http://localhost:9292/getallcomments/${id}`)
      .then((response) => {
        console.log(response.data);
        setCommentInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchLikes = () => {
    axios
      .get(`http://localhost:9292/getall/likes/${id}`)
      .then((res) => {
        console.log(res.data);
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = () => {
    if (auth.user) {
      if (!liked) {
        // Check if the user has already liked the post
        const alreadyLiked = likes.some(
          (like) => like.user.id === auth.user.id
        );

        if (!alreadyLiked) {
          const userLike = { like };
          axios
            .post(
              `http://localhost:9292/addlike/${auth.user.id}/${id}`,
              userLike,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              setLike(like + 1, res.data);
              fetchLikes();
              setLiked(!liked);
              toast.success("Like Added👍");
              const likedPosts =
                JSON.parse(localStorage.getItem("likedPosts")) || [];
              localStorage.setItem(
                "likedPosts",
                JSON.stringify([...likedPosts, id, auth.user.id])
              );
            })
            .catch((err) => {
              console.log(err);
              toast.error("Failed to add Like❌");
            });
        } else {
          toast.info("You have already liked this post");
        }
      }
    } else {
      toast.error("First Login Yourself !!");
    }
  };

  const addComment = (e) => {
    e.preventDefault();

    if (auth.user) {
      if (comment == "") {
        toast.info("Enter Your Comment !!");
      } else {
        const userComment = { comment };
        axios
          .post(
            `http://localhost:9292/comment/${auth.user.id}/${id}`,
            userComment,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setCommentInfo([...commentInfo, res.data]);
            setComment("");
            toast.success("Comment Added👍");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to add Comment❌");
          });
      }
    } else {
      toast.error("First Login Yourself !!");
    }
  };

  return (
    <div>
      <section className="section">
        <div className="container">
          {viewBlog.map((post) => (
            <article className="row mb-4" key={post.id}>
              <div className="col-lg-10 mx-auto mb-4">
                <div className="d-flex mb-2">
                  <h1 className="h2 mb-3">{post.title}</h1>
                  <div className="col-md-4 mt-2 text-right">
                    {auth.user &&  liked ? (
                      
                      <FaHeart
                        size={20}
                        color="red"
                        onClick={() => handleLike()}
                        style={{ cursor: "pointer" }}
                      />
                    
                    ) : (
                      <FaRegHeart
                        value={like}
                        size={20}
                        onClick={() => handleLike()}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>

                <ul className="list-inline post-meta mb-3">
                  <li className="list-inline-item">
                    <i className="ti-user mr-2"></i>
                    <a href="author.html">{post.user.name}</a>
                  </li>
                  <li className="list-inline-item">
                    Date : {printDate(post.date)}
                  </li>
                  <li className="list-inline-item">
                    Categories :{" "}
                    <a href="#!" className="ml-1">
                      Photography{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    Tags :{" "}
                    <a href="#!" className="ml-1">
                      {post.tags}{" "}
                    </a>{" "}
                  </li>
                  <li className="list-inline-item">Likes : {likes.length}</li>
                </ul>
              </div>
              <div className="col-12 mb-3">
                <div className="post-slider">
                  <img
                    src={post.imageName}
                    className="img-fluid"
                    alt="post-thumb"
                  />
                </div>
              </div>
              <div className="col-lg-10 mx-auto">
                <div className="content">
                  <p>
                    <CardText
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></CardText>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="comment-adder">
            <h3>Add a Comment</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            <button onClick={(e) => addComment(e)}>Submit</button>
          </div>
        </div>

        <div className="comments">
          <h2>Comments ({commentInfo.length})</h2>

          {commentInfo.map((com, id) => (
            <div className="comment" key={id}>
              <div className="comment-header">
                <img
                  className="user-avatar"
                  src={com.user.image}
                  alt="User Avatar"
                />
                <div className="user-info">
                  <h3 className="user-name">{com.user.name}</h3>
                  {/* Add more user information if needed */}
                </div>
              </div>
              <p className="comment-text">{com.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ViewBlog;
