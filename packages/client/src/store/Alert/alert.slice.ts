import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export const ENQUEUE_SNACKBAR = 'enqueueSnackbar';
export const CLOSE_SNACKBAR = 'closeSnackbar';
export const REMOVE_SNACKBAR = 'removeSnackbar';

export interface Notification {
  key: string;
  message: string;
  options: {
    key: string;
    variant: 'success' | 'error' | 'warning';
  };
}

interface NotificationList {
  notifications: Notification[];
}

const initialState: NotificationList = {
  notifications: [
    {
      key: v4(),
      message: 'Добро пожаловать 🤘',
      options: {
        key: v4(),
        variant: 'success',
      },
    },
  ],
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    [ENQUEUE_SNACKBAR]: {
      reducer: (state, { payload }) => {
        state.notifications.push(payload);
      },
      // @ts-ignore
      prepare(notification: Notification) {
        const payload = {
          ...notification,
          key: v4(),
        };
        return { payload };
      },
    },
    [CLOSE_SNACKBAR]: {
      reducer: (state, action) => {
        const { payload } = action;
        state.notifications = state.notifications.map((notification) => {
          const shouldDismiss =
            payload.dismissAll || notification.options.key === payload.key;
          return shouldDismiss
            ? { ...notification, dismissed: true }
            : { ...notification };
        });
      },
      // @ts-ignore
      prepare: (key) => ({ payload: { key, dismissAll: !key } }),
    },
    [REMOVE_SNACKBAR]: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.options.key !== payload,
      );
    },
  },
});

export default snackbarSlice;
