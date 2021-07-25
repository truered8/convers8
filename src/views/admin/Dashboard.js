import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardTable from "components/Cards/CardTable.js";

import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { Redirect } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useAuth();
  //if user is not logged in, redirect to signup page
  if (!currentUser) {
    return <Redirect to="/auth/register" />;
  } else {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardTable />
          </div>
          <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
            <CardLineChart />
          </div>
        </div>
      </>
    );
  }
}
