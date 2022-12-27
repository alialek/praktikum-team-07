import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
