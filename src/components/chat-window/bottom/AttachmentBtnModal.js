import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite'
import { useModelState } from '../../../misc/customhooks'
import { storage } from '../../../misc/firebase';
import { isAwaitExpression } from 'typescript';


const MAX_FILE_SIZE = 1000 * 1024 * 5 ;
 
const AttachmentBtnModal = ({afterUpload}) => {
  const {chatId} = useParams();
  const [isLoading, setIsLoading ] = useState(false);
   const {isOpen , open , close} = useModelState();
   const [fileList, setFileList] = useState([]);
   const onChange = (fileArr) => {
      const filtered = fileArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0,5);
      setFileList(filtered);
   };

   const onUpload = async () => {
    setIsLoading(true);
     try {

      const uploadPromises = fileList.map(f => {
        return storage.ref(`/chat/$chatId}`)
        .child(Date.now() + f.name)
        .put(f.blobFile, {
          cacheControl: `public , max-age=${3600 * 24 * 3}`,
      });
      });

      const uploadSnapShots = await Promise.all(uploadPromises);
      const shapePromises = uploadSnapShots.map(async snap => {
        return {
          contentType : snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL()
        }
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);

      setIsLoading(false);

      close();


      
     } catch (err) {
      setIsLoading(false);
      Alert.error(err.message);

      
     }
   }


  return (
    <>
      <InputGroup.Button onClick={open}>
       <Icon icon='attachment' />
      </InputGroup.Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>


        <Modal.Body>
            <Uploader
            className='w-100' 
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
            disabled={isLoading}
            />
        </Modal.Body>


        <Modal.Footer>
            <Button block disabled={isLoading} onClick={onUpload}>Send to chat</Button>
            <div className='text-right mt-2'>
                <small>* only files less than 5mb</small>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal
