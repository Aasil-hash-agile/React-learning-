import { useEffect, useState } from "react";
import Test from "./Test";

type SearchResult = {
  // Define the type for search results
  _source: {
    product_name: string;
    company: string;
  };
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://st-fructidor.app.ubq.network/api/v1/search/all?search_term=${searchTerm}`
        );
        const data = await response.json();
        setResults(data.sales_offers || []);
      } catch (error) {
        console.error(error);
        setResults([]);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
      <div>
    <section style={{ padding: "20px" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      <h2>Products :</h2>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <strong>{item._source.product_name}</strong> -{" "}
              {item._source.company}
            </li>
          ))}
        </ul> 
      )}

    </section>
    <Test searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
  </div>
  );
}
