import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftScreen from "./LeftScreen";
import axios from "axios";
import "./CommentedPost.css"

const CommentedPost = () => {
  const navigate = useNavigate();
  const [commentedPosts, setCommentedPosts] = useState([]);

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
        // console.log(user);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCommentedPosts = async () => {
      try {
        const response = await axios.get(
          `https://backend-anchors-in.vercel.app/api/posts/commented-posts/${currentUser}`
        );
        setCommentedPosts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommentedPosts();
  },[currentUser]);

  return (
    <>
      <div className="leftscreencomentpost">
        {/* Left Screen */}
        <LeftScreen />

        {/* Right Screen */}
        <div className="rightcommentpost">
          <div className="allcomentpostt">
            Your All Commented Posts ({commentedPosts.length})
          </div>
          {commentedPosts.map((post) => (
            <div
              key={post._id}
              className="rightsidecomentreplies"
            >
              <Link to={`/post/${post._id}`}>
                <div className="posttilecontainer">{post.title}</div>
                <div className="containercomentreplies">
                  <div> {post.commentCount} Comments</div>
                  <div> {post.replyCount} Replies</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentedPost;