import React, { useState , useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { auth, database, storage } from '../../../misc/firebase';
import { groupBy, transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';


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
    

  }, [chatId]);


const handleAdmin = useCallback(async (uid) => {
  const adminsRef = database.ref(`/rooms/${chatId}/admins`);

  let alertMsg;


  await adminsRef.transaction(admins => {
    if(admins) {
      if(admins[uid]) {
        admins[uid] = null;
        alertMsg = 'Admin permission removed';
      } else {
        admins[uid] = true;
        alertMsg = 'Admin permission granted';
      }
    }
    return admins;
  });

  Alert.info(alertMsg, 4000)


},[chatId]);

const handleLike = useCallback(async (msgId) => {
  const {uid} = auth.currentUser;
  const messageRef = database.ref(`/messages/${msgId}`);

  let alertMsg;


  await messageRef.transaction(msg => {
    if(msg) {
      if(msg.likes && msg.likes[uid]) {
        msg.likeCount -= 1;
        msg.likes[uid] = null;
        alertMsg = 'Like removed';
      } else {
        msg.likeCount += 1;
        if(!msg.likes) {
          msg.likes = {};
        }
        msg.likes[uid] = true;
        alertMsg = 'Liked Message';
      }
    }
    return msg;
  });

  Alert.info(alertMsg, 4000)
}, []);


const handleDelete = useCallback(async (msgId , file) => {
  if(!window.confirm('Delete this message?')) {
    return;
  }
  
  const isLast = messages[messages.length - 1].id === msgId;
  const updates = {};

  updates[`/messages/${msgId}`] = null;

  if(isLast && messages.length > 1) {
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...messages[messages.length - 2],
      msgId: messages[messages.length - 2].id
    }
  }

  if(isLast && messages.length === 1) {
    updates[`/rooms/${chatId}/lastMessage`] = null;

  }

  try{
    await database.ref().update(updates);
    Alert.info('Message deleted');
  } catch (err) {
    return Alert.error(err.messages, 4000);
  }

  if(file) {
    try {
      const fileRef = storage.refFromURL(file.url);
      await fileRef.delete();
      Alert.info('Message deleted');
  } catch (err) {
    Alert.error(err.messages, 4000);
  }
}
  
}, [chatId , messages]);

const renderMessages = () => {
  const groups = groupBy(messages, (item) => new Date(item.createdAt).toDateString());
  let items = [];

  Object.keys(groups).forEach((date) => {
    items.push(
    <li key={date}
      className='text-center mb-1 padded'>
        {date}
    </li>
    );
    
    const msgs = groups[date]
    .map(msg => (
      <MessageItem 
      key={msg.id} 
      messages={msg} 
      handleAdmin={handleAdmin} 
      handleLike={handleLike}
      handleDelete={handleDelete}
      /> ));

      items.push(...msgs);
      
  })

  return items;

};




  return (
    <ul className='msg-list custom-scroll'>

      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && renderMessages()}
      
    </ul>
  )
}

export default Messages
