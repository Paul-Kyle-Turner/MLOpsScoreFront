import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";
import { PlatformType, type PlatformInformation } from "../../model/platform";
import { searchPlatform } from "../../api/search";
import { DidYouMeanPlatformSelector } from "../platform/DidYouMeanPlatformSelector";

interface PlatformSelectorProps {
  onPlatformSelected: (
    platformType: PlatformType,
    platformName: string
  ) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  onPlatformSelected,
}) => {
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState<PlatformType | "">("");
  const [platformName, setPlatformName] = useState("");
  const [suggestedPlatforms, setSuggestedPlatforms] = useState<PlatformInformation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const platformTypes = Object.values(PlatformType);

  // Debounced search function
  const debouncedSearch = useCallback(
    async (searchTerm: string) => {
      if (searchTerm.trim().length < 2) {
        setSuggestedPlatforms([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchPlatform(searchTerm, 1, 5);
        
        // Only show suggestions if we have results and the search term doesn't exactly match any platform
        const exactMatch = results.some(
          platform => platform.platformName.toLowerCase() === searchTerm.toLowerCase()
        );
        
        if (results.length > 0 && !exactMatch) {
          setSuggestedPlatforms(results);
          setShowSuggestions(true);
        } else {
          setSuggestedPlatforms([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Error searching platforms:', error);
        setSuggestedPlatforms([]);
        setShowSuggestions(false);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (platformName) {
        debouncedSearch(platformName);
      } else {
        setSuggestedPlatforms([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [platformName, debouncedSearch]);

  const handlePlatformNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlatformName(e.target.value);
  };

  const handleSuggestionDismiss = () => {
    setShowSuggestions(false);
  };

  const handlePlatformSelection = (platformType: PlatformType, platformName: string) => {
    setSelectedType(platformType);
    setPlatformName(platformName);
    setShowSuggestions(false);
    onPlatformSelected(platformType, platformName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType && platformName.trim()) {
      onPlatformSelected(selectedType as PlatformType, platformName.trim());
    }
  };

  const isValid = selectedType && platformName.trim();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "var(--bs-secondary-bg)",
        borderRadius: "8px",
        boxShadow: `0 2px 4px var(--custom-shadow)`,
        border: "1px solid var(--bs-border-color)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "var(--bs-body-color)",
        }}
      >
        Select Platform to Evaluate
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="platformType"
            className="form-label"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "var(--bs-body-color)",
            }}
          >
            Platform Type:
          </label>
          <select
            id="platformType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as PlatformType)}
            className="form-input"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid var(--bs-border-color)",
              fontSize: "16px",
              backgroundColor: "var(--bs-body-bg)",
              color: "var(--bs-body-color)",
            }}
            required
          >
            <option value="">Select a platform type...</option>
            {platformTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="platformName"
            className="form-label"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "var(--bs-body-color)",
            }}
          >
            Platform Name:
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="platformName"
              value={platformName}
              onChange={handlePlatformNameChange}
              placeholder="e.g., AWS SageMaker, Google Cloud AI Platform, Azure ML..."
              className="form-input"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid var(--bs-border-color)",
                fontSize: "16px",
                backgroundColor: "var(--bs-body-bg)",
                color: "var(--bs-body-color)",
              }}
              required
            />
            {isSearching && (
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--bs-secondary)",
                  fontSize: "14px",
                }}
              >
                Searching...
              </div>
            )}
          </div>
        </div>

        {/* Show platform suggestions */}
        {showSuggestions && suggestedPlatforms.length > 0 && (
          <DidYouMeanPlatformSelector
            platforms={suggestedPlatforms}
            searchedName={platformName}
            onDismiss={handleSuggestionDismiss}
            onPlatformSelect={handlePlatformSelection}
          />
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isValid
              ? theme === "dark"
                ? "#0d6efd"
                : "#007bff"
              : theme === "dark"
              ? "#495057"
              : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "background-color 0.2s",
          }}
        >
          Start Evaluation
        </button>
      </form>
    </div>
  );
};
