// rootReducer.ts (example file)
import { combineReducers } from 'redux';
// import someReducer from './someReducer';
// import anotherReducer from './anotherReducer';

const rootReducer = combineReducers({
  // Define your individual reducers here
//   someReducer,
//   anotherReducer,
  // Add more reducers if needed
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type based on rootReducer

export default rootReducer;
