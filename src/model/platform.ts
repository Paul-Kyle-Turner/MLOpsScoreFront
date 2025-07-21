/* eslint-disable @typescript-eslint/no-explicit-any */
// Enums
// Enums aren't real
// Typescript 5.8 removed them with the erasableSyntaxOnly flag
export const PlatformType = {
    HYPERSCALER: "Hyperscaler",
    GPU_CLOUD: "GPU Cloud",
    EDGE_CLOUD: "Edge Cloud",
    HYBRID_CLOUD: "Hybrid Cloud",
    PRIVATE_CLOUD: "Private Cloud",
    SPECIALIZED_AI: "Specialized AI",
    CONTAINER_PLATFORM: "Container Platform",
    SERVERLESS: "Serverless",
    OTHER: "Other"
} as const;

export type PlatformType = typeof PlatformType[keyof typeof PlatformType];

export const DatacenterTier = {
    TIER_1: "Tier 1",
    TIER_2: "Tier 2",
    TIER_3: "Tier 3",
    TIER_4: "Tier 4",
    TIER_5: "Tier 5",
    COLOCATION: "Colocation",
    EDGE: "Edge",
    HYBRID: "Hybrid",
    UNKNOWN: "Unknown"
} as const;

export type DatacenterTier = typeof DatacenterTier[keyof typeof DatacenterTier];

export const ComplianceStatus = {
    CERTIFIED: "Certified",
    IN_PROGRESS: "In Progress",
    PLANNED: "Planned",
    NOT_APPLICABLE: "Not Applicable",
    UNKNOWN: "Unknown"
} as const;

export type ComplianceStatus = typeof ComplianceStatus[keyof typeof ComplianceStatus];

export const PricingType = {
    ON_DEMAND: "On-Demand",
    RESERVED: "Reserved",
    SPOT: "Spot",
    PREEMPTIBLE: "Preemptible",
    DEDICATED: "Dedicated",
    BURSTABLE: "Burstable"
} as const;

export type PricingType = typeof PricingType[keyof typeof PricingType];

export const BillingIncrement = {
    PER_SECOND: "Per Second",
    PER_MINUTE: "Per Minute",
    PER_HOUR: "Per Hour",
    PER_DAY: "Per Day",
    PER_MONTH: "Per Month",
    PER_YEAR: "Per Year",
    ONE_TIME: "One Time",
    CUSTOM: "Custom"
} as const;

export type BillingIncrement = typeof BillingIncrement[keyof typeof BillingIncrement];

// Interfaces
export interface GeographicRegion {
    regionName: string;
    regionCode?: string;
    countryCode: string;
    availabilityZones?: number;
    datacenterTier: DatacenterTier;
    edgeLocation: boolean;
}

export interface ComplianceCertification {
    certificationName: string;
    status: ComplianceStatus;
    certificationDate?: string; // ISO date string
    certifyingBody?: string;
    certificateUrl?: string;
}

export interface PricingModel {
    pricingType: PricingType;
    pricePerHour?: number;
    pricePerMonth?: number;
    minimumCommitment?: string;
    billingIncrement?: BillingIncrement;
}

export interface ComputeInstance {
    instanceName: string;
    instanceFamily?: string;
    vcpus: number;
    memoryGb: number;
    storageGb?: number;
    storageType?: string;
    gpuCount?: number;
    gpuType?: string;
    gpuMemoryGb?: number;
    networkPerformance?: string;
    pricingModels: PricingModel[];
    architecture?: string;
    specializedHardware?: string;
}

export interface ProprietarySoftware {
    softwareName: string;
    softwareType: string;
    description: string;
    version?: string;
    openSource: boolean;
    licenseType?: string;
    documentationUrl?: string;
    githubUrl?: string;
    useCases?: string[];
}

export interface ProprietaryHardware {
    hardwareName: string;
    hardwareType: string;
    description: string;
    specifications?: Record<string, any>;
    performanceMetrics?: Record<string, any>;
    availability?: string;
    generation?: string;
    manufacturingPartner?: string;
    useCases?: string[];
}

export interface NetworkingCapabilities {
    bandwidthGbps?: number;
    networkType?: string;
    interconnectTechnology?: string;
    vpcSupport: boolean;
    loadBalancing: boolean;
    cdnIntegration: boolean;
    privateNetworking: boolean;
}

export interface SecurityFeatures {
    encryptionAtRest: boolean;
    encryptionInTransit: boolean;
    keyManagement: boolean;
    identityManagement: boolean;
    networkSecurity: boolean;
    vulnerabilityScanning: boolean;
    securityMonitoring: boolean;
    penetrationTesting: boolean;
}

export interface SupportTier {
    tierName: string;
    averageResponseTime?: string;
    channels: string[];
    hours: string;
    price?: string;
    premiumFeatures?: string[];
}

export interface PlatformInformation {
    id?: string; // Optional ID for the platform, useful for updates or deletions

    // Basic Platform Information
    platformName: string;
    platformType: PlatformType;
    parentCompany?: string;
    foundedDate?: string; // ISO date string
    headquarters?: string;
    websiteUrl: string;
    documentationUrl?: string;

    // Geographic and Infrastructure
    regions: GeographicRegion[];
    primaryDatacenterTier: DatacenterTier;
    totalDatacenters?: number;
    edgeLocations?: number;

    // Compliance and Certifications
    complianceCertifications: ComplianceCertification[];

    // Compute Resources
    computeInstances: ComputeInstance[];
    customConfigurationSupport: boolean;
    bareMetalAvailable: boolean;

    // Proprietary Technology
    proprietarySoftware: ProprietarySoftware[];
    proprietaryHardware: ProprietaryHardware[];

    // Technical Capabilities
    networking: NetworkingCapabilities;
    securityFeatures: SecurityFeatures;

    // Service and Support
    supportTiers: SupportTier[];
    slaUptime?: number;

    // Additional Information
    specializations?: string[];
    targetMarkets?: string[];
    notableCustomers?: string[];
    partnerships?: string[];

    // Metadata
    lastUpdated: string; // ISO datetime string
    dataSources?: string[];
}
