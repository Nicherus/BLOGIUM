import styled from 'styled-components';

const ProfileEditForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 220px;
  padding-top: 30px;

  textarea,
  input[type='text'],
  input[type='url'] {
    display: block;
    border: none;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 0 16px;
    width: 100%;
    height: 37px;
    line-height: 37px;
    font-size: 16px;
  }

  textarea {
    resize: none;
    height: 111px;
  }
`;

export default ProfileEditForm;
