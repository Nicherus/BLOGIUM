import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ImageLink from './ImageLink';
import Content from './Content';
import TextLink from './TextLink';
import Meta from './Meta';
import SubMeta from './SubMeta';
import OverlayBorder from './OverlayBorder';
import Avatar from '../../Avatar';
import { Link } from 'react-router-dom';

export default function PostPreview({ post }) {
  return (
    <Container>
      <ImageLink to={`/posts/${post.id}`}>
        <OverlayBorder />
        <img src={post.coverUrl} alt="blog post cover image" />
      </ImageLink>
      <Content>
        <TextLink to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
          <p>{post.contentPreview}</p>
        </TextLink>
        <Meta>
          <Avatar small circled avatarUrl={post.author.avatarUrl} />
          <SubMeta>
            <Link to={`/users/${post.author.id}`}>{post.author.username}</Link>
            <span>{dayjs(post.publishedAt).format('DD/MM/YYYY')}</span>
          </SubMeta>
        </Meta>
      </Content>
    </Container>
  );
}

const Container = styled.article`
  margin-bottom: 25px;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`;
