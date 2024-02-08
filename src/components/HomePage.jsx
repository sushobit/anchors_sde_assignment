import React from "react";
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import "./HomePage.css"

const homePage = () => {
  return (
    <div className="mainpage">
      <div className="topheadcont">
        <div className="tophead">
          <FaRocket />
          <span className="text-sm">For Indian Users Only</span>
        </div>
      </div>
      <div className="headdiv">
        <div className="headcontent">
          Start posting anonymously where no one will judge.
        </div>
      </div>
      <div className="headmiddive">
        Welcome to Stranger discussion forum
      </div>
      <div className="creaccntcont">
        <Link
          to="/signup"
          className="accountbutton"
        >
          Create Your Account <FaArrowRight />
        </Link>
      </div>
      <div className="text-center pb-20">
        Already have account?{" "}
        <Link to="/login" className="loginbutton">
          Login
        </Link>
      </div>
    </div>
  );
};

export default homePage;