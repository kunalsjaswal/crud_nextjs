"use client"

import React, { useState } from 'react'
import style from '../../styles/addTopic.module.css'
import { useRouter } from 'next/navigation';

const AddTopic = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useRouter()

  const onAddClickHandle = async() => {
    if(!title || !description) {
      alert('Please fill in all fields')
      return
    }

    const res = await fetch('/api/topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    })
    
    const data = await res.json();
    if(res.ok) {
      alert('Topic added successfully')
      setTitle('')
      setDescription('')
      
      navigate.push('/');
    } else {
      alert(data.message || 'Something went wrong')
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333' }}>Add Topic</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Topic Title"
        className={style.input}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Topic Description"
        className={style.input}
      />
      <button
        className={style.add_btn}
        onClick={onAddClickHandle}
      >
        Add Topic
      </button>
    </div>
  )
}

export default AddTopic