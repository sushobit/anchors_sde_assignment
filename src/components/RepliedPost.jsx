import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftScreen from "./LeftScreen";
import axios from "axios";
import "./RepliedPost.css"

const RepliedPost = () => {
  const navigate = useNavigate();
  const [repliedPosts, setRepliedPosts] = useState([]);

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
          `https://backend-anchors-in.vercel.app/posts/replied-posts/${currentUser}`
        );
        setRepliedPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommentedPosts();
  }, [currentUser]); 

  return (
    <>
      <div className="repliedpostleftsec">
        {/* Left Screen */}
        <LeftScreen />

        {/* Right Screen */}
        <div className="repliedpostrightsectionmaincontainer">
          <div className="repliespostmainhead">
            You All Replied Post ({repliedPosts.length})
          </div>
          {repliedPosts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col text-xl rounded-lg bg-[#191919] text-[#929292] px-8 py-3 gap-4"
            >
              <Link to={`/post/${post._id}`}>
                <div className="repliedposttitle">{post.title}</div>
                <div className="repliedpostcommentreplies">
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

export default RepliedPost;