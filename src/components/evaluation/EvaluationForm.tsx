import React, { useState } from 'react';
import type { PlatformType } from '../../model/platform';
import type {
  MLOpsPlatformEvaluation,
  ComputeAndScaling,
  DataManagement,
  ModelDevelopment,
  MLOpsPipeline,
  ModelDeployment,
  MonitoringAndObservability,
  SecurityAndCompliance,
  CostManagement,
  DeveloperExperience,
  PerformanceAndReliability
} from '../../model/score';
import { calculateOverallPlatformScore } from '../../model/score';

interface EvaluationFormProps {
  platformType: PlatformType;
  platformName: string;
  onEvaluationComplete: (evaluation: MLOpsPlatformEvaluation) => void;
  onCancel: () => void;
}

interface ScoreInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ label, value, onChange, description }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={{
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500',
      fontSize: '14px'
    }}>
      {label}
    </label>
    {description && (
      <p style={{
        fontSize: '12px',
        color: '#666',
        margin: '0 0 5px 0'
      }}>
        {description}
      </p>
    )}
    <input
      type="number"
      min="1"
      max="10"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 1)}
      style={{
        width: '80px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px'
      }}
    />
    <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
      (1-10)
    </span>
  </div>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div style={{
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e9ecef'
  }}>
    <h3 style={{
      marginTop: '0',
      marginBottom: '20px',
      color: '#495057',
      borderBottom: '2px solid #dee2e6',
      paddingBottom: '10px'
    }}>
      {title}
    </h3>
    {children}
  </div>
);

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  platformType,
  platformName,
  onEvaluationComplete,
  onCancel
}) => {
  // State for all evaluation sections
  const [computeAndScaling, setComputeAndScaling] = useState<ComputeAndScaling>({
    computeVarietyScore: 5,
    autoScalingScore: 5,
    spotInstanceSupport: 5,
    distributedTrainingSupport: 5
  });

  const [dataManagement, setDataManagement] = useState<DataManagement>({
    storageOptionsScore: 5,
    dataVersioningScore: 5,
    dataPipelineOrchestration: 5,
    dataIntegrationScore: 5
  });

  const [modelDevelopment, setModelDevelopment] = useState<ModelDevelopment>({
    frameworkSupportScore: 5,
    experimentTrackingScore: 5,
    hyperparameterTuningScore: 5,
    notebookEnvironmentScore: 5
  });

  const [mlOpsPipeline, setMlOpsPipeline] = useState<MLOpsPipeline>({
    workflowOrchestrationScore: 5,
    cicdIntegrationScore: 5,
    modelValidationScore: 5,
    environmentManagementScore: 5
  });

  const [modelDeployment, setModelDeployment] = useState<ModelDeployment>({
    deploymentOptionsScore: 5,
    realTimeInferenceScore: 5,
    batchInferenceScore: 5,
    abTestingScore: 5,
    canaryDeploymentScore: 5
  });

  const [monitoringAndObservability, setMonitoringAndObservability] = useState<MonitoringAndObservability>({
    modelPerformanceMonitoring: 5,
    dataDriftDetection: 5,
    infrastructureMonitoring: 5,
    loggingAndAlerting: 5,
    modelExplainability: 5
  });

  const [securityAndCompliance, setSecurityAndCompliance] = useState<SecurityAndCompliance>({
    identityAccessManagement: 5,
    dataEncryption: 5,
    complianceCertifications: 5,
    networkSecurity: 5,
    auditLogging: 5
  });

  const [costManagement, setCostManagement] = useState<CostManagement>({
    costTransparency: 5,
    resourceOptimization: 5,
    pricingFlexibility: 5,
    costPredictionScore: 5
  });

  const [developerExperience, setDeveloperExperience] = useState<DeveloperExperience>({
    apiSdkQuality: 5,
    toolIntegration: 5,
    documentationQuality: 5,
    communitySupport: 5,
    migrationTools: 5
  });

  const [performanceAndReliability, setPerformanceAndReliability] = useState<PerformanceAndReliability>({
    slaScore: 5,
    globalAvailability: 5,
    disasterRecovery: 5,
    performanceBenchmarks: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const evaluation: MLOpsPlatformEvaluation = {
      platformType,
      evaluationDate: new Date(),
      computeAndScaling,
      dataManagement,
      modelDevelopment,
      mlOpsPipeline,
      modelDeployment,
      monitoringAndObservability,
      securityAndCompliance,
      costManagement,
      developerExperience,
      performanceAndReliability
    };

    onEvaluationComplete(evaluation);
  };

  // Create a preview evaluation for showing current scores
  const previewEvaluation: MLOpsPlatformEvaluation = {
    platformType,
    evaluationDate: new Date(),
    computeAndScaling,
    dataManagement,
    modelDevelopment,
    mlOpsPipeline,
    modelDeployment,
    monitoringAndObservability,
    securityAndCompliance,
    costManagement,
    developerExperience,
    performanceAndReliability
  };

  const currentScore = calculateOverallPlatformScore(previewEvaluation);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '6px'
      }}>
        <div>
          <h2 style={{ margin: '0' }}>Evaluating: {platformName}</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Type: {platformType}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
            {currentScore.toFixed(1)}/10
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Current Score</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Section title="Compute and Scaling">
          <ScoreInput
            label="Compute Variety Score"
            value={computeAndScaling.computeVarietyScore}
            onChange={(value) => setComputeAndScaling(prev => ({ ...prev, computeVarietyScore: value }))}
            description="Variety of compute options (CPU, GPU, TPU, etc.)"
          />
          <ScoreInput
            label="Auto-scaling Score"
            value={computeAndScaling.autoScalingScore}
            onChange={(value) => setComputeAndScaling(prev => ({ ...prev, autoScalingScore: value }))}
            description="Auto-scaling capabilities"
          />
          <ScoreInput
            label="Spot Instance Support"
            value={computeAndScaling.spotInstanceSupport}
            onChange={(value) => setComputeAndScaling(prev => ({ ...prev, spotInstanceSupport: value }))}
            description="Spot/preemptible instance availability"
          />
          <ScoreInput
            label="Distributed Training Support"
            value={computeAndScaling.distributedTrainingSupport}
            onChange={(value) => setComputeAndScaling(prev => ({ ...prev, distributedTrainingSupport: value }))}
            description="Multi-node distributed training"
          />
        </Section>

        <Section title="Data Management">
          <ScoreInput
            label="Storage Options Score"
            value={dataManagement.storageOptionsScore}
            onChange={(value) => setDataManagement(prev => ({ ...prev, storageOptionsScore: value }))}
            description="Variety of storage solutions"
          />
          <ScoreInput
            label="Data Versioning Score"
            value={dataManagement.dataVersioningScore}
            onChange={(value) => setDataManagement(prev => ({ ...prev, dataVersioningScore: value }))}
            description="Data versioning capabilities"
          />
          <ScoreInput
            label="Data Pipeline Orchestration"
            value={dataManagement.dataPipelineOrchestration}
            onChange={(value) => setDataManagement(prev => ({ ...prev, dataPipelineOrchestration: value }))}
            description="Data pipeline tools"
          />
          <ScoreInput
            label="Data Integration Score"
            value={dataManagement.dataIntegrationScore}
            onChange={(value) => setDataManagement(prev => ({ ...prev, dataIntegrationScore: value }))}
            description="Integration with data sources"
          />
        </Section>

        <Section title="Model Development">
          <ScoreInput
            label="Framework Support Score"
            value={modelDevelopment.frameworkSupportScore}
            onChange={(value) => setModelDevelopment(prev => ({ ...prev, frameworkSupportScore: value }))}
            description="ML framework support"
          />
          <ScoreInput
            label="Experiment Tracking Score"
            value={modelDevelopment.experimentTrackingScore}
            onChange={(value) => setModelDevelopment(prev => ({ ...prev, experimentTrackingScore: value }))}
            description="Experiment tracking tools"
          />
          <ScoreInput
            label="Hyperparameter Tuning Score"
            value={modelDevelopment.hyperparameterTuningScore}
            onChange={(value) => setModelDevelopment(prev => ({ ...prev, hyperparameterTuningScore: value }))}
            description="Hyperparameter optimization"
          />
          <ScoreInput
            label="Notebook Environment Score"
            value={modelDevelopment.notebookEnvironmentScore}
            onChange={(value) => setModelDevelopment(prev => ({ ...prev, notebookEnvironmentScore: value }))}
            description="Managed notebook environments"
          />
        </Section>

        <Section title="MLOps Pipeline">
          <ScoreInput
            label="Workflow Orchestration Score"
            value={mlOpsPipeline.workflowOrchestrationScore}
            onChange={(value) => setMlOpsPipeline(prev => ({ ...prev, workflowOrchestrationScore: value }))}
            description="Workflow orchestration tools"
          />
          <ScoreInput
            label="CI/CD Integration Score"
            value={mlOpsPipeline.cicdIntegrationScore}
            onChange={(value) => setMlOpsPipeline(prev => ({ ...prev, cicdIntegrationScore: value }))}
            description="CI/CD integration"
          />
          <ScoreInput
            label="Model Validation Score"
            value={mlOpsPipeline.modelValidationScore}
            onChange={(value) => setMlOpsPipeline(prev => ({ ...prev, modelValidationScore: value }))}
            description="Automated model validation"
          />
          <ScoreInput
            label="Environment Management Score"
            value={mlOpsPipeline.environmentManagementScore}
            onChange={(value) => setMlOpsPipeline(prev => ({ ...prev, environmentManagementScore: value }))}
            description="Environment management"
          />
        </Section>

        <Section title="Model Deployment">
          <ScoreInput
            label="Deployment Options Score"
            value={modelDeployment.deploymentOptionsScore}
            onChange={(value) => setModelDeployment(prev => ({ ...prev, deploymentOptionsScore: value }))}
            description="Variety of deployment options"
          />
          <ScoreInput
            label="Real-time Inference Score"
            value={modelDeployment.realTimeInferenceScore}
            onChange={(value) => setModelDeployment(prev => ({ ...prev, realTimeInferenceScore: value }))}
            description="Real-time inference capabilities"
          />
          <ScoreInput
            label="Batch Inference Score"
            value={modelDeployment.batchInferenceScore}
            onChange={(value) => setModelDeployment(prev => ({ ...prev, batchInferenceScore: value }))}
            description="Batch inference capabilities"
          />
          <ScoreInput
            label="A/B Testing Score"
            value={modelDeployment.abTestingScore}
            onChange={(value) => setModelDeployment(prev => ({ ...prev, abTestingScore: value }))}
            description="A/B testing support"
          />
          <ScoreInput
            label="Canary Deployment Score"
            value={modelDeployment.canaryDeploymentScore}
            onChange={(value) => setModelDeployment(prev => ({ ...prev, canaryDeploymentScore: value }))}
            description="Canary deployment capabilities"
          />
        </Section>

        <Section title="Monitoring and Observability">
          <ScoreInput
            label="Model Performance Monitoring"
            value={monitoringAndObservability.modelPerformanceMonitoring}
            onChange={(value) => setMonitoringAndObservability(prev => ({ ...prev, modelPerformanceMonitoring: value }))}
            description="Model performance monitoring"
          />
          <ScoreInput
            label="Data Drift Detection"
            value={monitoringAndObservability.dataDriftDetection}
            onChange={(value) => setMonitoringAndObservability(prev => ({ ...prev, dataDriftDetection: value }))}
            description="Data drift detection"
          />
          <ScoreInput
            label="Infrastructure Monitoring"
            value={monitoringAndObservability.infrastructureMonitoring}
            onChange={(value) => setMonitoringAndObservability(prev => ({ ...prev, infrastructureMonitoring: value }))}
            description="Infrastructure monitoring"
          />
          <ScoreInput
            label="Logging and Alerting"
            value={monitoringAndObservability.loggingAndAlerting}
            onChange={(value) => setMonitoringAndObservability(prev => ({ ...prev, loggingAndAlerting: value }))}
            description="Logging and alerting systems"
          />
          <ScoreInput
            label="Model Explainability"
            value={monitoringAndObservability.modelExplainability}
            onChange={(value) => setMonitoringAndObservability(prev => ({ ...prev, modelExplainability: value }))}
            description="Model explainability tools"
          />
        </Section>

        <Section title="Security and Compliance">
          <ScoreInput
            label="Identity Access Management"
            value={securityAndCompliance.identityAccessManagement}
            onChange={(value) => setSecurityAndCompliance(prev => ({ ...prev, identityAccessManagement: value }))}
            description="IAM capabilities"
          />
          <ScoreInput
            label="Data Encryption"
            value={securityAndCompliance.dataEncryption}
            onChange={(value) => setSecurityAndCompliance(prev => ({ ...prev, dataEncryption: value }))}
            description="Data encryption at rest and in transit"
          />
          <ScoreInput
            label="Compliance Certifications"
            value={securityAndCompliance.complianceCertifications}
            onChange={(value) => setSecurityAndCompliance(prev => ({ ...prev, complianceCertifications: value }))}
            description="Compliance certifications"
          />
          <ScoreInput
            label="Network Security"
            value={securityAndCompliance.networkSecurity}
            onChange={(value) => setSecurityAndCompliance(prev => ({ ...prev, networkSecurity: value }))}
            description="Network security features"
          />
          <ScoreInput
            label="Audit Logging"
            value={securityAndCompliance.auditLogging}
            onChange={(value) => setSecurityAndCompliance(prev => ({ ...prev, auditLogging: value }))}
            description="Audit logging capabilities"
          />
        </Section>

        <Section title="Cost Management">
          <ScoreInput
            label="Cost Transparency"
            value={costManagement.costTransparency}
            onChange={(value) => setCostManagement(prev => ({ ...prev, costTransparency: value }))}
            description="Cost transparency and reporting"
          />
          <ScoreInput
            label="Resource Optimization"
            value={costManagement.resourceOptimization}
            onChange={(value) => setCostManagement(prev => ({ ...prev, resourceOptimization: value }))}
            description="Resource utilization optimization"
          />
          <ScoreInput
            label="Pricing Flexibility"
            value={costManagement.pricingFlexibility}
            onChange={(value) => setCostManagement(prev => ({ ...prev, pricingFlexibility: value }))}
            description="Flexible pricing models"
          />
          <ScoreInput
            label="Cost Prediction Score"
            value={costManagement.costPredictionScore}
            onChange={(value) => setCostManagement(prev => ({ ...prev, costPredictionScore: value }))}
            description="Cost prediction and budgeting"
          />
        </Section>

        <Section title="Developer Experience">
          <ScoreInput
            label="API/SDK Quality"
            value={developerExperience.apiSdkQuality}
            onChange={(value) => setDeveloperExperience(prev => ({ ...prev, apiSdkQuality: value }))}
            description="API and SDK quality"
          />
          <ScoreInput
            label="Tool Integration"
            value={developerExperience.toolIntegration}
            onChange={(value) => setDeveloperExperience(prev => ({ ...prev, toolIntegration: value }))}
            description="Integration with ML tools"
          />
          <ScoreInput
            label="Documentation Quality"
            value={developerExperience.documentationQuality}
            onChange={(value) => setDeveloperExperience(prev => ({ ...prev, documentationQuality: value }))}
            description="Documentation quality"
          />
          <ScoreInput
            label="Community Support"
            value={developerExperience.communitySupport}
            onChange={(value) => setDeveloperExperience(prev => ({ ...prev, communitySupport: value }))}
            description="Community and support"
          />
          <ScoreInput
            label="Migration Tools"
            value={developerExperience.migrationTools}
            onChange={(value) => setDeveloperExperience(prev => ({ ...prev, migrationTools: value }))}
            description="Migration tools and support"
          />
        </Section>

        <Section title="Performance and Reliability">
          <ScoreInput
            label="SLA Score"
            value={performanceAndReliability.slaScore}
            onChange={(value) => setPerformanceAndReliability(prev => ({ ...prev, slaScore: value }))}
            description="Service level agreements"
          />
          <ScoreInput
            label="Global Availability"
            value={performanceAndReliability.globalAvailability}
            onChange={(value) => setPerformanceAndReliability(prev => ({ ...prev, globalAvailability: value }))}
            description="Global availability and regions"
          />
          <ScoreInput
            label="Disaster Recovery"
            value={performanceAndReliability.disasterRecovery}
            onChange={(value) => setPerformanceAndReliability(prev => ({ ...prev, disasterRecovery: value }))}
            description="Disaster recovery capabilities"
          />
          <ScoreInput
            label="Performance Benchmarks"
            value={performanceAndReliability.performanceBenchmarks}
            onChange={(value) => setPerformanceAndReliability(prev => ({ ...prev, performanceBenchmarks: value }))}
            description="Performance benchmarks for ML workloads"
          />
        </Section>

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px'
        }}>
          <button
            type="button"
            onClick={onCancel}
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
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '12px 30px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Complete Evaluation
          </button>
        </div>
      </form>
    </div>
  );
};
