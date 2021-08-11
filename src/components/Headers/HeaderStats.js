import React, { useEffect, useState } from "react";
import CardStats from "components/Cards/CardStats.js";

import { useAuth } from "contexts/AuthContext";
import { db } from "../../firebase";

export default function HeaderStats() {
  const { currentUser } = useAuth();
  const [loading, _setLoading] = useState(true);
  const [avgPercentTalk, _setAvgPercentTalk] = useState(0);
  const [lastAvgPercentTalk, _setLastAvgPercentTalk] = useState(0);
  const [avgSpeed, _setAvgSpeed] = useState(0);
  const [lastAvgSpeed, _setLastAvgSpeed] = useState(0);
  const [avgFillerOccurrence, _setAvgFillerOccurrence] = useState(0);
  const [lastAvgFillerOccurrence, _setLastAvgFillerOccurrence] = useState(0);
  const [avgRating, _setAvgRating] = useState(0);
  const [lastAvgRating, _setLastAvgRating] = useState(0);

  useEffect(() => {
    const getAvgData = async () => {
      const snapshot = await db
        .collection("users")
        .doc(currentUser.email)
        .collection("conversations")
        .get();
      if (!snapshot.empty) {
        let conversations = [];
        snapshot.forEach((conversation) =>
          conversations.push(conversation.data())
        );
        let lastTotalPercentTalk = conversations
          .slice(0, conversations.length - 1)
          .map((conversation) => conversation.percent_talk)
          .reduce((previous, current) => previous + current);
        let lastTotalSpeed = conversations
          .slice(0, conversations.length - 1)
          .map((conversation) => conversation.wpm)
          .reduce((previous, current) => previous + current);
        let lastTotalFillerOccurrence = conversations
          .slice(0, conversations.length - 1)
          .map((conversation) => conversation.filler_words)
          .reduce((previous, current) => previous + current);
        let lastTotalRating = conversations
          .slice(0, conversations.length - 1)
          .map((conversation) => conversation.rating)
          .reduce((previous, current) => previous + current);
        _setLastAvgPercentTalk(
          lastTotalPercentTalk / (conversations.length - 1)
        );
        _setLastAvgSpeed(lastTotalSpeed / (conversations.length - 1));
        _setLastAvgFillerOccurrence(
          lastTotalFillerOccurrence / (conversations.length - 1)
        );
        _setLastAvgRating(lastTotalRating / (conversations.length - 1));
        _setAvgPercentTalk(
          (lastTotalPercentTalk + conversations.slice(-1)[0].percent_talk) /
            conversations.length
        );
        _setAvgSpeed(
          (lastTotalSpeed + conversations.slice(-1)[0].wpm) /
            conversations.length
        );
        _setAvgFillerOccurrence(
          (lastTotalFillerOccurrence +
            conversations.slice(-1)[0].filler_words) /
            conversations.length
        );
        _setAvgRating(
          (lastTotalRating + conversations.slice(-1)[0].rating) /
            conversations.length
        );
        console.log(lastAvgSpeed);
        console.log(avgSpeed);
      }
      _setLoading(false);
    };
    getAvgData();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Average Speaking Proportion"
                  statTitle={`${parseFloat(avgPercentTalk).toFixed(1)}%`}
                  statArrow={
                    lastAvgPercentTalk < avgPercentTalk ? "up" : "down"
                  }
                  statPercent={(
                    (avgPercentTalk - lastAvgPercentTalk) /
                    lastAvgPercentTalk
                  ).toFixed(2)}
                  statPercentColor={`text-${
                    lastAvgPercentTalk < avgPercentTalk ? "green" : "red"
                  }-500`}
                  statDescripiron="Since last week"
                  statIconName="far fa-percent"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Average Talking Speed"
                  statTitle={`${parseFloat(avgSpeed).toFixed(1)} word${
                    avgSpeed === 1 ? "" : "s"
                  } per minute`}
                  statArrow={lastAvgSpeed < avgSpeed ? "up" : "down"}
                  statPercent={(
                    (avgSpeed - lastAvgSpeed) /
                    lastAvgSpeed
                  ).toFixed(2)}
                  statPercentColor={`text-${
                    lastAvgSpeed < avgSpeed ? "green" : "red"
                  }-500`}
                  statDescripiron="Since last time"
                  statIconName="fas fa-tachometer-alt"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Average Occurrence of Filler Words"
                  statTitle={`${avgFillerOccurrence.toFixed(1)} filler word${
                    avgFillerOccurrence === 1 ? "" : "s"
                  } every 30 seconds`}
                  statArrow={
                    lastAvgFillerOccurrence < avgFillerOccurrence
                      ? "up"
                      : "down"
                  }
                  statPercent={(
                    (avgFillerOccurrence - lastAvgFillerOccurrence) /
                    lastAvgFillerOccurrence
                  ).toFixed(2)}
                  statPercentColor={`text-${
                    lastAvgFillerOccurrence < avgFillerOccurrence
                      ? "red"
                      : "green"
                  }-500`}
                  statDescripiron="Since last time"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Average Rating"
                  statTitle={`${parseFloat(avgRating).toFixed(1)}`}
                  statArrow={lastAvgRating < avgRating ? "up" : "down"}
                  statPercent={(
                    (avgRating - lastAvgRating) /
                    lastAvgRating
                  ).toFixed(2)}
                  statPercentColor={`text-${
                    lastAvgRating < avgRating ? "green" : "red"
                  }-500`}
                  statDescripiron="Since last time"
                  statIconName="fas fa-chart-bar"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
