import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/shared/PostList';
import axios from 'axios';

export default function BlogShow() {
  const params = useParams();
  const userId = params.id;

  const [posts, setPosts] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(null);
  const [page, setPage] = useState();
  const [offset, setOffset] = useState(0);
  const postsPerPage = 5;


  useEffect(() => {
    getPages();
  }, [page])

  function getPages (){
    try{
      const data = axios.get(`http://localhost:3000/api/users/${userId}/posts/?offset=${offset}limit=${postsPerPage}`);
      if(data){
        setPosts(data);
      }
    } catch(error){
      console.log(error);
      alert('Verifique sua internet!');
    }
  }

  function onPageChange(newPage) {
    setOffset(offset + 5);
    setPage(newPage);
  }

  return (
    <PostList
      name="Daily stories by user"
      posts={posts}
      page={page}
      onPageChange={onPageChange}
      postCount={numberOfPosts}
    />
  );
}
