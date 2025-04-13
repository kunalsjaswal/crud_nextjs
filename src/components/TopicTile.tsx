"use client"

import React from 'react'
import style from '../styles/topicTile.module.css'
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi'
import Link from 'next/link'
import { ITopicData } from '@/app/page'

interface TopicTileProps {
  topic: ITopicData,
  onDelete : (id: number) => void
}

const TopicTile: React.FC<TopicTileProps> = ({ topic, onDelete}) => {
  const { _id, title, description } = topic

  const onDeleteClickHandler = async () => {

    const confirm = window.confirm('Are you sure you want to delete this topic?')

    if(!confirm) return;
    
    const result = await fetch(`/api/topic/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!result.ok) {
      window.alert('Error deleting topic')
      return
    }

    onDelete(_id);
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h2 style={{margin: 0}}>{ title }</h2>
        <p>{ description }</p>
      </div>
      <div className={style.actions}>
        <Link href={`/edit-topic/${_id}`} style={{textDecoration: 'none', color: 'white'}}>
          <HiPencilAlt size={24}/>
        </Link>
        <button onClick = {onDeleteClickHandler} style={{background: 'transparent', border: 0, cursor: "pointer", color: '#f54646'}}>
          <HiOutlineTrash size={24}/>
        </button>
      </div>
    </div>
  )
}

export default TopicTile