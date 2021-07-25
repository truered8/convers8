import React, { useContext, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";

import Chart from "chart.js";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { SymblContext } from "contexts/SymblContext";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

function CardConversationTable(props, { color }) {
  const { currentUser } = useAuth();
  const { getToken } = useContext(SymblContext);
  const id = new URLSearchParams(useLocation().search).get("id");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getToken.then((token) => {
          fetch(
            `https://api.symbl.ai/v1/conversations/${id}/messages?sentiment=true`,
            {
              headers: { Authorization: `Bearer ${token}` },
              json: true,
            }
          )
            .then((response) => response.json())
            .then((responseData) => {
              setMessages(responseData["messages"]);
              setLoading(false);
            });
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const MessageRow = ({ text, sentiment }) => {
    return (
      <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <span
            className={
              "ml-3 font-bold " +
              +(color === "light" ? "text-blueGray-600" : "text-white")
            }
          >
            {sentiment}
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {text}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Conversation
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Sentiment
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Text
                </th>
              </tr>
            </thead>
            <tbody>
              {messages &&
                messages.map((message) => {
                  return (
                    <MessageRow
                      text={message["text"]}
                      sentiment={message["sentiment"]["polarity"]["score"]}
                    />
                  );
                })}
              {loading && <MessageRow sentiment={"Loading..."} />}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardConversationTable.defaultProps = {
  color: "light",
};

CardConversationTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default withRouter(CardConversationTable);
