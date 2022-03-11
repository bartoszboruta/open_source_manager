import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { issues: FilteringProperty; ideas: FilteringProperty } = {
  issues: { filter: "All", search: "" },
  ideas: { filter: "All", search: "" },
};

export const availableFilterOptions: Filter[] = [
  "All",
  "Assigned to me",
  "Created by me",
];

export const slice = createSlice({
  name: "filtering",
  initialState,
  reducers: {
    setIssuesFilter: (state, action: PayloadAction<Filter>) => {
      state.issues.filter = action.payload;
    },
    setIdeaFilter: (state, action: PayloadAction<Filter>) => {
      state.ideas.filter = action.payload;
    },
    setIdeaSearch: (state, action: PayloadAction<string>) => {
      state.ideas.search = action.payload;
    },
    setIssueSearch: (state, action: PayloadAction<string>) => {
      state.issues.search = action.payload;
    },
    clearIssueSearch: (state) => {
      state.issues.search = "";
    },
    clearIdeaSearch: (state) => {
      state.ideas.search = "";
    },
  },
});

const reducer = slice.reducer;

export default reducer;

export const {
  setIssuesFilter,
  setIdeaFilter,
  setIdeaSearch,
  setIssueSearch,
  clearIdeaSearch,
  clearIssueSearch,
} = slice.actions;
