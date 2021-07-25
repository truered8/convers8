import React from "react";

// components

import CardConversationTable from "components/Cards/CardConversationTable.js";

import { useAuth } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";

export default function Conversation({ id }) {
  const { currentUser } = useAuth();
  //if user is not logged in, redirect to signup page
  if (!currentUser) {
    return <Redirect to="/auth/register" />;
  } else {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full mb-12 xl:mb-0 px-4">
            <CardConversationTable id={id} />
          </div>
        </div>
      </>
    );
  }
}
