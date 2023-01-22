import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './user/user.slice';
import leadersReducer from './leaders/leaders.slice';

const rootReducer = combineReducers({
  user: userReducer,
  leaders: leadersReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
