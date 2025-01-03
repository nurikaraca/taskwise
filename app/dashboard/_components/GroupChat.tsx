"use client"
import Chat from '@/components/chat/Chat'
import useGroupStore from '@/stores/useGroupStore';
import React, { useEffect } from 'react'

const GroupChat = () => {
   const {
      selectedGroup,
      loadSelectedGroup,
    } = useGroupStore()
    
    
    useEffect(() => {
      loadSelectedGroup();
    }, [loadSelectedGroup]);
  return (
    <div className='h-full w-full'>
    {
      selectedGroup && <Chat selectedGroup={selectedGroup} /> 
    }
   
    </div>
  )
}

export default GroupChat