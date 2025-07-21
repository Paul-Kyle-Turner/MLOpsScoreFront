import React from "react";
import { Link } from "react-router-dom";
import type { PlatformInformation } from "../../model/platform";

interface PlatformCardProps {
  platform: PlatformInformation;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const primaryRegion = platform.regions[0];

  // Fix the minPrice calculation with proper null checks
  const minPrice =
    platform.computeInstances && platform.computeInstances.length > 0
      ? Math.min(
          ...platform.computeInstances
            .flatMap((instance) => instance.pricingModels || [])
            .filter((pricing) => pricing.pricePerHour)
            .map((pricing) => pricing.pricePerHour!)
        )
      : null;

  console.log("Platform Card Data:", { platform });

  return (
    <div>
      {/* Header */}
      <h3>{platform.platformName}</h3>
      <p>{platform.platformType}</p>
      {platform.parentCompany && platform.parentCompany}

      {/* Key Info */}
      <div>
        Regions: {platform.regions.length}
        {primaryRegion && <>Primary: {primaryRegion.regionName}</>}
        {minPrice !== null && !isNaN(minPrice) && (
          <>Starting at: ${minPrice.toFixed(2)}/hr</>
        )}
        {platform.slaUptime && <>SLA: {platform.slaUptime}%</>}
        Instance Types: {platform.computeInstances?.length || 0}
      </div>

      {/* Features */}
      <div>
        {platform.bareMetalAvailable && "Bare Metal"}
        {platform.networking.vpcSupport && "VPC"}
        {platform.securityFeatures &&
          platform.securityFeatures.encryptionAtRest &&
          "Encrypted"}
        {platform.edgeLocations && platform.edgeLocations > 0 && "Edge"}
      </div>

      {/* Footer */}
      <div>
        <Link to={`/platform/${encodeURIComponent(platform.platformName)}`}>
          View Details →
        </Link>
        <a href={platform.websiteUrl} target="_blank" rel="noopener noreferrer">
          Website →
        </a>
        Updated: {new Date(platform.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  );
};
