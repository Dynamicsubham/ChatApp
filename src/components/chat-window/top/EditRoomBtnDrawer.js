import React, {memo} from 'react';
import { Alert, Button, Drawer } from 'rsuite';
import {useParams} from 'react-router-dom';
import { useMediaQuery, useModelState } from '../../../misc/customhooks';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/current-room.context';
import { database } from '../../../misc/firebase';

const EditRoomBtnDrawer = () => {
    const isMobile = useMediaQuery('(max-width: 992px)');
    const {isOpen, open, close} = useModelState();
    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);

    const {chatId} = useParams();
    

    const updateData = (key, value) => {
        database.ref(`rooms/${chatId}`).child(key).set(value).then(() => {
            Alert.success('Successfully Updates', 4000);
        }).catch (err => {
            Alert.error(err.message, 4000);
        }) 
    }

    const onNameSave = (newName) => {
        updateData('name' , newName);
    }

    const onDescriptionSave = (newDesc) => {
        updateData('description' ,newDesc)
    }



  return (
    <div>
      <Button className='br-circle' size='sm' color='red' onClick={open} >
        A
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement='right'>
        <Drawer.Header>
          <Drawer.Title>
            Edit Room
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput 
          initailValue={name} onSave={onNameSave} 
          label={<h6 className='mb-2'>Name</h6>} 
          emptyMsg='Name cannot be empty'
          />
          <EditableInput 
          componentClass="textarea"
          rows={5}
          initailValue={description} 
          onSave={onDescriptionSave}
          emptyMsg='Discription cannot be empty'
          wrapperClassName='mt-3'
          />
        </Drawer.Body>
        <Drawer.Footer>
            <Button block onClick={close}> Close </Button>
        </Drawer.Footer>

      </Drawer>


    </div>
  )
}

export default memo(EditRoomBtnDrawer);
