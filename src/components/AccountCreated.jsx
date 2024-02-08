import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import "./AccountCreated.css"

const AccountCreated = () => {
  return (
    <div>
      <div className="accountcreatedmaincont">
        <div className="accountcreatedsecond">
          <IoIosCheckmarkCircle className="text-4xl" />
          <div className="accountcreatedcard">
            <div className="">Account Created</div>
            <div className="">Successfully</div>
          </div>

          <Link
            to="/create-post"
            className="accountcretedfirstpost"
          >
            Create Your First Post <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;