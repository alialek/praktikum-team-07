import { Navigate } from 'react-router-dom';
import { ForumPage } from '@/pages/ForumPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SigninPage } from '@/pages/SigninPage';
import { SignupPage } from '@/pages/SignupPage';
import { EndGamePage } from '@/pages/EndGamePage';
import {
  SigninPagePath,
  SignupPagePath,
  ProfilePagePath,
  ForumPagePath,
  EndGamePagePath,
  RootPath,
  AuthPath,
} from '@/router/paths';
import { Default } from '@/layouts/Default';

export const router = (isLoggedIn: boolean) => [
  {
    path: RootPath.path,
    element: isLoggedIn ? <Default /> : <Navigate to={SigninPagePath.path} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ProfilePagePath.path,
        element: <ProfilePage />,
      },
      {
        path: ForumPagePath.path,
        element: <ForumPage />,
      },
      {
        path: EndGamePagePath.path,
        element: <EndGamePage />,
      },
    ],
  },
  {
    path: AuthPath.path,
    element: !isLoggedIn ? <Default /> : <Navigate to={RootPath.path} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: SigninPagePath.path,
        element: <SigninPage />,
      },
      {
        path: SignupPagePath.path,
        element: <SignupPage />,
      },
    ],
  },
];
