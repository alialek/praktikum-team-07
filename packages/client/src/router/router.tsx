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
} from '@/router/paths';
import { Default } from '@/layouts/Default';

export const router = () => [
  {
    path: RootPath.path,
    element: <Default />,
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
    ],
  },
  {
    path: AuthPath.path,
    element: <Default />,
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
