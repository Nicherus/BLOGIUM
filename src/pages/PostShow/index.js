import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalFooter from 'react-bootstrap/ModalFooter';
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onEditButtonClick() {
    history.push(`/posts/${postId}/edit`);
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/api/posts/${postId}`)
    .then(({data}) => {
      setPost(data);
    })
    .catch((error) => {
      console.log(error);
      alert('Verifique sua internet!');
    });
  }, [])



  function onDeleteButtonClick() {
    axios.delete(`http://localhost:3000/api/posts/${postId}`, {
      headers:{
        Authorization: user.token,
      }
    })
    .then(({data}) => {
      alert(data);
      history.push(`/`);
    })
    .catch((error) => {
      console.log(error);
      alert('Verifique sua internet!');
    });
  }

  if (!post) return <Spinner />;

  const isAdmin = user && user.id === post.author.id;

  return (
    <main>
      <PreContent />
      <article>
        <section>
          <PostImage coverUrl={post.coverUrl} />
          <Modal centered aria-labelledby="example-modal-sizes-title-lg" show={show} onHide={handleClose}>
            <ModalHeader closeButton>
              <ModalTitle>Please Confirm</ModalTitle>
            </ModalHeader>
            <Modal.Body>Are you sure do you want to delete this post?</Modal.Body>
            <ModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onDeleteButtonClick}>
                Delete
              </Button>
            </ModalFooter>
          </Modal>
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
                <Button style={{ color: 'red', borderColor: 'red' }} onClick={handleShow}>
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
