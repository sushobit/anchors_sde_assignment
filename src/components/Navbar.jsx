import React, { useEffect, useState } from "react";
import { HiSquares2X2 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = () => {
      const storedData = localStorage.getItem("my-app-user");
      if (!storedData) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        const parsedData = JSON.parse(storedData) || [];
        const userName = parsedData.name.split(" ")[0];
        setName(userName);
      }
    };

    checkUserStatus();
  }, [isLoggedIn]);

  return (
    <div className="Navbar">
      <div>
        <Link to="/">
          <div className="navcont">
            <HiSquares2X2 className="logo" />
            <div className="navhead">ANONYMOUS</div>
          </div>
        </Link>
      </div>
      {isLoggedIn && <div className="text-xl font-bold">Welcome, {name}</div>}
    </div>
  );
};

export default Navbar;