import React, { useEffect, useState } from "react";
import "../Plugins/themify-icons.css";
import "./Application.css";
import "../Plugins/bootstrap.min.css";
import "slick-carousel/slick/slick";
import "jquery/dist/jquery.js";
import "../Plugins/script.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import post from "../assets/post.jpg";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdContentPasteSearch } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Auth/Action.js";

const BlogList = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState([]);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
    LoadBlogs();
    LoadLatestBlogs();
    LoadCategories();
  }, [jwt, auth.jwt]);


useEffect(()=>{
  LoadPostsByCategory();
} , [])



  const LoadBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:9292/post/getAll");
      console.log(response.data);
      const filteredPosts = response.data.filter(
        (post) => post.postStatus !== "PENDING"
      );
      setBlog(filteredPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const LoadLatestBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:9292/post/latest-posts");
      console.log(res.data);
      const filteredLatestBlogs = res.data.filter(
        (latestPost) => latestPost.postStatus !== "PENDING"
      );
      setLatestBlogs(filteredLatestBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const LoadCategories = async () => {
    try {
      const request = await axios.get(
        "http://localhost:9292/getall/categories"
      );
      console.log(request.data);
      setCategories(request.data);
    } catch (err) {
      console.log(err);
    }
  };

  const LoadPostsByCategory = async () => {
    const request = await axios.get("http://localhost:9292/getall/categories");

    const categoryIds = request.data.map((category) => category.id);
    const counts = [];
    for (const categoryId of categoryIds) {
      const response = axios.get(
        `http://localhost:9292/post/${categoryId}/post-count`
      );

      console.log("Category Id is:- " + categoryId);
      console.log("Count:- ", (await response).data);
      counts.push(response.data);
      
    }
    setCount(counts);
  };

  const printDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleViewPost = (postId) => {
    navigate(`/view-blog/${postId}`);
  };

  const handleCategory = async (e, categoryName) => {
    e.preventDefault();
    console.log("clicked");

    try {
      const response = await axios.get("http://localhost:9292/post/getAll");
      console.log(response.data);

      const filteredPosts = response.data.filter((post) => {
        return (
          post.category.categoryName.toLowerCase() ===
          categoryName.toLowerCase()
        );
      });

      setBlog(filteredPosts);
      console.log(filteredPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:9292/post/getAll");
      console.log(response.data);
      const filteredPosts = response.data.filter((post) => {
        if (search == "") {
          return post;
        } else if (
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.tags.toLowerCase().includes(search.toLowerCase()) ||
          printDate(post.date).toLowerCase().includes(search.toLowerCase()) ||
          post.user.name.toLowerCase().includes(search.toLowerCase())
        ) {
          return post;
        }
      });
      setBlog(filteredPosts);
      console.log(filteredPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUser = (userId) =>{
    navigate(`/userprofile/${userId}`)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8  mb-5 mb-lg-0">
            {blog.map((content) => (
              <article className="row mb-5" key={content.id}>
                <div className="col-md-4 mb-4 mb-md-0">
                  <div className="post-slider slider-sm">
                    <img
                      loading="lazy"
                      src={content.imageName}
                      className="img-fluid"
                      alt="post-thumb"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <h3 className="h5">
                    <a
                      className="post-title"
                      onClick={() => handleViewPost(content.id)}
                    >
                      {content.title}
                    </a>
                  </h3>
                  <ul className="list-inline post-meta mb-2">
                    <li className="list-inline-item">
                      <FaRegUser size={14} />
                      <a onClick={()=>handleUser(content.user.id)}>{content.user.name}</a>
                    </li>
                    <li className="list-inline-item">
                      Date : {printDate(content.date)}
                    </li>
                    <li className="list-inline-item">
                      Categories :{" "}
                      <a className="ml-1">{content.category.categoryName}</a>
                    </li>
                    <li className="list-inline-item">
                      Tags : <a className="ml-1">{content.tags} </a> ,
                    </li>
                  </ul>
                  <p>{content.shortInfo}</p>{" "}
                  <a className="btn btn-outline-primary">
                    <Link
                      to={`/view-blog/${content.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Continue Reading
                    </Link>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <aside className="col-lg-4">
            <div className="widget">
              <h5 className="widget-title">
                <span>Search</span>
              </h5>
              <form className="widget-search">
                <input
                  id="search-query"
                  name="search"
                  type="search"
                  placeholder="Search Blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" onClick={(e) => handleSearch(e)}>
                  <MdContentPasteSearch size={19} />
                </button>
              </form>
            </div>

            <div className="widget">
              <h5 className="widget-title">
                <span>Categories</span>
              </h5>
              
                  {categories.map((category) => (
                <ul className="list-unstyled widget-list" key={category.id}>
                  <li>
                    <a
                      className="d-flex"
                      onClick={(e) => handleCategory(e, category.categoryName)}
                    >
                      {category.categoryName}
                      {count.map((cou, index) => {
    if (categories[index].id === category.id) {
        // Render the count only for the current category
        return <small className="ml-auto" key={index}>{cou}</small>;
    }
    return null;
})}
                    </a>
                  </li>
                </ul>
              ))}
            </div>

            <div className="widget">
              <h5 className="widget-title">
                <span>Latest Articles</span>
              </h5>
              {latestBlogs.map((articles) => (
                <ul className="list-unstyled widget-list" key={articles.id}>
                  <li className="media widget-post align-items-center">
                    <a>
                      <img
                        loading="lazy"
                        className="mr-3"
                        src={articles.imageName}
                      />
                    </a>
                    <div className="media-body">
                      <h5 className="h6 mb-0">
                        <a onClick={() => handleViewPost(articles.id)}>
                          {articles.title}
                        </a>
                      </h5>
                      <small>{printDate(articles.date)}</small>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
