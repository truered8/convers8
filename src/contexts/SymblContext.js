import React, { createContext, useContext, useState, useEffect } from "react";

const request = require("request");

const authOptions = {
  method: "post",
  url: "https://api.symbl.ai/oauth2/token:generate",
  body: {
    type: "application",
    appId: process.env.REACT_APP_SYMBL_APP_ID,
    appSecret: process.env.REACT_APP_SYMBL_APP_SECRET,
  },
  json: true,
};

const getToken = new Promise((resolve, reject) => {
  request(authOptions, (err, res, body) => {
    if (err) {
      console.error("error posting json: ", err);
      throw err;
    }

    resolve(body["accessToken"]);
  });
});

export const SymblContext = createContext({ getToken });
