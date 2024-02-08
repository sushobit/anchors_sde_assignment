import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LeftScreen from "./LeftScreen";
import "./CreatePost.css"

const CreatePost = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("my-app-user")) {
      navigate("/login");
    } else {
      const storedData = localStorage.getItem("my-app-user");
      if (storedData) {
        const parsedData = JSON.parse(storedData) || [];
        const user = parsedData._id;
        setCurrentUser(user);
        console.log(user);
      }
    }
  }, [navigate]);

  const [postData, setPostData] = useState({
    user: currentUser,
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    const { title, description } = postData;
    if (title.length < 3) {
      toast.error("Title should be greater than 3 characters", toastOptions);
      return false;
    } else if (description === "") {
      toast.error("Description is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { title, description } = postData;
      try {
        const response = await axios.post(
          "https://backend-anchors-in.vercel.app/api/posts/create",
          {
            userId: currentUser,
            title,
            description,
          }
        );

        console.log(response.data);
        alert(response.data.message);
        navigate("/posts");
      } catch (error) {
        console.error("Error creating post:", error);
        return;
      }
    }
  };

  return (
    <div className="leftscreencreatepost">
      {/* Left Screen */}
      <LeftScreen />

      {/* Right Screen */}
      <div className=" rightscreencreatepost">
        <div className="createpostgead">Create Post</div>
        <form
          className="createpostformcontain"
          onSubmit={handleCreatePost}
        >
          <div className="createpostformpage">
            <input
              className="posttitlecreatepost"
              type="text"
              name="title"
              placeholder="Post Title..."
              required
              onChange={handleChange}
            />
            <textarea
              className="createpostdescrition"
              type="text"
              name="description"
              placeholder="Describe your post..."
              required
              onChange={handleChange}
            />
          </div>
          <div className="buttoncontainercreatepost">
            <button
              type="submit"
              className="postsubmitbuttonpost"
            >
              Post Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;