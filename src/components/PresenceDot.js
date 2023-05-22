import React from 'react'
import { usePresence } from '../misc/customhooks';
import { Badge, Tooltip, Whisper } from 'rsuite';


const getColor = (presence) => {
  if(!presence) {
    return 'black';
  }

  switch(presence.state) {
    case 'online':  return 'green';
    case 'offline': return 'red';
    default: return 'grey';
  }
};

const getText = (presence) => {
  if(!presence) {
    return 'Unknown state';
  }

  return presence.state === 'online' ? 'Online' : `Last online ${new Date(presence.last_changed).toLocaleDateString()}`;
 
}

const PresenceDot = ({ uid }) => {
  
  const presence = usePresence(uid);

  return (
    <Whisper 
    placement='top'
    trigger='hover'
    speaker={
    
    <Tooltip>
      {getText (presence)}
    </Tooltip>} >

      <Badge className='cursor-pointer' style={{backgroundColor: getColor(presence)}} />
    </Whisper>
  )
}

export default PresenceDot;
