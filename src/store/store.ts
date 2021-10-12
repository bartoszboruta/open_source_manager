import { configureStore } from "@reduxjs/toolkit";
import { internalApi } from "./internal/slice";
import authSlice from "./authSlice";
import { reducer as loginSlice } from "./login/slice";
import { githubApi } from "./github/slice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    login: loginSlice,
    [internalApi.reducerPath]: internalApi.reducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
