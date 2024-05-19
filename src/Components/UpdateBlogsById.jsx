import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Auth/Action";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateBlogsById = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [shortInfo, setShortInfo] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
    LoadCategories();
  }, [jwt, auth.jwt, dispatch]);

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

  const submitUpdatedPost = (e) => {
    e.preventDefault();
    LoadCategories();

    if (title.trim() === "") {
      toast.error("Post title is required !!");
      return;
    }

    if (content.trim() === "") {
      toast.error("Post content is required !!");
      return;
    }

    if (shortInfo.trim() === "") {
      toast.error("Short info is required !!");
      return;
    }

    if (tags.trim() === "") {
      toast.error("Tags are required !!");
      return;
    }

    const postData = { title, content, shortInfo, tags };

    axios
      .post(`http://localhost:9292/post/update/${id}/${categoryId}`, postData)
      .then((response) => {
        toast.success("Post submitted!");

        const postId = response.data.id;
        if (postId) {
          let formData = new FormData();
          formData.append("image", image);

          axios
            .post(
              `http://localhost:9292/post/upload/image/${postId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              toast.success("Image Uploaded !!");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post Server Crashed❌");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9292/post/getpost/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setImage(response.data.imageName);
        setShortInfo(response.data.shortInfo);
        setTags(response.data.tags);
        setCategoryId(response.data.category.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="wrapper">
      <Card className="shadow-sm  border-0 mt-2">
        <CardBody>
          <h3>What's going in your mind?</h3>
          <Form onSubmit={submitUpdatedPost}>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                value={content}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => setContent(newContent)}
                placeholder="Enter Blog Details..."
              />
            </div>

            <div className="mt-3">
              <Label for="image">Select Post banner</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select category--
                </option>

                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Input>
            </div>

            <div className="my-3">
              <Label for="info">Short Info</Label>
              <Input
                type="text"
                id="info"
                placeholder="Enter Short Blog Info"
                className="rounded-0"
                name="info"
                value={shortInfo}
                onChange={(e) => setShortInfo(e.target.value)}
              />
            </div>

            <div className="my-3">
              <Label for="title">Tags</Label>
              <Input
                type="text"
                id="tags"
                placeholder="Enter Tags"
                className="rounded-0"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Update Post
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateBlogsById;
