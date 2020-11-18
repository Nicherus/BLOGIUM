import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import Spinner from '../Spinner';
import BlogHeader from './BlogHeader';
import PreContent from '../PreContent';
import Posts from './Posts';
import PostPreview from './PostPreview';

export default function PostList({ name, description, posts, page, postCount, onPageChange }) {
  if (!posts) return <Spinner />;
  const itemsPerPage = 5;

  return (
    <main>
      <BlogHeader name={name} description={description} />
      <PreContent />
      <Posts>
        {posts.length === 0 ? <h2>No stories yet. 😔</h2> : posts.map((p) => <PostPreview post={p} key={p.id} />)}
      </Posts>
      {postCount > itemsPerPage && (
        <PaginationContainer>
          <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={postCount}
            pageRangeDisplayed={3}
            onChange={onPageChange}
            itemClass="label page"
            activeClass="active"
          />
        </PaginationContainer>
      )}
    </main>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  margin-bottom: 40px;

  *:focus {
    outline: none;
  }

  ul {
    display: inline-block;
    padding-left: 15px;
    padding-right: 15px;
  }

  li {
    display: inline-block;
  }

  .label {
    margin: 10px 20px;
    display: inline-block;
    border: 1px solid var(--color-btn-border);
    border-radius: 4px;
    padding: 0 14px;
    height: 33px;
    background-color: transparent;
    line-height: 33px;
    font-size: 16px;
    color: var(--color-link-text);
    cursor: pointer;

    @media (min-width: 768px) {
      padding: 0 16px;
      height: 37px;
      line-height: 37px;
    }
  }

  .page {
    margin: 0 3px;
  }

  .active {
    background-color: var(--color-btn-border);

    a {
      color: white;
    }
  }
`;
