import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import PreContent from '../../components/shared/PreContent';
import AuthorInfo from './AuthorInfo';
import PostImage from './PostImage';
import PostText from './PostText';
import Claps from './Claps';
import Spinner from '../../components/shared/Spinner';
import Button from '../../components/shared/Button';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

export default function PostShow() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useUserContext();
  const history = useHistory();

  function onEditButtonClick() {
    history.push(`/posts/${postId}/edit`);
  }

  function onDeleteButtonClick() {}

  if (!post) return <Spinner />;

  const isAdmin = user && user.id === post.author.id;

  return (
    <main>
      <PreContent />
      <article>
        <section>
          <PostImage coverUrl={post.coverUrl} />
          <EditionContainer isAdmin={isAdmin}>
            {user && <Claps post={post} />}
            {isAdmin && (
              <div>
                <Button
                  style={{ color: 'orange', borderColor: 'orange' }}
                  onClick={onEditButtonClick}
                  style={{ marginRight: 10 }}
                >
                  Edit
                </Button>
                <Button style={{ color: 'red', borderColor: 'red' }} onClick={onDeleteButtonClick}>
                  Delete
                </Button>
              </div>
            )}
          </EditionContainer>
          <PostText post={post} />
        </section>
        <AuthorInfo post={post} />
      </article>
    </main>
  );
}

const EditionContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px 40px;
  max-width: 740px;
  display: flex;
  align-items: center;
  ${({ isAdmin }) => (isAdmin ? 'justify-content: space-between' : 'justify-content: flex-start')}
`;
