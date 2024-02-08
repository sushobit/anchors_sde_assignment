import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import "./AccountResetted.css"

const AccountResetted = () => {
  return (
    <div>
      <div className="accountresettledmaincontainer">
        <div className="accountresettleseccont">
          <IoIosCheckmarkCircle className="text-4xl" />
          <div className="accountcontainer">
            <div className="">Account Reset</div>
            <div className="">Successfully</div>
          </div>

          <Link
            to="/create-post"
            className="createpostcon"
          >
            Create Your First Post <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountResetted;