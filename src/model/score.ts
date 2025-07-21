import { PlatformType } from './platform';

/**
 * Score range validation interface
 */
export interface ScoreRange {
  minScore: number; // Default: 1, range: 1-10
  maxScore: number; // Default: 10, range: 1-10
}

/**
 * Compute and scaling capabilities
 */
export interface ComputeAndScaling {
  /** Variety of compute options (CPU, GPU, TPU, etc.) - Score 1-10 */
  computeVarietyScore: number;
  /** Auto-scaling capabilities - Score 1-10 */
  autoScalingScore: number;
  /** Spot/preemptible instance availability - Score 1-10 */
  spotInstanceSupport: number;
  /** Multi-node distributed training - Score 1-10 */
  distributedTrainingSupport: number;
}

/**
 * Data management and storage capabilities
 */
export interface DataManagement {
  /** Variety of storage solutions - Score 1-10 */
  storageOptionsScore: number;
  /** Data versioning capabilities - Score 1-10 */
  dataVersioningScore: number;
  /** Data pipeline tools - Score 1-10 */
  dataPipelineOrchestration: number;
  /** Integration with data sources - Score 1-10 */
  dataIntegrationScore: number;
}

/**
 * Model development and training capabilities
 */
export interface ModelDevelopment {
  /** ML framework support - Score 1-10 */
  frameworkSupportScore: number;
  /** Experiment tracking tools - Score 1-10 */
  experimentTrackingScore: number;
  /** Hyperparameter optimization - Score 1-10 */
  hyperparameterTuningScore: number;
  /** Managed notebook environments - Score 1-10 */
  notebookEnvironmentScore: number;
}

/**
 * MLOps pipeline and orchestration capabilities
 */
export interface MLOpsPipeline {
  /** Workflow orchestration tools - Score 1-10 */
  workflowOrchestrationScore: number;
  /** CI/CD integration - Score 1-10 */
  cicdIntegrationScore: number;
  /** Automated model validation - Score 1-10 */
  modelValidationScore: number;
  /** Environment management - Score 1-10 */
  environmentManagementScore: number;
}

/**
 * Model deployment and serving capabilities
 */
export interface ModelDeployment {
  /** Variety of deployment options - Score 1-10 */
  deploymentOptionsScore: number;
  /** Real-time inference capabilities - Score 1-10 */
  realTimeInferenceScore: number;
  /** Batch inference capabilities - Score 1-10 */
  batchInferenceScore: number;
  /** A/B testing support - Score 1-10 */
  abTestingScore: number;
  /** Canary deployment capabilities - Score 1-10 */
  canaryDeploymentScore: number;
}

/**
 * Monitoring and observability capabilities
 */
export interface MonitoringAndObservability {
  /** Model performance monitoring - Score 1-10 */
  modelPerformanceMonitoring: number;
  /** Data drift detection - Score 1-10 */
  dataDriftDetection: number;
  /** Infrastructure monitoring - Score 1-10 */
  infrastructureMonitoring: number;
  /** Logging and alerting systems - Score 1-10 */
  loggingAndAlerting: number;
  /** Model explainability tools - Score 1-10 */
  modelExplainability: number;
}

/**
 * Security and compliance capabilities
 */
export interface SecurityAndCompliance {
  /** IAM capabilities - Score 1-10 */
  identityAccessManagement: number;
  /** Data encryption at rest and in transit - Score 1-10 */
  dataEncryption: number;
  /** Compliance certifications - Score 1-10 */
  complianceCertifications: number;
  /** Network security features - Score 1-10 */
  networkSecurity: number;
  /** Audit logging capabilities - Score 1-10 */
  auditLogging: number;
}

/**
 * Cost management and optimization capabilities
 */
export interface CostManagement {
  /** Cost transparency and reporting - Score 1-10 */
  costTransparency: number;
  /** Resource utilization optimization - Score 1-10 */
  resourceOptimization: number;
  /** Flexible pricing models - Score 1-10 */
  pricingFlexibility: number;
  /** Cost prediction and budgeting - Score 1-10 */
  costPredictionScore: number;
}

/**
 * Developer experience and integration capabilities
 */
export interface DeveloperExperience {
  /** API and SDK quality - Score 1-10 */
  apiSdkQuality: number;
  /** Integration with ML tools - Score 1-10 */
  toolIntegration: number;
  /** Documentation quality - Score 1-10 */
  documentationQuality: number;
  /** Community and support - Score 1-10 */
  communitySupport: number;
  /** Migration tools and support - Score 1-10 */
  migrationTools: number;
}

/**
 * Performance and reliability capabilities
 */
export interface PerformanceAndReliability {
  /** Service level agreements - Score 1-10 */
  slaScore: number;
  /** Global availability and regions - Score 1-10 */
  globalAvailability: number;
  /** Disaster recovery capabilities - Score 1-10 */
  disasterRecovery: number;
  /** Performance benchmarks for ML workloads - Score 1-10 */
  performanceBenchmarks: number;
}

/**
 * Complete MLOps platform evaluation model
 */
export interface MLOpsPlatformEvaluation {
  /** Unique identifier for the platform */
  platformId?: string | null;
  /** Type of platform */
  platformType: PlatformType;
  /** Date of evaluation */
  evaluationDate: Date;
  /** ID of the evaluator, probably slack id */
  evaluatorId?: string | null;

  // Core proficiency scores
  computeAndScaling: ComputeAndScaling;
  dataManagement: DataManagement;
  modelDevelopment: ModelDevelopment;
  mlOpsPipeline: MLOpsPipeline;
  modelDeployment: ModelDeployment;
  monitoringAndObservability: MonitoringAndObservability;
  securityAndCompliance: SecurityAndCompliance;
  costManagement: CostManagement;
  developerExperience: DeveloperExperience;
  performanceAndReliability: PerformanceAndReliability;
}

/**
 * Summary of proficiency scores
 */
export interface ProficiencySummary {
  computeAndScaling: number;
  dataManagement: number;
  modelDevelopment: number;
  mlOpsPipeline: number;
  modelDeployment: number;
  monitoringAndObservability: number;
  securityAndCompliance: number;
  costManagement: number;
  developerExperience: number;
  performanceAndReliability: number;
  overallScore: number;
}

/**
 * Strength/weakness tuple type
 */
export type StrengthWeaknessTuple = [string, number];

// Utility functions to calculate scores (equivalent to Python @property methods)

/**
 * Calculate overall score for Compute and Scaling
 */
export function calculateComputeAndScalingScore(data: ComputeAndScaling): number {
  return (
    data.computeVarietyScore +
    data.autoScalingScore +
    data.spotInstanceSupport +
    data.distributedTrainingSupport
  ) / 4;
}

/**
 * Calculate overall score for Data Management
 */
export function calculateDataManagementScore(data: DataManagement): number {
  return (
    data.storageOptionsScore +
    data.dataVersioningScore +
    data.dataPipelineOrchestration +
    data.dataIntegrationScore
  ) / 4;
}

/**
 * Calculate overall score for Model Development
 */
export function calculateModelDevelopmentScore(data: ModelDevelopment): number {
  return (
    data.frameworkSupportScore +
    data.experimentTrackingScore +
    data.hyperparameterTuningScore +
    data.notebookEnvironmentScore
  ) / 4;
}

/**
 * Calculate overall score for MLOps Pipeline
 */
export function calculateMLOpsPipelineScore(data: MLOpsPipeline): number {
  return (
    data.workflowOrchestrationScore +
    data.cicdIntegrationScore +
    data.modelValidationScore +
    data.environmentManagementScore
  ) / 4;
}

/**
 * Calculate overall score for Model Deployment
 */
export function calculateModelDeploymentScore(data: ModelDeployment): number {
  return (
    data.deploymentOptionsScore +
    data.realTimeInferenceScore +
    data.batchInferenceScore +
    data.abTestingScore +
    data.canaryDeploymentScore
  ) / 5;
}

/**
 * Calculate overall score for Monitoring and Observability
 */
export function calculateMonitoringAndObservabilityScore(data: MonitoringAndObservability): number {
  return (
    data.modelPerformanceMonitoring +
    data.dataDriftDetection +
    data.infrastructureMonitoring +
    data.loggingAndAlerting +
    data.modelExplainability
  ) / 5;
}

/**
 * Calculate overall score for Security and Compliance
 */
export function calculateSecurityAndComplianceScore(data: SecurityAndCompliance): number {
  return (
    data.identityAccessManagement +
    data.dataEncryption +
    data.complianceCertifications +
    data.networkSecurity +
    data.auditLogging
  ) / 5;
}

/**
 * Calculate overall score for Cost Management
 */
export function calculateCostManagementScore(data: CostManagement): number {
  return (
    data.costTransparency +
    data.resourceOptimization +
    data.pricingFlexibility +
    data.costPredictionScore
  ) / 4;
}

/**
 * Calculate overall score for Developer Experience
 */
export function calculateDeveloperExperienceScore(data: DeveloperExperience): number {
  return (
    data.apiSdkQuality +
    data.toolIntegration +
    data.documentationQuality +
    data.communitySupport +
    data.migrationTools
  ) / 5;
}

/**
 * Calculate overall score for Performance and Reliability
 */
export function calculatePerformanceAndReliabilityScore(data: PerformanceAndReliability): number {
  return (
    data.slaScore +
    data.globalAvailability +
    data.disasterRecovery +
    data.performanceBenchmarks
  ) / 4;
}

/**
 * Calculate overall platform score as average of all proficiency scores
 */
export function calculateOverallPlatformScore(evaluation: MLOpsPlatformEvaluation): number {
  const scores = [
    calculateComputeAndScalingScore(evaluation.computeAndScaling),
    calculateDataManagementScore(evaluation.dataManagement),
    calculateModelDevelopmentScore(evaluation.modelDevelopment),
    calculateMLOpsPipelineScore(evaluation.mlOpsPipeline),
    calculateModelDeploymentScore(evaluation.modelDeployment),
    calculateMonitoringAndObservabilityScore(evaluation.monitoringAndObservability),
    calculateSecurityAndComplianceScore(evaluation.securityAndCompliance),
    calculateCostManagementScore(evaluation.costManagement),
    calculateDeveloperExperienceScore(evaluation.developerExperience),
    calculatePerformanceAndReliabilityScore(evaluation.performanceAndReliability)
  ];
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

/**
 * Get proficiency summary for an evaluation
 */
export function getProficiencySummary(evaluation: MLOpsPlatformEvaluation): ProficiencySummary {
  return {
    computeAndScaling: calculateComputeAndScalingScore(evaluation.computeAndScaling),
    dataManagement: calculateDataManagementScore(evaluation.dataManagement),
    modelDevelopment: calculateModelDevelopmentScore(evaluation.modelDevelopment),
    mlOpsPipeline: calculateMLOpsPipelineScore(evaluation.mlOpsPipeline),
    modelDeployment: calculateModelDeploymentScore(evaluation.modelDeployment),
    monitoringAndObservability: calculateMonitoringAndObservabilityScore(evaluation.monitoringAndObservability),
    securityAndCompliance: calculateSecurityAndComplianceScore(evaluation.securityAndCompliance),
    costManagement: calculateCostManagementScore(evaluation.costManagement),
    developerExperience: calculateDeveloperExperienceScore(evaluation.developerExperience),
    performanceAndReliability: calculatePerformanceAndReliabilityScore(evaluation.performanceAndReliability),
    overallScore: calculateOverallPlatformScore(evaluation)
  };
}

/**
 * Get the top N strengths of the platform
 */
export function getTopStrengths(evaluation: MLOpsPlatformEvaluation, topN: number = 3): StrengthWeaknessTuple[] {
  const summary = getProficiencySummary(evaluation);
  const scores: StrengthWeaknessTuple[] = [
    ['computeAndScaling', summary.computeAndScaling],
    ['dataManagement', summary.dataManagement],
    ['modelDevelopment', summary.modelDevelopment],
    ['mlOpsPipeline', summary.mlOpsPipeline],
    ['modelDeployment', summary.modelDeployment],
    ['monitoringAndObservability', summary.monitoringAndObservability],
    ['securityAndCompliance', summary.securityAndCompliance],
    ['costManagement', summary.costManagement],
    ['developerExperience', summary.developerExperience],
    ['performanceAndReliability', summary.performanceAndReliability]
  ];
  
  return scores
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN);
}

/**
 * Get the top N weaknesses of the platform
 */
export function getTopWeaknesses(evaluation: MLOpsPlatformEvaluation, topN: number = 3): StrengthWeaknessTuple[] {
  const summary = getProficiencySummary(evaluation);
  const scores: StrengthWeaknessTuple[] = [
    ['computeAndScaling', summary.computeAndScaling],
    ['dataManagement', summary.dataManagement],
    ['modelDevelopment', summary.modelDevelopment],
    ['mlOpsPipeline', summary.mlOpsPipeline],
    ['modelDeployment', summary.modelDeployment],
    ['monitoringAndObservability', summary.monitoringAndObservability],
    ['securityAndCompliance', summary.securityAndCompliance],
    ['costManagement', summary.costManagement],
    ['developerExperience', summary.developerExperience],
    ['performanceAndReliability', summary.performanceAndReliability]
  ];
  
  return scores
    .sort((a, b) => a[1] - b[1])
    .slice(0, topN);
}
