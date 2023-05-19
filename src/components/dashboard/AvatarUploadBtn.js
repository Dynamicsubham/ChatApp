import React, { useState, useRef} from 'react'
import { useModelState } from '../../misc/customhooks';
import { Modal, Alert, Button } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { storage, database } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';


const fileInputTypes= ".png , .jpeg , .jpg";
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpg'];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);



const getBlob = (canvas) => {
    return new Promise((resolve , reject) => {

        canvas.toBlob((blob) => {
            if(blob) {
                resolve(blob);
            } else {
                reject(new Error(`File Process error`));
            }
        });
    });
};

const AvatarUploadBtn = () => {
    const {isOpen , open , close}= useModelState();
    
    const [isLoading , setIsLoading] = useState(false);
    
    const {profile} = useProfile();

    const [img, setImg] = useState(null);

    const avatarEditiorRef = useRef();

    const onFileInputChange = ev => {

        const currFiles = ev.target.files;
        if(currFiles.length === 1) {
            const file = currFiles[0];

            if(isValidFile(file)) {
                setImg(file);
                open();

        } else {
            Alert.warning(`Wrong File Type ${file.type}`, 4000);
        }
    }
};


const onUploadClick = async () => {

    const canvas = avatarEditiorRef.current.getImageScaledToCanvas();
    setIsLoading(true);

    try{
       

        const blob = await getBlob(canvas);
        
        const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');

        const uploadAvatarResult = await avatarFileRef.put( blob, {
             cacheControl :  `public, max-age==${3600 * 24 * 3}`
        });

        const downloadUrl = await uploadAvatarResult.ref.getDownloadURL()

        const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');

        await userAvatarRef.set(downloadUrl);

        setIsLoading(false);

        Alert.info('Avatar has been uploaded' , 4000);

    } catch(err) {
        setIsLoading(false);
        Alert.error(err.message,4000);
    }

 };

  return (
    <div className="mt-3 text-center">

        <div>

            <label htmlFor="avatar-upload" 
            className="d-block cursor-pointer padded">
                Select New Avatar
                <input id="avatar-upload"
                type="file"
                className="d-none"
                accept={fileInputTypes}
                onChange={onFileInputChange}/>
            </label>

            <Modal show={isOpen} onHide={close}>

                <Modal.Header>
                    <Modal.Title>
                        Adjust and Upload new avatar
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="d-flex justify-content-center align-center h-100">
                        {img && (
                        <AvatarEditor
                        ref={avatarEditiorRef}
                       image={img}
                       width={200}
                       height={200}
                       border={10}
                       borderRadius={100}
                     />
                    )}
                    </div>
                    
                </Modal.Body>


                <Modal.Footer>
                    <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
                        Upload New Avatar
                    </Button>
                </Modal.Footer>


            </Modal>
        </div>
      
    </div>
  );
};

export default AvatarUploadBtn;