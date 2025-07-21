import { useState } from 'react';
import BasePage from "./Base";
import { PlatformSelector } from '../components/evaluation/PlatformSelector';
import { EvaluationForm } from '../components/evaluation/EvaluationForm';
import { EvaluationResults } from '../components/evaluation/EvaluationResults';
import type { PlatformType } from '../model/platform';
import type { MLOpsPlatformEvaluation } from '../model/score';

type EvaluationStep = 'select' | 'evaluate' | 'results';

interface SelectedPlatform {
  type: PlatformType;
  name: string;
}

export const Evaluation = () => {
  const [currentStep, setCurrentStep] = useState<EvaluationStep>('select');
  const [selectedPlatform, setSelectedPlatform] = useState<SelectedPlatform | null>(null);
  const [completedEvaluation, setCompletedEvaluation] = useState<MLOpsPlatformEvaluation | null>(null);

  const handlePlatformSelected = (platformType: PlatformType, platformName: string) => {
    setSelectedPlatform({ type: platformType, name: platformName });
    setCurrentStep('evaluate');
  };

  const handleEvaluationComplete = (evaluation: MLOpsPlatformEvaluation) => {
    setCompletedEvaluation(evaluation);
    setCurrentStep('results');
  };

  const handleCancel = () => {
    setSelectedPlatform(null);
    setCurrentStep('select');
  };

  const handleStartNew = () => {
    setSelectedPlatform(null);
    setCompletedEvaluation(null);
    setCurrentStep('select');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'select':
        return <PlatformSelector onPlatformSelected={handlePlatformSelected} />;
      
      case 'evaluate':
        if (!selectedPlatform) return null;
        return (
          <EvaluationForm
            platformType={selectedPlatform.type}
            platformName={selectedPlatform.name}
            onEvaluationComplete={handleEvaluationComplete}
            onCancel={handleCancel}
          />
        );
      
      case 'results':
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
    <BasePage>
      <div
        style={{
          minHeight: '80vh',
          padding: "20px",
        }}
      >
        {currentStep === 'select' && (
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h1 style={{ marginBottom: '10px' }}>MLOps Platform Evaluation</h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#6c757d',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Evaluate and score MLOps platforms across 10 key categories to make informed decisions 
              about your machine learning infrastructure.
            </p>
          </div>
        )}
        
        {renderContent()}
      </div>
    </BasePage>
  );
};
