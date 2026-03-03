import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts, type Post } from "../asyncActions/fetchPosts";

type PostsState = {
  items: Post[];
  loading: boolean;
  error: string | null;
  query: string;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  query: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clear(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unknown error";
      });
  },
});

export const { setQuery, clear } = postsSlice.actions;
export default postsSlice.reducer;