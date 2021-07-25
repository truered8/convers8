import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { SymblContext } from "contexts/SymblContext";
import { useAuth } from "contexts/AuthContext";

const request = require("request");

const UploadButton = () => {
  const { getToken } = useContext(SymblContext);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false)
  const [AUDIO_URL, setAUDIO_URL] = useState(" https://123bien.com/wp-content/uploads/2019/05/call-about-the-job.mp3")

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

    setAUDIO_URL(file.secure_url);

    const fireData = {
      recording: file.secure_url
    }


    const fireRes = await db.collection("users").doc(currentUser.email).collection("conversations").doc().set(fireData);

    setLoading(false);

};



  const waitUntilDone = (token, jobId) => {
    const waitUntilDonePromise = (resolve, reject) => {
      request.get(
        {
          url: `https://api.symbl.ai/v1/job/${jobId}`,
          headers: { Authorization: `Bearer ${token}` },
          json: true,
        },
        (err, response, body) => {
          console.log(body["status"]);
          if (body["status"] == "completed") {
            resolve();
          } else {
            setTimeout(() => waitUntilDonePromise(resolve, reject), 1000);
          }
        }
      );
    };
    return new Promise(waitUntilDonePromise);
  };

  const FILLERS = ["um", "uh", "like"];

  const onClick = (e) => {
    e.preventDefault();
    getToken.then((token) => {
      fetch("https://api.symbl.ai/v1/process/audio/url", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: AUDIO_URL,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          const conversationId = response["conversationId"]; //6363398028656640
          const jobId = response["jobId"];
          let transcript = "";
          waitUntilDone(token, jobId).then(() => {
            fetch(
              `https://api.symbl.ai/v1/conversations/${conversationId}/messages`,
              {
                headers: { Authorization: `Bearer ${token}` },
                json: true,
              }
            )
              .then((response) => response.json())
              .then((response) => {
                response["messages"].forEach((message) => {
                  transcript += message["text"] + " ";
                });
              })
              .then(() => {
                console.log(transcript);
              })
              .then(() =>
                fetch(
                  `https://api.symbl.ai/v1/conversations/${conversationId}/analytics`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                    json: true,
                  }
                )
              )
              .then((response) => response.json())
              .then((responseData) => {
                const timeTalk = responseData["metrics"].find(
                  (metric) => metric["type"] == "total_talk_time"
                )["seconds"];
                const percentTalk = responseData["metrics"].find(
                  (metric) => metric["type"] == "total_talk_time"
                )["percent"];
                const percentInterrupt = responseData["metrics"].find(
                  (metric) => metric["type"] == "total_overlap"
                )["percent"];
                const wpm = responseData["members"][0]["pace"]["wpm"];
                const fillerOccurrence =
                  transcript
                    .split(" ")
                    .filter((word) => FILLERS.includes(word.toLowerCase()))
                    .length /
                  (timeTalk / 30);
                console.log(`Percent of time Talking: ${percentTalk}`);
                console.log(
                  `Percent of time Interrupting: ${percentInterrupt}`
                );
                console.log(`Speed in Words per Minute: ${wpm}`);
                console.log(
                  `Filler Words every 30 Seconds: ${fillerOccurrence}`
                );
                const score = 100 - percentInterrupt * 2 - fillerOccurrence;
                if (wpm < 140) score -= (140 - wpm) * 0.5;
                else if (wpm > 160) score -= (wpm - 160) * 0.5;
                console.log(`Score: ${score}`);
              });
          });
        });
    });
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
