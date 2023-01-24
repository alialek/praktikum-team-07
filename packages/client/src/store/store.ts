import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './user/user.slice';
import forumReducer from './forum/forum.slice';
import leadersReducer from './leaders/leaders.slice';

const rootReducer = combineReducers({
  user: userReducer,
  forum: forumReducer,
  leaders: leadersReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
