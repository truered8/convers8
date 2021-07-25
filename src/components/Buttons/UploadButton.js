import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

const UploadButton = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
   
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "unsigned");
      setLoading(true);
      const res = await fetch(
        "	https://api.cloudinary.com/v1_1/convers8/upload",
        {
          method: "post",
          body: data,
        }
      );
      const file = await res.json();

      console.log(file.secure_url);

      const fireData = {
        recording: file.secure_url
      }

      const fireRes = await db.collection("users").doc(currentUser.email).collection("conversations").doc().set(fireData);

      setLoading(false);
 
  };
  return (
      
    
      <div className="items-center flex">
        <div>
        <label htmlFor="audio" className="cursor-pointer text-white-500 block h-12 px-4 m-5 text-sm text-white bg-blueGray-800 inline-flex items-center justify-center rounded-full" placeholder="Upload Conversation" >
          {loading? "loading" : "UPLOAD CONVERSATION"}
          
        </label>
        <input type="file" id="audio" onChange={uploadImage} hidden/>
        </div>
    
        
      </div>
  );
};

export default UploadButton;
