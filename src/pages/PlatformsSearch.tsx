import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

interface Platform {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  users: number;
  features: string[];
  logo?: string;
  trending?: boolean;
}

const PlatformsSearch: React.FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<Platform[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockPlatforms: Platform[] = [
    {
      id: "1",
      name: "MLflow",
      description:
        "Open source platform for machine learning lifecycle management",
      category: "ML Lifecycle",
      rating: 4.5,
      users: 15000,
      features: ["Experiment Tracking", "Model Registry", "Model Serving"],
      trending: true,
    },
    {
      id: "2",
      name: "Kubeflow",
      description: "Machine learning toolkit for Kubernetes",
      category: "Orchestration",
      rating: 4.2,
      users: 8500,
      features: [
        "Pipeline Management",
        "Distributed Training",
        "Model Serving",
      ],
    },
    {
      id: "3",
      name: "Apache Airflow",
      description:
        "Platform for developing, scheduling and monitoring workflows",
      category: "Orchestration",
      rating: 4.3,
      users: 12000,
      features: ["Workflow Management", "Scheduling", "Monitoring"],
    },
  ];

  const categories = [
    "all",
    "ML Lifecycle",
    "Orchestration",
    "Data Processing",
    "Model Serving",
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlatforms(mockPlatforms);
      setFilteredPlatforms(mockPlatforms);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = platforms;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (platform) =>
          platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          platform.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          platform.features.some((feature) =>
            feature.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (platform) => platform.category === selectedCategory
      );
    }

    setFilteredPlatforms(filtered);
  }, [searchTerm, selectedCategory, platforms]);

  const PlatformCard: React.FC<{ platform: Platform }> = ({ platform }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">
              {platform.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {platform.name}
            </h3>
            {platform.trending && (
              <span className="inline-flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">{platform.rating}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {platform.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {platform.category}
        </span>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="w-4 h-4 mr-1" />
          {platform.users.toLocaleString()} users
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {platform.features.slice(0, 3).map((feature, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );

  const PlatformListItem: React.FC<{ platform: Platform }> = ({ platform }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold">
              {platform.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {platform.name}
            </h3>
            <p className="text-gray-600 text-sm">{platform.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{platform.rating}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {platform.users.toLocaleString()}
          </div>
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
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search platforms, features, or categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found {filteredPlatforms.length} platform
            {filteredPlatforms.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Platforms Grid/List */}
        {filteredPlatforms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No platforms found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredPlatforms.map((platform) =>
              viewMode === "grid" ? (
                <PlatformCard key={platform.id} platform={platform} />
              ) : (
                <PlatformListItem key={platform.id} platform={platform} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformsSearch;
