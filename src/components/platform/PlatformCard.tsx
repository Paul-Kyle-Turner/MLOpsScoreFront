import React from "react";
import type { PlatformInformation } from "../../model/platform";

interface PlatformCardProps {
  platform: PlatformInformation;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const primaryRegion = platform.regions[0];
  const minPrice = Math.min(
    ...platform.computeInstances
      .flatMap((instance) => instance.pricingModels)
      .filter((pricing) => pricing.pricePerHour)
      .map((pricing) => pricing.pricePerHour!)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {platform.platformName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{platform.platformType}</p>
        </div>
        {platform.parentCompany && (
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
            {platform.parentCompany}
          </span>
        )}
      </div>

      {/* Key Info */}
      <div className="space-y-3">
        {/* Regions */}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Regions:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{platform.regions.length}</span>
        </div>

        {/* Primary Location */}
        {primaryRegion && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Primary:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {primaryRegion.regionName}
            </span>
          </div>
        )}

        {/* Pricing */}
        {!isNaN(minPrice) && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Starting at:</span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ${minPrice.toFixed(2)}/hr
            </span>
          </div>
        )}

        {/* SLA */}
        {platform.slaUptime && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">SLA:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{platform.slaUptime}%</span>
          </div>
        )}

        {/* Compute Instances */}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Instance Types:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {platform.computeInstances.length}
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap gap-2">
          {platform.bareMetalAvailable && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
              Bare Metal
            </span>
          )}
          {platform.networking.vpcSupport && (
            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
              VPC
            </span>
          )}
          {platform.securityFeatures.encryptionAtRest && (
            <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
              Encrypted
            </span>
          )}
          {platform.edgeLocations && platform.edgeLocations > 0 && (
            <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
              Edge
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <a
          href={platform.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          Learn More →
        </a>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Updated: {new Date(platform.lastUpdated).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
