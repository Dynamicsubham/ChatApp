import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';


const Messages = () => {
  const [messages ,setMessages] = useState(null);
  const { chatId } = useParams();
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');
    
    messagesRef.orderByChild('roomId').equalTo(chatId).on('value', (snap) => {
      const data = transformToArrWithId(snap.val());
      setMessages(data);

    })

    return () => {
      messagesRef.off('value');
    }
    

  }, [chatId])


  return (
    <ul className='msg-list custom-scroll'>

      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && messages.map(msg => <MessageItem key={msg.id} messages={msg} /> )}
      
    </ul>
  )
}

export default Messages
