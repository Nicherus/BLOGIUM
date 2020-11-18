import styled from 'styled-components';

const SignInForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 220px;
  padding-top: 30px;

  input[type='text'],
  input[type='email'],
  input[type='password'] {
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
`;

export default SignInForm;
