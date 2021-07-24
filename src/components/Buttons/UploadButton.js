import React from "react";

const UploadButton = () => {
  return (
    <a
      className="text-blueGray-500 block"
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <div className="items-center flex">
        <span className="h-12 px-4 m-5 text-sm text-white bg-blueGray-800 inline-flex items-center justify-center rounded-full">
          UPLOAD CONVERSATION
        </span>
      </div>
    </a>
  );
};

export default UploadButton;
