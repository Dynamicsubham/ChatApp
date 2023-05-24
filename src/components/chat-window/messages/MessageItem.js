import React, { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModel from './ProfileInfoBtnModel';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import { useHover, useMediaQuery } from '../../../misc/customhooks';
import IconBtnControl from './IconBtnControl';
import ImgBtnModal from './ImgBtnModal';

const renderFileMessage = (file) => {
  
  if(file.contentType.includes('image')) {
    return (
      <div className='height-220'>
      <ImgBtnModal
      src={file.url} 
      fileName={file.name} />
      </div>
    );
  };



  return <a href={file.url}> Download{file.name}</a>
}



const MessageItem = ({ messages , handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, file, likes, likeCount} = messages;
  const [selfRef , isHovered] = useHover();
  const isMobile = useMediaQuery(('(max-width: 992px)'));
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const canShowIcons = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-05' : ''}`} ref={selfRef}>
      <div className='d-flex align-items-center font-bolder mb-1'>
        <PresenceDot uid={author.uid} />

        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs" />

        <ProfileInfoBtnModel 
        profile={author} 
        appearance="link" 
        className='p-0 ml-1 text-black' 
        >
          {canGrantAdmin && 
          <Button block onClick={() => handleAdmin(author.uid)} color='blue'>
            {isMsgAuthorAdmin ? 'Remove admin permission' : 'Give admin permission'}
            </Button>}
          
        </ProfileInfoBtnModel>
        <TimeAgo
        datetime={createdAt} 
        className="font-normal text-black-45 ml-2" 
        />

        <IconBtnControl
        // eslint-disable-next-line no-constant-condition
        {...(isLiked ? {color: 'red'} : {})}
        isVisible={canShowIcons}
        iconName="heart"
        tooltip="Like this message"
        onClick={() => handleLike(messages.id)}
        badgeContent={likeCount}
        />

        {isAuthor && 
        <IconBtnControl
        // eslint-disable-next-line no-constant-condition
        isVisible={canShowIcons}
        iconName="trash"
        tooltip="Delete this message"
        onClick={() => handleDelete(messages.id)}
        />}

      </div>

      
        <div>
          {text && 
          
          <span className='word-break-all'>{text}</span>}

          {file && 
          renderFileMessage(file)
          }
            
        </div>
    </li>
  )
}

export default memo(MessageItem);
