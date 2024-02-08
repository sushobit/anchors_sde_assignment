import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeftScreen from "./LeftScreen";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./AllPosts.css"

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://backend-anchors-in.vercel.app/api/posts/getAllPosts"
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="allpostmaincont">
        {/* Left Screen */}
        <LeftScreen />

        {/* Right Screen */}
        <div className="allpostrightscreen">
          <div className="allposthead">
            All Posts ({posts.length})
          </div>
          {posts.map((post) => (
            <div
              key={post._id}
              className="postcontent"
            >
              <Link to={`/post/${post._id}`}>
                <div className="posttitle">{post.title}</div>
                <div className="postcoments">
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

export default AllPosts;