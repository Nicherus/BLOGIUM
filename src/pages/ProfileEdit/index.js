import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SignContainer from '../../components/shared/SignContainer';
import Button from '../../components/shared/Button';
import ButtonBox from '../../components/shared/ButtonBox';
import ErrorBox from '../../components/shared/ErrorBox';
import ProfileEditForm from './ProfileEditForm';
import { useUserContext } from '../../contexts/UserContext';

export default function ProfileEdit() {
  const { user, setUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [biography, setBiography] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  if (!user) {
    history.push('/');
    return null;
  }

  const editUser = async () => {
    const body = {
      'username': username,
      'avatarUrl': avatarUrl,
      'biography': biography,
    };

    try{
      const data = await axios.put(`http://localhost:3000/api/users/`, body, {
        headers:{
          Authorization: user.token,
        }
      });
      if(data){
        setUser({...data, token: user.token});
        history.push(`/users/${data.id}`);
      }
    } catch(error){
      setError(error);
      alert('Verifique sua internet!');
    }
  }

  return (
    <SignContainer>
      <h1>Profile Edit</h1>
      <ProfileEditForm>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="Your name"
          required
        />
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Avatar url"
          required
        />
        <textarea
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          placeholder="Talk about you"
          rows="4"
          cols="50"
          required
        />
        <ButtonBox>
          <Button onClick={() => editUser()} >Confirm</Button>
        </ButtonBox>
        {error && <ErrorBox>{error}</ErrorBox>}
      </ProfileEditForm>
    </SignContainer>
  );
}
