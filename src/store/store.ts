import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { internalApi } from "./internal/slice";
import { githubApi } from "./github/slice";
import authSlice from "../store/auth/authSlice";
import filteringSlice from "../store/filtering/slice";

export const store = configureStore({
  reducer: {
    [internalApi.reducerPath]: internalApi.reducer,
    [githubApi.reducerPath]: githubApi.reducer,
    auth: authSlice,
    filtering: filteringSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      internalApi.middleware,
      githubApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
