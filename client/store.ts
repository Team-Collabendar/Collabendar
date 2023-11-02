import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import eventReducer from './reducers/eventsSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    events: eventReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch