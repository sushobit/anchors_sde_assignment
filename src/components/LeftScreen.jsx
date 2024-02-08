import React from "react";
import { TbCirclePlus } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import "./LeftScreen.css"

const LeftScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    var answer = window.confirm("Are you sure to logout?");
    if (answer) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <>
      <div className="leftscreenmaincont">
        <div>
          <div className="leftscreensubcontainer">
            <div className="leftscreenallpost">
            <Link
              to="/posts"
              
            >
              All Post
            </Link>
            </div>
            <Link
              to="/commented-post"
              className="leftscreenallcomented"
            >
              Your Commented Post
            </Link>
            <Link
              to="/replied-post"
              className="leftscreenreplied"
            >
              Your Replied Post
            </Link>
          </div>
          <div className="creatpostcont">
            <Link
              to="/create-post"
              className="createpostlink"
            >
              <TbCirclePlus className="text-3xl" />
              Create Post
            </Link>
          </div>
          <div className="logoutbuttoncont">
            <button
              onClick={handleLogout}
              className="logoutbutton"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftScreen;