import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import contractsSlice from "./contracts/contractsSlice";
import dao_membersSlice from "./dao_members/dao_membersSlice";
import documentsSlice from "./documents/documentsSlice";
import executorsSlice from "./executors/executorsSlice";
import guestsSlice from "./guests/guestsSlice";
import proposalsSlice from "./proposals/proposalsSlice";
import sovereign_membersSlice from "./sovereign_members/sovereign_membersSlice";
import vendorsSlice from "./vendors/vendorsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
contracts: contractsSlice,
dao_members: dao_membersSlice,
documents: documentsSlice,
executors: executorsSlice,
guests: guestsSlice,
proposals: proposalsSlice,
sovereign_members: sovereign_membersSlice,
vendors: vendorsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
