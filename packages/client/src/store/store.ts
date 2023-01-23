import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import alertReducer from './Alert/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  notifications: alertReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
