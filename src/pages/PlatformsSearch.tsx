import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import type { PlatformInformation } from "../model/platform";
import { searchPlatform } from "../api/search";
import { PlatformCard } from "../components/platform/PlatformCard";
import DontSeeYourPlatform from "../components/createButtons/DontSeeYourPlatform";

const PlatformsSearch: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [platforms, setPlatforms] = useState<PlatformInformation[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<PlatformInformation[]>([]);
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "all",
    "Hyperscaler",
    "GPU Cloud",
    "Edge Cloud",
    "Hybrid Cloud",
    "Private Cloud",
    "Specialized AI",
    "Container Platform",
    "Serverless",
    "Other"
  ];

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
        console.error('Failed to load platforms:', err);
        setError('Failed to load platforms. Please try again.');
        setPlatforms([]);
        setFilteredPlatforms([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlatforms();
  }, [query]); // Only depend on query from URL params

  // Filter platforms based on search term and category
  useEffect(() => {
    let filtered = platforms;

    // Filter by search term
    if (searchTerm && searchTerm !== (query || "")) {
      filtered = filtered.filter(
        (platform) =>
          platform.platformName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          platform.platformType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          platform.parentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          platform.specializations?.some((spec) =>
            spec.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category (platform type)
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (platform) => platform.platformType === selectedCategory
      );
    }

    setFilteredPlatforms(filtered);
  }, [searchTerm, selectedCategory, platforms, query]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const results = await searchPlatform(searchTerm, 1, 50);
      setPlatforms(results);
      setFilteredPlatforms(results);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PlatformListItem: React.FC<{ platform: PlatformInformation }> = ({ platform }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold">
              {platform.platformName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {platform.platformName}
            </h3>
            <p className="text-gray-600 text-sm">{platform.platformType}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {platform.regions.length} region{platform.regions.length !== 1 ? 's' : ''}
          </div>
          {platform.slaUptime && (
            <div className="text-sm text-green-600">
              {platform.slaUptime}% SLA
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading platforms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MLOps Platforms
          </h1>
          <p className="text-gray-600">
            Discover and compare MLOps platforms for your projects
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search platforms, features, or categories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Header with Don't See Your Platform Button */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Found {filteredPlatforms.length} platform
            {filteredPlatforms.length !== 1 ? "s" : ""}
          </p>
          <DontSeeYourPlatform />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Platforms Grid/List */}
        {filteredPlatforms.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No platforms found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <DontSeeYourPlatform />
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredPlatforms.map((platform, index) =>
              viewMode === "grid" ? (
                <PlatformCard key={`${platform.platformName}-${index}`} platform={platform} />
              ) : (
                <PlatformListItem key={`${platform.platformName}-${index}`} platform={platform} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformsSearch;
