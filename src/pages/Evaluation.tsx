import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PlatformSelector } from "../components/evaluation/PlatformSelector";
import { EvaluationForm } from "../components/evaluation/EvaluationForm";
import { EvaluationResults } from "../components/evaluation/EvaluationResults";
import type { PlatformType, PlatformInformation } from "../model/platform";
import type { MLOpsPlatformEvaluation } from "../model/score";
import { postScores } from "../api/score";
import { getPlatform } from "../api/platform";

type EvaluationStep = "select" | "evaluate" | "results";

interface SelectedPlatform {
  type: PlatformType;
  name: string;
  id?: string;
}

export const Evaluation = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<EvaluationStep>("select");
  const [selectedPlatform, setSelectedPlatform] =
    useState<SelectedPlatform | null>(null);
  const [completedEvaluation, setCompletedEvaluation] =
    useState<MLOpsPlatformEvaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for URL parameters on component mount
  useEffect(() => {
    const platformId = searchParams.get("platform");
    const platformType = searchParams.get("type");
    const platformName = searchParams.get("name");

    // If we have a platform ID, fetch platform information from backend
    if (platformId) {
      fetchPlatformInfo(platformId);
    }
    // Fallback to manual parameters if provided
    else if (platformName && platformType) {
      setSelectedPlatform({
        type: platformType as PlatformType,
        name: platformName,
      });
      setCurrentStep("evaluate");
    }
  }, [searchParams]);

  const fetchPlatformInfo = async (platformId: string) => {
    setLoading(true);
    setError(null);
    try {
      const platformInfo: PlatformInformation = await getPlatform(platformId);
      setSelectedPlatform({
        type: platformInfo.platformType,
        name: platformInfo.platformName,
        id: platformInfo.id,
      });
      setCurrentStep("evaluate");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch platform information');
      console.error('Error fetching platform info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformSelected = (
    platformType: PlatformType,
    platformName: string
  ) => {
    setSelectedPlatform({ 
      type: platformType, 
      name: platformName 
      // Note: No ID when manually selected, scores won't be posted
    });
    setCurrentStep("evaluate");
  };

  const handleEvaluationComplete = async (
    evaluation: MLOpsPlatformEvaluation
  ) => {
    setCompletedEvaluation(evaluation);
    setCurrentStep("results");
    
    // Only post scores if we have a platform ID
    if (selectedPlatform?.id) {
      try {
        await postScores(selectedPlatform.id, evaluation);
      } catch (err) {
        console.error('Error posting scores:', err);
        // Could show a toast or error message here, but don't block the user
      }
    }
  };

  const handleCancel = () => {
    setSelectedPlatform(null);
    setError(null);
    setCurrentStep("select");
  };

  const handleStartNew = () => {
    setSelectedPlatform(null);
    setCompletedEvaluation(null);
    setError(null);
    setCurrentStep("select");
  };

  const renderContent = () => {
    // Show loading state while fetching platform info
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>Loading platform information...</div>
        </div>
      );
    }

    // Show error state if fetching failed
    if (error) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ color: 'red', marginBottom: '20px' }}>
            Error: {error}
          </div>
          <button
            onClick={() => {
              setError(null);
              setCurrentStep("select");
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Start Over
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case "select":
        return <PlatformSelector onPlatformSelected={handlePlatformSelected} />;

      case "evaluate":
        if (!selectedPlatform) return null;
        return (
          <EvaluationForm
            platformType={selectedPlatform.type}
            platformName={selectedPlatform.name}
            onEvaluationComplete={handleEvaluationComplete}
            onCancel={handleCancel}
          />
        );

      case "results":
        if (!completedEvaluation || !selectedPlatform) return null;
        return (
          <EvaluationResults
            evaluation={completedEvaluation}
            platformName={selectedPlatform.name}
            onStartNew={handleStartNew}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div
        style={{
          minHeight: "80vh",
          padding: "20px",
        }}
      >
        {currentStep === "select" && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h1 style={{ marginBottom: "10px" }}>Platform Evaluation</h1>
            <p
              style={{
                fontSize: "18px",
                color: "#6c757d",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Evaluate and score MLOps platforms across 10 key categories to
              make informed decisions about your machine learning
              infrastructure.
            </p>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};
