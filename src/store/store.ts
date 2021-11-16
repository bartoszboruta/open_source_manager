import { configureStore } from "@reduxjs/toolkit";
import { internalApi } from "./internal/slice";
import authSlice from "../store/auth/authSlice";
import { reducer as loginSlice } from "../store/login/loginSlice";
import { reducer as registerSlice } from "../store/register/registerSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [internalApi.reducerPath]: internalApi.reducer,
    auth: authSlice,
    login: loginSlice,
    register: registerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
