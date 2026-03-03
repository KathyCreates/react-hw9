import { createAsyncThunk } from "@reduxjs/toolkit";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) {
        return rejectWithValue(`HTTP error: ${res.status}`);
      }
      const data = (await res.json()) as Post[];
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);