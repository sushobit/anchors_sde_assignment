import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import LeftScreen from "./LeftScreen";
import "./PostView.css"

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://backend-anchors-in.vercel.app/api/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId, newComment, replyInputs]);

  const handleInputChange = (e, commentId) => {
    const { value } = e.target;
    setReplyInputs((prevState) => ({
      ...prevState,
      [commentId]: value,
    }));
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://backend-anchors-in.vercel.app/api/posts/${postId}/comments`,
        {
          userId: currentUser,
          text: newComment,
        }
      );
      setPost(response.data);
      alert("Posted new comment");
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostReply = async (e, commentId) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://backend-anchors-in.vercel.app/api/posts/${postId}/comments/${commentId}/replies`,
        {
          userId: currentUser,
          text: replyInputs[commentId],
        }
      );

      setPost(response.data);
      alert("Posted new reply");
      setReplyInputs((prevState) => ({
        ...prevState,
        [commentId]: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="postviewleftscreen">
      {/* Left Screen */}
      <LeftScreen />

      {/* Right Screen */}

      <div className="postviewrightsecmaincontainer">
        <div className="postviewhead">Post Details</div>
        {post ? (
          <div
            key={post._id}
            className="postviewseccont"
          >
            <div className="postviewtitlemain">{post.title}</div>
            <div className="postviewdesc">{post.description}</div>
            <p>Created by: {post.user.name}</p>
            <div className="postviewcomentreplies">
              <div>{post.commentCount} Comments</div>
              <div>{post.replyCount} Replies</div>
            </div>
            <div className="postviewcomments">Comments:</div>
            {/* Add New Comment */}
            <div>
              <form
                className="postviewformcontainer"
                onSubmit={handlePostComment}
              >
                <input
                  className="postviewinputcoment"
                  type="text"
                  name="newComment"
                  placeholder="Add new comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="postviewbutton"
                >
                  Post Comment <FaArrowRight />
                </button>
              </form>
            </div>

            {/* All comments */}
            {post.commentCount === 0 ? (
              <div>No comments</div>
            ) : (
              post.comments.map((comment) => (
                <div key={comment._id}>
                  <div className="flex flex-row gap-1">
                    <div className=" italic font-medium">
                      {comment.user.name && comment.user.name.split(" ")[0]}:
                    </div>
                    <div className="flex flex-col">
                      <div className="pb-4">{comment.text} </div>

                      {/* Add Reply Section */}
                      <div>
                        <form
                          className="postviewformcontainer"
                          onSubmit={(e) => handlePostReply(e, comment._id)}
                        >
                          <input
                            className="postviewinputcoment"
                            type="text"
                            name={`newReply-${comment._id}`} // Use a unique name for each input
                            placeholder="Reply to this comment..."
                            value={replyInputs[comment._id] || ""} // Set value from state based on comment ID
                            onChange={(e) => handleInputChange(e, comment._id)} // Pass comment ID to handleInputChange
                          />
                          <button
                            type="submit"
                            className="postviewbutton"
                          >
                            Post Reply <FaArrowRight />
                          </button>
                        </form>
                      </div>

                      {/* Diplay Replies on particular comment */}

                      {comment.replies.length === 0 ? (
                        <div className="text-xl font-extrabold">No Replies</div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <div className="text-xl font-extrabold">Replies:</div>
                          {comment.replies.map((reply) => (
                            <div
                              key={reply._id}
                              className="flex flex-col gap-1"
                            >
                              <div className="flex flex-row gap-1">
                                <div className="italic font-medium">
                                  {reply.user.name &&
                                    reply.user.name.split(" ")[0]}
                                  :
                                </div>
                                <div>{reply.text}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PostView;