import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { getUser } from "../Auth/Action";

const Blogpost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [shortInfo, setShortInfo] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
    LoadCategories();
  }, [jwt, auth.jwt]);

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

  const submitPost = (e) => {
    e.preventDefault();
    LoadCategories();
    if (title.trim() === "") {
      toast.error("post  title is required !!");
      return;
    }

    if (content.trim() === "") {
      toast.error("post content is required !!");
      return;
    }

    if (shortInfo.trim() === "") {
      toast.error("post content is required !!");
      return;
    }

    if (tags.trim() === "") {
      toast.error("post content is required !!");
      return;
    }

    const userId = auth.user.id;

    console.log("Info:", shortInfo);
    const postData = { title, content, shortInfo, tags };
    console.log(categoryId);

    axios
      .post(`http://localhost:9292/post/user/${userId}/${categoryId}`, postData)
      .then((response) => {
        console.log(response.data);
        toast.success("post submitted!");

        const postId = response.data.id;
        if (postId) {
          let formData = new FormData();
          formData.append("image", image);

          axios
            .post(
              `http://localhost:9292/post/upload/image/ + ${postId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              toast.success("image Uploaded !!");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post Server Crashed❌");
      });
  };

  return (
    <div className="wrapper">
      <Card className="shadow-sm  border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3>What going in your mind ?</h3>
          <Form onSubmit={(e) => submitPost(e)}>
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
                Create Post
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Blogpost;
