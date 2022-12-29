import * as Yup from 'yup';
import {
  REQUIRED_VALUE_MESSAGE,
  EMAIL_VALUE_MESSAGE,
  MIN_MESSAGE,
  MAX_MESSAGE,
  PHONE_VALUE_MESSAGE,
  REPEATE_PASSWORD_MESSAGE,
  NOTMUTCH_PASSWORD_MESSAGE,
} from '@/сonstants/validationMessages';
import { PHONE_REGEX } from '@/сonstants/main';

export const signupFormValidationSchema = Yup.object({
  first_name: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(2, `${MIN_MESSAGE}2`)
    .max(20, `${MAX_MESSAGE}20`),
  second_name: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(2, `${MIN_MESSAGE}2`)
    .max(20, `${MAX_MESSAGE}20`),
  login: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(6, `${MIN_MESSAGE}6`)
    .max(20, `${MAX_MESSAGE}20`),
  email: Yup.string().required(REQUIRED_VALUE_MESSAGE).email(EMAIL_VALUE_MESSAGE),
  phone: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .matches(PHONE_REGEX, PHONE_VALUE_MESSAGE),
  password: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(6, `${MIN_MESSAGE}6`)
    .max(40, `${MAX_MESSAGE}40`),
});

export const signinFormValidationSchema = Yup.object({
  login: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(6, `${MIN_MESSAGE}6`)
    .max(20, `${MAX_MESSAGE}20`),
  password: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(6, `${MIN_MESSAGE}6`)
    .max(40, `${MAX_MESSAGE}40`),
});

export const profileValidationSchema = Yup.object({
  first_name: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(2, `${MIN_MESSAGE}2`)
    .max(20, `${MAX_MESSAGE}20`),
  second_name: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(2, `${MIN_MESSAGE}2`)
    .max(20, `${MAX_MESSAGE}20`),
  login: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(6, `${MIN_MESSAGE}6`)
    .max(20, `${MAX_MESSAGE}20`),
  email: Yup.string().required(REQUIRED_VALUE_MESSAGE).email(EMAIL_VALUE_MESSAGE),
  phone: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .matches(PHONE_REGEX, PHONE_VALUE_MESSAGE),
  display_name: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(2, `${MIN_MESSAGE}2`)
    .max(20, `${MAX_MESSAGE}20`),
});

export const passwordValidationSchema = Yup.object({
  oldPassword: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(6, `${MIN_MESSAGE}6`)
    .max(40, `${MAX_MESSAGE}40`),
  newPassword: Yup.string()
    .required(REQUIRED_VALUE_MESSAGE)
    .min(6, `${MIN_MESSAGE}6`)
    .max(40, `${MAX_MESSAGE}40`),
  newPasswordRepeat: Yup.string()
    .required(REPEATE_PASSWORD_MESSAGE)
    .oneOf([Yup.ref('newPassword')], NOTMUTCH_PASSWORD_MESSAGE),
});
