import { searchPlatform } from "../../api/search";
import { useState } from "react";

export const SearchBox = () => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const results = await searchPlatform(query, 1, 10);
      console.log("Search results:", results);
      // Handle the results (e.g., update state or display results)
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
