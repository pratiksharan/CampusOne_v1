import { createBrowserRouter, Navigate } from 'react-router';
import Layout from './components/Layout';
import Home from './screens/Home';
import Events from './screens/Events';
import Academics from './screens/Academics';
import StudyGroups from './screens/StudyGroups';
import Internships from './screens/Internships';
import AskSeniors from './screens/AskSeniors';
import LostFound from './screens/LostFound';
import CreatePost from './screens/CreatePost';
import Clubs from './screens/Clubs';
import Profile from './screens/Profile';
import Login from './screens/Login';
import EOLClub from './screens/EOLClub';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: () => {
          const isLoggedIn = localStorage.getItem('campusone_auth');
          return isLoggedIn ? <Home /> : <Navigate to="/login" replace />;
        },
      },
      { path: 'events', Component: Events },
      { path: 'academics', Component: Academics },
      { path: 'study-groups', Component: StudyGroups },
      { path: 'internships', Component: Internships },
      { path: 'ask-seniors', Component: AskSeniors },
      { path: 'lost-found', Component: LostFound },
      { path: 'create-post', Component: CreatePost },
      { path: 'clubs', Component: Clubs },
      { path: 'clubs/eol', Component: EOLClub },
      { path: 'profile', Component: Profile },
    ],
  },
]);