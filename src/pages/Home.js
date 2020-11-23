import React, { useState, useEffect } from 'react';
import PostList from '../components/shared/PostList';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(null);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const postsPerPage = 5;

  useEffect(() => {
    // getPages();
  }, [page])

  async function getPages(){
    try{
      const data = await axios.get(`http://localhost:3000/api/posts/?offset=${offset}&limit=${postsPerPage}`);
      if(data){
        setPosts(data);
      }
    } catch(error){
      setError(error)
      alert('Verifique sua internet!');
    }
  }

  function onPageChange(newPage) {
    setOffset(offset + 5);
    setPage(newPage);
  }

  return (
    <PostList name="Daily stories" posts={posts} page={page} onPageChange={onPageChange} postCount={numberOfPosts} />
  );
}
