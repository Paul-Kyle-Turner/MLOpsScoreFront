import React from "react";
import { useTheme } from "../../hooks/useTheme";
import type { MLOpsPlatformEvaluation } from "../../model/score";
import {
  getProficiencySummary,
  getTopStrengths,
  getTopWeaknesses,
} from "../../model/score";

interface EvaluationResultsProps {
  evaluation: MLOpsPlatformEvaluation;
  platformName: string;
  onStartNew: () => void;
}

export const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  evaluation,
  platformName,
  onStartNew,
}) => {
  const { theme } = useTheme();
  const summary = getProficiencySummary(evaluation);
  const strengths = getTopStrengths(evaluation, 3);
  const weaknesses = getTopWeaknesses(evaluation, 3);

  const formatCategoryName = (name: string): string => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8) return "#28a745"; // Green
    if (score >= 6) return "#ffc107"; // Yellow
    if (score >= 4) return "#fd7e14"; // Orange
    return "#dc3545"; // Red
  };

  const ScoreBar: React.FC<{ label: string; score: number }> = ({
    label,
    score,
  }) => (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "5px",
          fontSize: "14px",
        }}
      >
        <span>{formatCategoryName(label)}</span>
        <span style={{ fontWeight: "bold" }}>{score.toFixed(1)}</span>
      </div>
      <div
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: "var(--bs-border-color)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(score / 10) * 100}%`,
            height: "100%",
            backgroundColor: getScoreColor(score),
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "var(--bs-secondary-bg)",
          borderRadius: "8px",
          border: "1px solid var(--bs-border-color)",
        }}
      >
        <h1 style={{ margin: "0 0 10px 0", color: "var(--bs-body-color)" }}>
          Evaluation Complete!
        </h1>
        <h2 style={{ margin: "0 0 10px 0", color: "var(--bs-body-color)" }}>
          {platformName}
        </h2>
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: getScoreColor(summary.overallScore),
            margin: "10px 0",
          }}
        >
          {summary.overallScore.toFixed(1)}/10
        </div>
        <p
          style={{
            margin: "0",
            color: "var(--bs-body-color)",
            fontSize: "16px",
            opacity: 0.8,
          }}
        >
          Overall MLOps Platform Score
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
      >
        {/* Detailed Scores */}
        <div>
          <h3 style={{ marginBottom: "20px", color: "var(--bs-body-color)" }}>
            Category Breakdown
          </h3>
          <div
            style={{
              backgroundColor: "var(--custom-card-bg)",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid var(--bs-border-color)",
            }}
          >
            <ScoreBar
              label="computeAndScaling"
              score={summary.computeAndScaling}
            />
            <ScoreBar label="dataManagement" score={summary.dataManagement} />
            <ScoreBar
              label="modelDevelopment"
              score={summary.modelDevelopment}
            />
            <ScoreBar label="mlOpsPipeline" score={summary.mlOpsPipeline} />
            <ScoreBar label="modelDeployment" score={summary.modelDeployment} />
            <ScoreBar
              label="monitoringAndObservability"
              score={summary.monitoringAndObservability}
            />
            <ScoreBar
              label="securityAndCompliance"
              score={summary.securityAndCompliance}
            />
            <ScoreBar label="costManagement" score={summary.costManagement} />
            <ScoreBar
              label="developerExperience"
              score={summary.developerExperience}
            />
            <ScoreBar
              label="performanceAndReliability"
              score={summary.performanceAndReliability}
            />
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div>
          <h3 style={{ marginBottom: "20px", color: "var(--bs-body-color)" }}>
            Key Insights
          </h3>

          {/* Top Strengths */}
          <div
            style={{
              backgroundColor:
                theme === "dark" ? "rgba(40, 167, 69, 0.2)" : "#d4edda",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border:
                theme === "dark"
                  ? "1px solid rgba(40, 167, 69, 0.3)"
                  : "1px solid #c3e6cb",
            }}
          >
            <h4
              style={{
                margin: "0 0 15px 0",
                color: theme === "dark" ? "#4fd971" : "#155724",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              🏆 Top Strengths
            </h4>
            {strengths.map(([category, score], index) => (
              <div
                key={category}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: index < strengths.length - 1 ? "8px" : "0",
                  fontSize: "14px",
                }}
              >
                <span>{formatCategoryName(category)}</span>
                <span style={{ fontWeight: "bold", color: "#28a745" }}>
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Top Weaknesses */}
          <div
            style={{
              backgroundColor:
                theme === "dark" ? "rgba(220, 53, 69, 0.2)" : "#f8d7da",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border:
                theme === "dark"
                  ? "1px solid rgba(220, 53, 69, 0.3)"
                  : "1px solid #f5c6cb",
            }}
          >
            <h4
              style={{
                margin: "0 0 15px 0",
                color: theme === "dark" ? "#ff6b7a" : "#721c24",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              🎯 Areas for Improvement
            </h4>
            {weaknesses.map(([category, score], index) => (
              <div
                key={category}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: index < weaknesses.length - 1 ? "8px" : "0",
                  fontSize: "14px",
                }}
              >
                <span>{formatCategoryName(category)}</span>
                <span style={{ fontWeight: "bold", color: "#dc3545" }}>
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Platform Details */}
          <div
            style={{
              backgroundColor: "var(--bs-secondary-bg)",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid var(--bs-border-color)",
            }}
          >
            <h4
              style={{
                margin: "0 0 10px 0",
                color: "var(--bs-body-color)",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              📋 Evaluation Details
            </h4>
            <div style={{ fontSize: "14px", color: "var(--bs-body-color)" }}>
              <p style={{ margin: "5px 0" }}>
                <strong>Platform Type:</strong> {evaluation.platformType}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Evaluation Date:</strong>{" "}
                {evaluation.evaluationDate.toLocaleDateString()}
              </p>
              {evaluation.evaluatorId && (
                <p style={{ margin: "5px 0" }}>
                  <strong>Evaluator ID:</strong> {evaluation.evaluatorId}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "var(--bs-secondary-bg)",
          borderRadius: "8px",
        }}
      >
        <button
          onClick={onStartNew}
          style={{
            padding: "12px 30px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
        >
          Evaluate Another Platform
        </button>
      </div>
    </div>
  );
};
