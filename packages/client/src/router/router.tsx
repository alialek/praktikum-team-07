import { ForumPage } from '@/pages/ForumPage';
import { ForumsPage } from '@/pages/ForumsPage';
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
  ForumsPagePath,
  EndGamePagePath,
  RootPath,
  LeadersPagePath,
  AuthPath,
  NoneExistPath,
  ChangePasswordPagePath,
  ThreadPagePath,
} from '@/router/paths';
import { Default } from '@/layouts/Default';
import { ChangePasswordPage } from '@/pages/ChangePasswordPage';
import { ThreadPage } from '@/pages/ThreadPage';

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
        path: `${ThreadPagePath.path}/:threadId`,
        element: <ThreadPage />,
      },
      {
        path: `${ForumPagePath.path}/:forumId`,
        element: <ForumPage />,
      },
      {
        path: ForumsPagePath.path,
        element: <ForumsPage />,
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
