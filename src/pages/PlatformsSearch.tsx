import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { PlatformInformation } from "../model/platform";
import { searchPlatform } from "../api/search";
import { PlatformCard } from "../components/platform/PlatformCard";
import DontSeeYourPlatform from "../components/dontSeeYourPlatform/DontSeeYourPlatform";
import BasePage from "./Base";

const PlatformsSearch: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [platforms, setPlatforms] = useState<PlatformInformation[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<
    PlatformInformation[]
  >([]);
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load platforms from API
  useEffect(() => {
    const loadPlatforms = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the query from URL params for initial load
        const searchQuery = query || "";

        if (searchQuery) {
          const results = await searchPlatform(searchQuery, 1, 50);
          setPlatforms(results);
          setFilteredPlatforms(results);
        } else {
          // If no search query, set empty results
          setPlatforms([]);
          setFilteredPlatforms([]);
        }
      } catch (err) {
        console.error("Failed to load platforms:", err);
        setError("Failed to load platforms. Please try again.");
        setPlatforms([]);
        setFilteredPlatforms([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlatforms();
  }, [query]); // Only depend on query from URL params

  // Filter platforms based on search term
  useEffect(() => {
    let filtered = platforms;

    // Filter by search term
    if (searchTerm && searchTerm !== (query || "")) {
      filtered = filtered.filter(
        (platform) =>
          platform.platformName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          platform.platformType
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          platform.parentCompany
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          platform.specializations?.some((spec) =>
            spec.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredPlatforms(filtered);
  }, [searchTerm, platforms, query]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const results = await searchPlatform(searchTerm, 1, 50);
      setPlatforms(results);
      setFilteredPlatforms(results);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <p>Loading platforms...</p>
      </div>
    );
  }

  return (
    <BasePage title="MLOps Platforms">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-6">
          <p>Discover and compare MLOps platforms for your projects</p>
        </header>

        {/* Search and Filters */}
        <div className="flex text-center mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search platforms, features, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results Header */}
        <p>
          Found {filteredPlatforms.length} platform
          {filteredPlatforms.length !== 1 ? "s" : ""}
        </p>

        {/* Error Message */}
        {error && <p>{error}</p>}

        {/* Platforms Grid/List */}
        {filteredPlatforms.length === 0 && !loading ? (
          <div>
            <h3>No platforms found</h3>
            <DontSeeYourPlatform />
          </div>
        ) : (
          <div>
            {filteredPlatforms.map((platform, index) => (
              <PlatformCard
                key={`${platform.platformName}-${index}`}
                platform={platform}
              />
            ))}
            <br />
            <DontSeeYourPlatform />
          </div>
        )}
      </div>
    </BasePage>
  );
};

export default PlatformsSearch;
