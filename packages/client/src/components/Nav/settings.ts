import { FORUM_TEXT, LEADERS_TEXT, LOGOUT_TEXT, PROFILE_TEXT } from '@/сonstants/text';
import {
  ForumPagePath,
  LeadersPagePath,
  ProfilePagePath,
  SigninPagePath,
} from '@/router/paths';

export const SETTINGS = [
  {
    title: PROFILE_TEXT,
    link: ProfilePagePath.path,
  },
  {
    title: LEADERS_TEXT,
    link: LeadersPagePath.path,
  },
  {
    title: FORUM_TEXT,
    link: ForumPagePath.path,
  },
  {
    title: LOGOUT_TEXT,
    link: SigninPagePath.path,
  },
];
