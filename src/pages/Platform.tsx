import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlatformByName } from "../api/platform";
import BasePage from "./Base";
import type {
  PlatformInformation,
  ComputeInstance,
  ProprietarySoftware,
  ProprietaryHardware,
  SupportTier,
} from "../model/platform";

const Platform: React.FC = () => {
  const { platformName } = useParams<{ platformName: string }>();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<PlatformInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatform = async () => {
      if (!platformName) {
        setError("Platform name is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const platformData = await getPlatformByName(platformName);
        setPlatform(platformData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch platform"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlatform();
  }, [platformName]);

  if (loading) {
    return (
      <BasePage title="Loading Platform...">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </BasePage>
    );
  }

  if (error) {
    return (
      <BasePage title="Error">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </div>
      </BasePage>
    );
  }

  if (!platform) {
    return (
      <BasePage title="Platform Not Found">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Platform not found
            </h1>
          </div>
        </div>
      </BasePage>
    );
  }

  return (
    <BasePage title={platform.platformName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {platform.platformName}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {platform.platformType}
              </p>
              {platform.parentCompany && (
                <p className="text-sm text-gray-500 mt-1">
                  by {platform.parentCompany}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              {platform.websiteUrl && (
                <a
                  href={platform.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Visit Website
                </a>
              )}
              {platform.documentationUrl && (
                <a
                  href={platform.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Documentation
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Regions</h3>
            <p className="text-2xl font-bold text-gray-900">
              {platform.regions.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Instance Types
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {platform.computeInstances.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">SLA Uptime</h3>
            <p className="text-2xl font-bold text-gray-900">
              {platform.slaUptime ? `${platform.slaUptime}%` : "N/A"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Support Tiers</h3>
            <p className="text-2xl font-bold text-gray-900">
              {platform.supportTiers.length}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Geographic Regions */}
          <RegionsSection regions={platform.regions} />

          {/* Compute Instances */}
          <ComputeInstancesSection instances={platform.computeInstances} />

          {/* Security & Compliance */}
          <SecurityComplianceSection
            security={platform.securityFeatures}
            compliance={platform.complianceCertifications}
          />

          {/* Proprietary Technology */}
          {(platform.proprietarySoftware.length > 0 ||
            platform.proprietaryHardware.length > 0) && (
            <ProprietaryTechSection
              software={platform.proprietarySoftware}
              hardware={platform.proprietaryHardware}
            />
          )}

          {/* Support */}
          <SupportSection supportTiers={platform.supportTiers} />

          {/* Additional Information */}
          <AdditionalInfoSection platform={platform} />
        </div>
      </div>
    </BasePage>
  );
};

// Component for Geographic Regions
const RegionsSection: React.FC<{ regions: PlatformInformation["regions"] }> = ({
  regions,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Geographic Regions</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {regions.map((region, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900">{region.regionName}</h3>
          {region.regionCode && (
            <p className="text-sm text-gray-600">Code: {region.regionCode}</p>
          )}
          <p className="text-sm text-gray-600">Country: {region.countryCode}</p>
          <p className="text-sm text-gray-600">Tier: {region.datacenterTier}</p>
          {region.availabilityZones && (
            <p className="text-sm text-gray-600">
              AZs: {region.availabilityZones}
            </p>
          )}
          {region.edgeLocation && (
            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-2">
              Edge Location
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Component for Compute Instances
const ComputeInstancesSection: React.FC<{ instances: ComputeInstance[] }> = ({
  instances,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Compute Instances</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Instance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              vCPUs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Memory
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Storage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GPU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Starting Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {instances.map((instance, index) => {
            const minPrice = Math.min(
              ...instance.pricingModels
                .filter((p) => p.pricePerHour)
                .map((p) => p.pricePerHour!)
            );

            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {instance.instanceName}
                    </div>
                    {instance.instanceFamily && (
                      <div className="text-sm text-gray-500">
                        {instance.instanceFamily}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {instance.vcpus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {instance.memoryGb} GB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {instance.storageGb ? `${instance.storageGb} GB` : "N/A"}
                  {instance.storageType && (
                    <div className="text-xs text-gray-500">
                      {instance.storageType}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {instance.gpuCount ? (
                    <div>
                      {instance.gpuCount}x {instance.gpuType || "GPU"}
                      {instance.gpuMemoryGb && (
                        <div className="text-xs text-gray-500">
                          {instance.gpuMemoryGb} GB
                        </div>
                      )}
                    </div>
                  ) : (
                    "None"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {!isNaN(minPrice) ? `$${minPrice.toFixed(2)}/hr` : "Contact"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// Component for Security & Compliance
const SecurityComplianceSection: React.FC<{
  security: PlatformInformation["securityFeatures"];
  compliance: PlatformInformation["complianceCertifications"];
}> = ({ security, compliance }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">
      Security & Compliance
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Security Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Security Features
        </h3>
        <div className="space-y-2">
          {Object.entries(security).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <span
                className={`text-sm font-medium ${
                  value ? "text-green-600" : "text-red-600"
                }`}
              >
                {value ? "✓" : "✗"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Certifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Compliance Certifications
        </h3>
        <div className="space-y-3">
          {compliance.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {cert.certificationName}
                  </h4>
                  {cert.certifyingBody && (
                    <p className="text-sm text-gray-600">
                      {cert.certifyingBody}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    cert.status === "Certified"
                      ? "bg-green-100 text-green-800"
                      : cert.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {cert.status}
                </span>
              </div>
              {cert.certificationDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Certified:{" "}
                  {new Date(cert.certificationDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Component for Proprietary Technology
const ProprietaryTechSection: React.FC<{
  software: ProprietarySoftware[];
  hardware: ProprietaryHardware[];
}> = ({ software, hardware }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">
      Proprietary Technology
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Software */}
      {software.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Software</h3>
          <div className="space-y-3">
            {software.map((sw, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">
                    {sw.softwareName}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      sw.openSource
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {sw.openSource ? "Open Source" : "Proprietary"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{sw.description}</p>
                <p className="text-sm text-gray-500">Type: {sw.softwareType}</p>
                {sw.version && (
                  <p className="text-sm text-gray-500">Version: {sw.version}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hardware */}
      {hardware.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Hardware</h3>
          <div className="space-y-3">
            {hardware.map((hw, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-medium text-gray-900">{hw.hardwareName}</h4>
                <p className="text-sm text-gray-600 mb-2">{hw.description}</p>
                <p className="text-sm text-gray-500">Type: {hw.hardwareType}</p>
                {hw.generation && (
                  <p className="text-sm text-gray-500">
                    Generation: {hw.generation}
                  </p>
                )}
                {hw.manufacturingPartner && (
                  <p className="text-sm text-gray-500">
                    Partner: {hw.manufacturingPartner}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

// Component for Support
const SupportSection: React.FC<{ supportTiers: SupportTier[] }> = ({
  supportTiers,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Support Options</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {supportTiers.map((tier, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{tier.tierName}</h3>
          {tier.averageResponseTime && (
            <p className="text-sm text-gray-600 mb-2">
              Response Time: {tier.averageResponseTime}
            </p>
          )}
          <p className="text-sm text-gray-600 mb-2">Hours: {tier.hours}</p>
          {tier.price && (
            <p className="text-sm font-medium text-green-600 mb-2">
              {tier.price}
            </p>
          )}
          <div className="text-sm text-gray-600">
            <p className="font-medium">Channels:</p>
            <ul className="list-disc list-inside">
              {tier.channels.map((channel, i) => (
                <li key={i}>{channel}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Component for Additional Information
const AdditionalInfoSection: React.FC<{ platform: PlatformInformation }> = ({
  platform,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">
      Additional Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {platform.specializations && platform.specializations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Specializations
          </h3>
          <div className="flex flex-wrap gap-2">
            {platform.specializations.map((spec, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {platform.targetMarkets && platform.targetMarkets.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Target Markets
          </h3>
          <div className="flex flex-wrap gap-2">
            {platform.targetMarkets.map((market, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      )}

      {platform.notableCustomers && platform.notableCustomers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Notable Customers
          </h3>
          <div className="flex flex-wrap gap-2">
            {platform.notableCustomers.map((customer, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded"
              >
                {customer}
              </span>
            ))}
          </div>
        </div>
      )}

      {platform.partnerships && platform.partnerships.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Partnerships
          </h3>
          <div className="flex flex-wrap gap-2">
            {platform.partnerships.map((partnership, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded"
              >
                {partnership}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Metadata */}
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="text-sm text-gray-500">
        <p>Last Updated: {new Date(platform.lastUpdated).toLocaleString()}</p>
        {platform.foundedDate && (
          <p>Founded: {new Date(platform.foundedDate).toLocaleDateString()}</p>
        )}
        {platform.headquarters && <p>Headquarters: {platform.headquarters}</p>}
      </div>
    </div>
  </div>
);

export default Platform;
