import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/shared/Spinner';
import { useUserContext } from '../contexts/UserContext';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from '../components/shared/PostManipulation';

export default function PostEdit() {
  const { user } = useUserContext();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();


useEffect(() => {
  setSaveButtonDisable(true);
    
  axios.get(`http://localhost:3000/api/posts/${postId}`)
  .then(({data}) => {
    setPost(data);
    setSaveButtonDisable(false);
    setTitle(data.title);
    setCoverUrl(data.coverUrl);
    setContent(data.content);
  })
  .catch((error) => {
    console.log(error);
  });
}, []);

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

    setSaveButtonDisable(true);
    
    axios.put(`http://localhost:3000/api/posts/${postId}`, body, {
      headers:{
        Authorization: user.token,
      }
    })
    .then(({data}) => {
      setPost(data);
      setSaveButtonDisable(false);
      history.push(`/posts/${postId}`);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
      isSaveButtonDisabled={isSaveButtonDisabled}
    />
  );
}
