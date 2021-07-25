import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import UploadButton from "components/Buttons/UploadButton";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-lg  hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Convers<span className="text-red-500 font-semibold">8</span>
          </a>
          {/* Form */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
            <UploadButton />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
