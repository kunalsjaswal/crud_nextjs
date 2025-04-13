"use client"

import React, { useEffect, useState } from 'react'
import style from '../../../styles/addTopic.module.css'
import { useRouter } from 'next/navigation';
import { log } from 'console';

interface ITopicData {
  _id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Params {
  id: string; 
}

interface EditTopicProps {
  params: Params
}

const EditTopic: React.FC<EditTopicProps> = ({ params }) => {

  const { id } = params;  

  const [topic, setTopic] = useState<ITopicData>({} as ITopicData)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
      getTopicById();

  }, [id])

  const getTopicById = async() => {
    setIsLoading(true)

    const response = await fetch(`/api/topic/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        }
      }
    );

    const data = await response.json()
    if (!response.ok) {
      window.alert('Error fetching topic')
      setIsLoading(false)
      return
    }

    console.log(data);
    
    setTopic(data.data)

    setIsLoading(false)
  }

  const onUpdateClickHandler = async () => {
    setIsLoading(true)

    const response = await fetch(`/api/topic/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: topic.title,
        description: topic.description,
      }),
    });

    if (!response.ok) {
      window.alert('Error updating topic')
      setIsLoading(false)
      return
    }

    window.alert('Topic updated successfully')
    setIsLoading(false)
    setTopic({} as ITopicData)

    router.push('/');
  }


  return (
    <>
    {isLoading && <div>Loading...</div>}

    {
      (!isLoading && topic._id) && (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h2 style={{ color: '#333' }}>Edit Topic</h2>
          <input
            type="text"
            placeholder="Topic Title"
            className={style.input}
            value = {topic.title}
            onChange={(e) => setTopic({ ...topic, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Topic Description"
            value = {topic.description}
            onChange={(e) => setTopic({ ...topic, description: e.target.value })}
            className={style.input}
          />
          <button
            className={style.add_btn}
            onClick={onUpdateClickHandler}
          >
            Update Topic
          </button>
        </div>
      )
    }
    </>

  )
}

export default EditTopic