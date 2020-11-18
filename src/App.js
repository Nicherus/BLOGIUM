import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyle from './assets/styles/globals';
import Header from './components/shared/Header';
import Home from './pages/Home';
import BlogShow from './pages/BlogShow';
import PostShow from './pages/PostShow';
import PostEdit from './pages/PostEdit';
import NewStory from './pages/NewStory';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ProfileEdit from './pages/ProfileEdit';
import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route path="/users/:userId" component={BlogShow} />
            <Route path="/posts/:postId/edit" component={PostEdit} />
            <Route path="/posts/:postId" component={PostShow} />
            <Route path="/new-story" component={NewStory} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/edit" component={ProfileEdit} />
            <Route path="/" component={Home} />
          </Switch>
        </>
      </Router>
    </UserProvider>
  );
}
