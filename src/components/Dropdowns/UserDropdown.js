import React from "react";
import { createPopper } from "@popperjs/core";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
const UserDropdown = () => {
  // dropdown props

  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  async function handleLogout() {
    try {
      await logout();
      history.push("/");
    } catch {
      console.error("Failed to log out");
    }
  }

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className=" text-md text-white  inline-flex items-center justify-center p-5">
            {currentUser ? currentUser.email : "Not logged in"}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleLogout}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
