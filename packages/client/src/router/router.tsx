import { Navigate } from 'react-router-dom';
import { ForumPage } from '@/pages/ForumPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SigninPage } from '@/pages/SigninPage';
import { SignupPage } from '@/pages/SignupPage';
import { EndGamePage } from '@/pages/EndGamePage';
import { LeadersPage } from '@/pages/LeadersPage';
import {
  SigninPagePath,
  SignupPagePath,
  ProfilePagePath,
  ForumPagePath,
  EndGamePagePath,
  RootPath,
  LeadersPagePath,
  AuthPath,
  NoneExistPath,
  ChangePasswordPagePath,
} from '@/router/paths';
import { Default } from '@/layouts/Default';
import { ChangePasswordPage } from '@/pages/ChangePasswordPage';

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
      {
        path: LeadersPagePath.path,
        element: <LeadersPage />,
      },
      {
        path: ChangePasswordPagePath.path,
        element: <ChangePasswordPage />,
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
  {
    path: NoneExistPath.path,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: NoneExistPath.path,
        element: <NotFoundPage />,
      },
    ],
  },
];
