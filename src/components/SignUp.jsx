import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css"

const SignUp = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("my-app-user")) {
      navigate("/posts");
    }
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = (e) => {
    const { name, email, password, confirmPassword } = values;
    if (name.length < 4) {
      toast.error("Name should be greater than 3 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater or equal to 8 characters",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "password and confirm password should be the same",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, email, password } = values;
      const { data } = await axios.post(
        "https://backend-anchors-in.vercel.app/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("my-app-user", JSON.stringify(data.user));
        navigate("/posts");
      }
    }
  };

  return (
    <div className="signupage">
      <div className="signupcont">
        <FaRocket className="rocketicon" />
        <div className="signuphead">Create Your Account</div>
        <form
          className="formcont"
          onSubmit={handleSignup}
        >
          <input
            className="signupinput"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
            onChange={handleChange}
          />
          <input
            className="signupinput"
            type="email"
            name="email"
            placeholder="Enter Email ID"
            required
            onChange={handleChange}
          />
          <input
            className="signupinput"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />
          <input
            className="signupinput"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="continuebutton"
          >
            Continue
            <FaArrowRight />
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;