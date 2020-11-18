import React from 'react';
import styled from 'styled-components';
import Avatar from '../../components/shared/Avatar';
import { Link } from 'react-router-dom';

export default function AuthorInfo({ post }) {
  const { author } = post;

  return (
    <Container>
      <Avatar big circled href="https://blog.kentcdodds.com/@kentcdodds" avatarUrl={author.avatarUrl} />
      <Text>
        <Title>
          <Link to={`/users/${author.id}`}>{author.username}</Link>
        </Title>
        <Description>{author.biography}</Description>
      </Text>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  margin: 20px auto;
  padding: 20px 20px 10px;
  max-width: 740px;

  :global(.avatar) {
    flex: 0 0 auto;
    align-self: center;
  }

  @media (min-width: 768px) {
    padding-top: 35px;
  }
`;

const Text = styled.div`
  flex: 1 1 auto;
  padding-left: 15px;
  font-size: 16px;
  line-height: 20px;
`;

const Title = styled.div`
  a {
    color: var(--color-font-primary);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Description = styled.div`
  color: var(--color-font-secondary);
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
