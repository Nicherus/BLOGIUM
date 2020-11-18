import React from 'react';
import Editor from 'react-medium-editor';
import { useUserContext } from '../../../contexts/UserContext';
import editorOptions from './editorOptions';
import Avatar from '../Avatar';
import PostContent from '../PostContent';
import Button from '../Button';
import PostMeta from './PostMeta';
import UserInfo from './UserInfo';
import AuthorLink from './AuthorLink';
import InputFields from './InputFields';
import PostActions from './PostActions';
import CancelLink from './CancelLink';

export default function PostManipulation({
  title,
  onTitleChange,
  coverUrl,
  onCoverUrlChange,
  content,
  onContentChange,
  onPostSaveButtonClick,
  postId,
}) {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <main>
      <PostMeta>
        <UserInfo>
          <Avatar avatarUrl={user.avatarUrl} big circled />
          <AuthorLink to={`/users/${user.id}`}>{user.username}</AuthorLink>
        </UserInfo>
        <InputFields
          title={title}
          coverUrl={coverUrl}
          onTitleChange={(e) => onTitleChange(e.target.value)}
          onCoverUrlChange={(e) => onCoverUrlChange(e.target.value)}
        />
      </PostMeta>
      <PostContent style={{ marginTop: 20 }}>
        <Editor tag="div" text={content} onChange={onContentChange} options={editorOptions} />
      </PostContent>
      <PostActions>
        <Button style={{ marginRight: '10px' }} onClick={onPostSaveButtonClick}>
          Save
        </Button>
        <CancelLink to={postId ? `/posts/${postId}` : '/'}>Cancel</CancelLink>
      </PostActions>
    </main>
  );
}
