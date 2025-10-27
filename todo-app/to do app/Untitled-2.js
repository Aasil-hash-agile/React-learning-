
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("apple");

  useEffect(() => {
    async function fetchData() {
      try {
        // proxy used to avoid the “CORS policy” block
        const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://fructidor.com/api/v1/search/all?search_term=${search}`
        )}`;

        const res = await fetch(url);
        const json = await res.json();

        // the API’s exact structure can vary — inspect it in the console
        console.log(json);
        setData(json.data || json.results || json);
      } catch (err) {
        console.error("Fetch error:", err);
        setData([]);
      }
    }
    fetchData();
  }, [search]);

  return (
    <section style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Fruit Search</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search fruits..."
        style={{
          width: 280,
          padding: 8,
          marginBottom: 16,
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />

      {Array.isArray(data) && data.length > 0 ? (
        <ul>
          {data.map((item, i) => (
            <li key={i}>{item.name || item.title || JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </section>
  );
}
