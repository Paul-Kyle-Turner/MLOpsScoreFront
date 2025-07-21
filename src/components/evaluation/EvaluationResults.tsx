import React from 'react';
import type { MLOpsPlatformEvaluation } from '../../model/score';
import {
  getProficiencySummary,
  getTopStrengths,
  getTopWeaknesses
} from '../../model/score';

interface EvaluationResultsProps {
  evaluation: MLOpsPlatformEvaluation;
  platformName: string;
  onStartNew: () => void;
}

export const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  evaluation,
  platformName,
  onStartNew
}) => {
  const summary = getProficiencySummary(evaluation);
  const strengths = getTopStrengths(evaluation, 3);
  const weaknesses = getTopWeaknesses(evaluation, 3);

  const formatCategoryName = (name: string): string => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8) return '#28a745'; // Green
    if (score >= 6) return '#ffc107'; // Yellow
    if (score >= 4) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  const ScoreBar: React.FC<{ label: string; score: number }> = ({ label, score }) => (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '5px',
        fontSize: '14px'
      }}>
        <span>{formatCategoryName(label)}</span>
        <span style={{ fontWeight: 'bold' }}>{score.toFixed(1)}</span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${(score / 10) * 100}%`,
          height: '100%',
          backgroundColor: getScoreColor(score),
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#495057' }}>
          Evaluation Complete!
        </h1>
        <h2 style={{ margin: '0 0 10px 0', color: '#6c757d' }}>
          {platformName}
        </h2>
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: getScoreColor(summary.overallScore),
          margin: '10px 0'
        }}>
          {summary.overallScore.toFixed(1)}/10
        </div>
        <p style={{ margin: '0', color: '#6c757d', fontSize: '16px' }}>
          Overall MLOps Platform Score
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Detailed Scores */}
        <div>
          <h3 style={{ marginBottom: '20px', color: '#495057' }}>
            Category Breakdown
          </h3>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <ScoreBar label="computeAndScaling" score={summary.computeAndScaling} />
            <ScoreBar label="dataManagement" score={summary.dataManagement} />
            <ScoreBar label="modelDevelopment" score={summary.modelDevelopment} />
            <ScoreBar label="mlOpsPipeline" score={summary.mlOpsPipeline} />
            <ScoreBar label="modelDeployment" score={summary.modelDeployment} />
            <ScoreBar label="monitoringAndObservability" score={summary.monitoringAndObservability} />
            <ScoreBar label="securityAndCompliance" score={summary.securityAndCompliance} />
            <ScoreBar label="costManagement" score={summary.costManagement} />
            <ScoreBar label="developerExperience" score={summary.developerExperience} />
            <ScoreBar label="performanceAndReliability" score={summary.performanceAndReliability} />
          </div>
        </div>

        {/* Strengths and Weaknesses */}
        <div>
          <h3 style={{ marginBottom: '20px', color: '#495057' }}>
            Key Insights
          </h3>
          
          {/* Top Strengths */}
          <div style={{
            backgroundColor: '#d4edda',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb'
          }}>
            <h4 style={{ 
              margin: '0 0 15px 0', 
              color: '#155724',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              🏆 Top Strengths
            </h4>
            {strengths.map(([category, score], index) => (
              <div key={category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: index < strengths.length - 1 ? '8px' : '0',
                fontSize: '14px'
              }}>
                <span>{formatCategoryName(category)}</span>
                <span style={{ fontWeight: 'bold', color: '#28a745' }}>
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Top Weaknesses */}
          <div style={{
            backgroundColor: '#f8d7da',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            <h4 style={{ 
              margin: '0 0 15px 0', 
              color: '#721c24',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              🎯 Areas for Improvement
            </h4>
            {weaknesses.map(([category, score], index) => (
              <div key={category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: index < weaknesses.length - 1 ? '8px' : '0',
                fontSize: '14px'
              }}>
                <span>{formatCategoryName(category)}</span>
                <span style={{ fontWeight: 'bold', color: '#dc3545' }}>
                  {score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Platform Details */}
          <div style={{
            backgroundColor: '#e2e3e5',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #d6d8db'
          }}>
            <h4 style={{ 
              margin: '0 0 10px 0', 
              color: '#383d41',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              📋 Evaluation Details
            </h4>
            <div style={{ fontSize: '14px', color: '#495057' }}>
              <p style={{ margin: '5px 0' }}>
                <strong>Platform Type:</strong> {evaluation.platformType}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Evaluation Date:</strong> {evaluation.evaluationDate.toLocaleDateString()}
              </p>
              {evaluation.evaluatorId && (
                <p style={{ margin: '5px 0' }}>
                  <strong>Evaluator ID:</strong> {evaluation.evaluatorId}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <button
          onClick={onStartNew}
          style={{
            padding: '12px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Evaluate Another Platform
        </button>
        <button
          onClick={() => window.print()}
          style={{
            padding: '12px 30px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Print Results
        </button>
      </div>
    </div>
  );
};
