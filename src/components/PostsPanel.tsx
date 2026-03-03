import { useMemo } from "react";
import { fetchPosts } from "../redux/asyncActions/fetchPosts";
import { setQuery, clear } from "../redux/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function PostsPanel() {
  const dispatch = useAppDispatch();
  const { items, loading, error, query } = useAppSelector((s) => s.posts);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>Posts (Redux Toolkit + createAsyncThunk)</h1>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button onClick={() => dispatch(fetchPosts())} disabled={loading}>
          {loading ? "Loading..." : "Load posts"}
        </button>

        <button onClick={() => dispatch(clear())} disabled={loading && items.length === 0}>
          Clear
        </button>

        <input
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search by title..."
          style={{ padding: 8, minWidth: 240 }}
        />
      </div>

      {error && (
        <div style={{ padding: 12, border: "1px solid #f00", marginBottom: 12 }}>
          Error: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div style={{ padding: 12, border: "1px solid #ccc" }}>
          No data. Click “Load posts”.
        </div>
      )}

      <ul style={{ paddingLeft: 18 }}>
        {filtered.slice(0, 20).map((p) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            <strong>{p.title}</strong>
            <div style={{ opacity: 0.85 }}>{p.body}</div>
          </li>
        ))}
      </ul>

      {items.length > 20 && (
        <div style={{ marginTop: 12, opacity: 0.75 }}>
          Showing first 20 posts (for demo).
        </div>
      )}
    </div>
  );
}