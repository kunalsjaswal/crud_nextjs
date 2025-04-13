"use client";

import TopicTile from "@/components/TopicTile";
import style from "./page.module.css";
import React, { useEffect, useState } from "react";

export interface ITopicData {
  _id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITopicResponse {
  count: number;
  topics: ITopicData[];
}

export interface IResponse {
  status: number;
  data: ITopicResponse | any;
  timestamp: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [topicData, setTopicData] = useState<ITopicData[]>([]);

  useEffect(() => {
    getTopicList();
  }, []);

  const getTopicList = async () => {
    setIsLoading(true);
    const result = await fetch("/api/topic", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!result.ok) {
      setTopicData([]);
      window.alert("Error fetching topics");
      setIsLoading(false);
      return;
    }

    const json: IResponse = await result.json();
    
    const topics: ITopicData[] = json.data.topics;

    setTopicData(topics);
    setIsLoading(false);
  };

  const handleDelete = (id: number) => {
    setTopicData((prevData) => prevData.filter((topic) => topic._id !== id));
  };

  return (
    <div>
      {isLoading && <div className={style.loading}>Loading...</div>}
      {topicData.length === 0 && !isLoading && (
        <div className={style.empty}>No topics available</div>
      )}

      {topicData.length > 0 && !isLoading && (
        <section className={style.scrollable}>
          {topicData.map((topic) => (
            <React.Fragment key={topic._id}>
              <TopicTile  topic = {topic} onDelete = {handleDelete}/>
            </React.Fragment>
          ))}
        </section>
      )}
    </div>
  );
}
