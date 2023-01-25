import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export const ENQUEUE_SNACKBAR = 'enqueueSnackbar';
export const CLOSE_SNACKBAR = 'closeSnackbar';
export const REMOVE_SNACKBAR = 'removeSnackbar';

const initialState: NotificationList = {
  notifications: [],
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    [ENQUEUE_SNACKBAR]: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.notifications.push(action.payload);
      },
      prepare(notification: Notification) {
        const payload = {
          ...notification,
          key: v4(),
        };
        return { payload };
      },
    },
    [CLOSE_SNACKBAR]: {
      reducer: (state, action: PayloadAction<Notification>) => {
        const { payload } = action;
        state.notifications = state.notifications.map((notification) => {
          const shouldDismiss =
            payload.dismissAll || notification.options.key === payload.key;
          return shouldDismiss
            ? { ...notification, dismissed: true }
            : { ...notification };
        });
      },
      prepare: (notification: Notification) => {
        const payload = {
          ...notification,
          key: notification.key,
          dismissAll: !notification.key,
        };
        return { payload };
      },
    },
    [REMOVE_SNACKBAR]: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.options.key !== payload,
      );
    },
  },
});

export default snackbarSlice;

export interface Notification {
  key: string;
  message: string;
  dismissAll?: boolean;
  options: {
    key: string;
    variant: 'success' | 'error' | 'warning';
  };
}

interface NotificationList {
  notifications: Notification[] | any[];
}
