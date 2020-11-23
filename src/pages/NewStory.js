import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import PostManipulation from '../components/shared/PostManipulation';

export default function PostEdit() {
  const { user } = useUserContext();
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  if (!user) {
    alert('User not found...');
    history.push('/');
  }


  function onPostSaveButtonClick() {
    const body = {
      'coverUrl': coverUrl,
      'title': title,
      'content': content,
    };

    if(coverUrl === '' && title === '' && content === ''){
      return alert('Fill all the fields');
    }

    try{
      setSaveButtonDisable(true);
      const data = await axios.post(`http://localhost:3000/api/posts/`, body, {
        headers:{
          Authorization: user.token,
        }
      });
      if(data){
        setUser({...data, token: user.token});
        history.push(`/posts/${data.id}`);
      }
    } catch(error){
      setError(error);
      alert('Verifique sua internet!');
    }
  }

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      isSaveButtonDisabled={isSaveButtonDisabled}
    />
  );
}
