import React, { useState, useEffect } from 'react';
import PostList from '../components/shared/PostList';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  function onPageChange(newPage) {
    setPage(newPage);
  }

  return (
    <PostList name="Daily stories" posts={posts} page={page} onPageChange={onPageChange} postCount={numberOfPosts} />
  );
}
