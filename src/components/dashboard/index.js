import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';


const Dashboard = ({onSignOut}) => {
const {profile} = useProfile();
const onSave = async newData => {
    const userNickNameRef = database.ref(`/profiles/${profile.uid}`).child('name');

    try{
        await userNickNameRef.set(newData);
        Alert.success('NickName has been Updated' , 4000);
    }catch(err) {
        Alert.error(err.message , 4000);
    }
};
    
  return <>
  <Drawer.Header>
    <Drawer.Title>Dashboard</Drawer.Title>
  </Drawer.Header>


  <Drawer.Body>
    <h3>Hey , {profile.name}</h3>
    <ProviderBlock />
    <Divider />
    <EditableInput 
      name="nickname"
      initailValue={profile.name} 
      onSave={onSave}
      label={<h6 className="mb-2">NickName</h6>}
    />
    <AvatarUploadBtn />
  </Drawer.Body>


  <Drawer.Footer>
<Button block color='red' onClick={onSignOut}>
    Sign Out
    </Button>

  </Drawer.Footer>
  </>
};

export default Dashboard;
