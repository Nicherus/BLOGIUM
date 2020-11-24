import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Account from '../../components/shared/Account';
import SignContainer from '../../components/shared/SignContainer';
import SignUpForm from './SignUpForm';
import Button from '../../components/shared/Button';
import ButtonBox from '../../components/shared/ButtonBox';
import ErrorBox from '../../components/shared/ErrorBox';
import { useUserContext } from '../../contexts/UserContext';

export default function SignUp() {
  const { user, setUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [biography, setBiography] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  if (user) {
    history.push(`/users/${user.id}`);
  }

  const register = (event) => {
    event.preventDefault();
    const body = {
      'email': email,
      'username': username,
      'avatarUrl': avatarUrl,
      'biography': biography,
      'password': password,
      'passwordConfirmation': passwordConfirmation,
    };

    axios.post(`http://localhost:3000/api/users/sign-up`, body)
    .then(({data}) => {
      setUser(data);
      // history.push('/sign-in');
    })
    .catch((error) => {
      setError(error)
      alert('Verifique sua internet!');
    });
  }

  return (
    <SignContainer screenRegistration>
      <h1>Join Blogium</h1>
      <h2>
        Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories
        you love, and more.
      </h2>
      <SignUpForm onSubmit={(e => register(e))}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="Your name"
          required
        />
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Avatar url"
          required
        />
        <textarea
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          placeholder="Talk about you"
          rows="4"
          cols="50"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <ButtonBox>
          <Button type={"submit"} >Sign up</Button>
        </ButtonBox>
        {error && <ErrorBox>{error}</ErrorBox>}
      </SignUpForm>
      <Account screenRegistration>
        Already have an account?
        <br />
        <Link to="/login">Sign In</Link>
      </Account>
    </SignContainer>
  );
}
