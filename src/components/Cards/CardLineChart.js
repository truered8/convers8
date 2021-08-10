import React, { useState } from "react";
import Chart from "chart.js";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function CardLineChart() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  //get each conversation rating from firebase and append to array

  React.useEffect(() => {
    async function getConversationRatings() {
      const snapshot = await db
        .collection("users")
        .doc(currentUser.email)
        .collection("conversations")
        .get();
      if (!snapshot.empty) {
        console.log("exists");
        //append each rating to array
        const conversationRatings = [];
        snapshot.forEach((conversation) => {
          conversationRatings.push(conversation.data().rating);
          console.log(conversation.data().rating);
        });
        console.log(conversationRatings);

        var config = {
          type: "line",
          data: {
            labels: [
              "Conversation 1",
              "Conversation 2",
              "Conversation 3",
              "Conversation 4",
              "Conversation 5",
              "Conversation 6",
            ],
            datasets: [
              {
                label: "Rating",
                backgroundColor: "#fff",
                borderColor: "#F44336",
                data: conversationRatings,
                fill: false,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };

        setLoading(false);

        console.log(config.data.datasets[0].data);
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
        return conversationRatings;
      } else {
        console.log("no conversation");
        return [];
      }
    }

    getConversationRatings();
  }, []);
  return (
    //if loading is true, return loading component
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Overview
                </h6>
                <h2 className="text-white text-xl font-semibold">
                  Conversation Rating Progress
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative h-350-px">
              <canvas id="line-chart"></canvas>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
