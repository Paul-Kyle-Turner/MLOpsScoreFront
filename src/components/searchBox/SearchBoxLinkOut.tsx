import { LucideSearch } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBoxLinkOut = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    // Navigate to the search results page
    navigate(`/platforms/search/${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      style={{
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "white",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
      }}
    >
      <LucideSearch />
      <input
        type="text"
        placeholder="Platforms, services, or features..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          border: "none",
          outline: "none",
          flex: 1,
          backgroundColor: "transparent",
          color: "black",
        }}
      />
      <button
        onClick={() => {
          if (!query.trim()) return;
          navigate(`/platforms/best/${encodeURIComponent(query.trim())}`);
        }}
        style={{
          borderRadius: "4px",
          border: "1px solid #28a745",
          backgroundColor: "#28a745",
          color: "white",
          padding: "4px 12px",
          cursor: "pointer",
        }}
      >
        Best
      </button>
      <button
        onClick={handleSearch}
        style={{
          borderRadius: "4px",
          border: "1px solid #007bff",
          backgroundColor: "#007bff",
          color: "white",
          padding: "4px 12px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};
