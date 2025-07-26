import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getPlatformByName, getPlatform } from "../api/platform";
import { EvaluateButton } from "../components/evaluateButton/EvaluateButton";
import type {
  PlatformInformation,
  ComputeInstance,
  ProprietarySoftware,
  ProprietaryHardware,
  SupportTier,
} from "../model/platform";
import { useSlackAuth } from "../hooks/useSlackAuth";

const Platform: React.FC = () => {
  const { platformName } = useParams<{ platformName: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<PlatformInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authState } = useSlackAuth();

  useEffect(() => {
    const fetchPlatform = async () => {
      // Check for platform ID in search params first
      const platformId = searchParams.get("id");

      if (platformId) {
        // Fetch by ID if provided
        try {
          setLoading(true);
          setError(null);
          const platformData = await getPlatform(platformId);
          setPlatform(platformData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch platform"
          );
        } finally {
          setLoading(false);
        }
      } else if (platformName) {
        // Fallback to fetching by name for backward compatibility
        try {
          setLoading(true);
          setError(null);
          const platformData = await getPlatformByName(platformName);
          setPlatform(platformData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch platform"
          );
        } finally {
          setLoading(false);
        }
      } else {
        setError("Platform ID or name is required");
        setLoading(false);
      }
    };

    fetchPlatform();
  }, [platformName, searchParams]);

  if (loading) {
    return (
      <div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 style={{ color: "var(--bs-body-color)" }}>
              Loading Platform Information...
            </h4>
            <p className="text-muted">
              Please wait while we fetch the details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-danger">
                <div className="card-body text-center">
                  <h1 className="card-title text-danger">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Error
                  </h1>
                  <p className="card-text text-danger">{error}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!platform) {
    return (
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-warning">
                <div className="card-body text-center">
                  <h1 className="card-title text-warning">
                    <i className="bi bi-search me-2"></i>
                    Platform Not Found
                  </h1>
                  <p className="card-text">
                    The platform you're looking for doesn't exist or has been
                    removed.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid px-4 py-3">
        {/* Platform Header */}
        <div
          className="card mb-4 border-0 shadow-sm"
          style={{ backgroundColor: "var(--custom-card-bg)" }}
        >
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1
                  className="display-5 fw-bold mb-2"
                  style={{ color: "var(--bs-body-color)" }}
                >
                  {platform.platformName}
                </h1>
                <span className="badge bg-primary fs-6 mb-3">
                  {platform.platformType}
                </span>
                {platform.parentCompany && (
                  <p className="lead text-muted mb-3">
                    <i className="bi bi-building me-2"></i>
                    by {platform.parentCompany}
                  </p>
                )}
              </div>
              <div className="col-md-4 text-md-end">
                <div className="d-flex flex-column gap-2">
                  {authState?.ok && (
                    <EvaluateButton
                      platform={platform}
                      variant="success"
                      size="lg"
                      className="fw-bold"
                    />
                  )}
                  {platform.websiteUrl && (
                    <a
                      href={platform.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-globe me-2"></i>
                      Visit Website
                    </a>
                  )}
                  {platform.documentationUrl && (
                    <a
                      href={platform.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-info"
                    >
                      <i className="bi bi-file-text me-2"></i>
                      Documentation
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="row mb-4">
          <div className="col-md-3 col-sm-6 mb-3">
            <div
              className="card h-100 text-center border-0 shadow-sm hover-shadow-lg"
              style={{ backgroundColor: "var(--custom-card-bg)" }}
            >
              <div className="card-body">
                <i className="bi bi-geo-alt-fill text-primary fs-1 mb-2"></i>
                <h3 className="fw-bold text-primary">
                  {platform.regions.length}
                </h3>
                <p className="text-muted mb-0">Regions</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div
              className="card h-100 text-center border-0 shadow-sm hover-shadow-lg"
              style={{ backgroundColor: "var(--custom-card-bg)" }}
            >
              <div className="card-body">
                <i className="bi bi-cpu-fill text-success fs-1 mb-2"></i>
                <h3 className="fw-bold text-success">
                  {platform.computeInstances.length}
                </h3>
                <p className="text-muted mb-0">Instance Types</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div
              className="card h-100 text-center border-0 shadow-sm hover-shadow-lg"
              style={{ backgroundColor: "var(--custom-card-bg)" }}
            >
              <div className="card-body">
                <i className="bi bi-shield-check text-info fs-1 mb-2"></i>
                <h3 className="fw-bold text-info">
                  {platform.slaUptime ? `${platform.slaUptime}%` : "N/A"}
                </h3>
                <p className="text-muted mb-0">SLA Uptime</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div
              className="card h-100 text-center border-0 shadow-sm hover-shadow-lg"
              style={{ backgroundColor: "var(--custom-card-bg)" }}
            >
              <div className="card-body">
                <i className="bi bi-headset text-warning fs-1 mb-2"></i>
                <h3 className="fw-bold text-warning">
                  {platform.supportTiers.length}
                </h3>
                <p className="text-muted mb-0">Support Tiers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <RegionsSection regions={platform.regions} />
        <ComputeInstancesSection instances={platform.computeInstances} />
        <SecurityComplianceSection
          security={platform.securityFeatures}
          compliance={platform.complianceCertifications}
        />

        {(platform.proprietarySoftware.length > 0 ||
          platform.proprietaryHardware.length > 0) && (
          <ProprietaryTechSection
            software={platform.proprietarySoftware}
            hardware={platform.proprietaryHardware}
          />
        )}

        <SupportSection supportTiers={platform.supportTiers} />
        <AdditionalInfoSection platform={platform} />
      </div>
    </div>
  );
};

const RegionsSection: React.FC<{ regions: PlatformInformation["regions"] }> = ({
  regions,
}) => (
  <div
    className="card mb-4 border-0 shadow-sm"
    style={{ backgroundColor: "var(--custom-card-bg)" }}
  >
    <div className="card-header bg-transparent border-0 py-3">
      <h2 className="mb-0" style={{ color: "var(--bs-body-color)" }}>
        <i className="bi bi-geo-alt-fill text-primary me-3"></i>
        Geographic Regions
      </h2>
    </div>
    <div className="card-body">
      <div className="row">
        {regions.map((region, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div
              className="card h-100 border-1 hover-shadow-lg"
              style={{
                backgroundColor: "var(--bs-secondary-bg)",
                borderColor: "var(--custom-card-border)",
              }}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary">
                  <i className="bi bi-pin-map me-2"></i>
                  {region.regionName}
                </h5>
                <div className="row g-2 small">
                  {region.regionCode && (
                    <div className="col-6">
                      <span className="text-muted">Code:</span>
                      <span className="fw-semibold ms-1">
                        {region.regionCode}
                      </span>
                    </div>
                  )}
                  <div className="col-6">
                    <span className="text-muted">Country:</span>
                    <span className="fw-semibold ms-1">
                      {region.countryCode}
                    </span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted">Tier:</span>
                    <span className="badge bg-info ms-1">
                      {region.datacenterTier}
                    </span>
                  </div>
                  {region.availabilityZones && (
                    <div className="col-6">
                      <span className="text-muted">AZs:</span>
                      <span className="fw-semibold ms-1">
                        {region.availabilityZones}
                      </span>
                    </div>
                  )}
                </div>
                {region.edgeLocation && (
                  <div className="mt-2">
                    <span className="badge bg-success">
                      <i className="bi bi-lightning-fill me-1"></i>
                      Edge Location
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ComputeInstancesSection: React.FC<{ instances: ComputeInstance[] }> = ({
  instances,
}) => (
  <div
    className="card mb-4 border-0 shadow-sm"
    style={{ backgroundColor: "var(--custom-card-bg)" }}
  >
    <div className="card-header bg-transparent border-0 py-3">
      <h2 className="mb-0" style={{ color: "var(--bs-body-color)" }}>
        <i className="bi bi-cpu-fill text-success me-3"></i>
        Compute Instances
      </h2>
    </div>
    <div className="card-body p-0">
      <div className="table-responsive">
        <table
          className="table table-hover mb-0"
          style={{ backgroundColor: "var(--custom-card-bg)" }}
        >
          <thead style={{ backgroundColor: "var(--bs-secondary-bg)" }}>
            <tr>
              <th className="border-0 fw-bold">Instance</th>
              <th className="border-0 fw-bold text-center">vCPUs</th>
              <th className="border-0 fw-bold text-center">Memory</th>
              <th className="border-0 fw-bold text-center">Storage</th>
              <th className="border-0 fw-bold text-center">GPU</th>
              <th className="border-0 fw-bold text-center">Starting Price</th>
            </tr>
          </thead>
          <tbody>
            {instances.map((instance, index) => {
              const minPrice = Math.min(
                ...instance.pricingModels
                  .filter((p) => p.pricePerHour)
                  .map((p) => p.pricePerHour!)
              );

              return (
                <tr
                  key={index}
                  style={{ borderColor: "var(--custom-card-border)" }}
                >
                  <td className="border-0">
                    <div className="fw-bold text-primary">
                      {instance.instanceName}
                    </div>
                    {instance.instanceFamily && (
                      <small className="text-muted">
                        {instance.instanceFamily}
                      </small>
                    )}
                  </td>
                  <td className="border-0 text-center">
                    <span className="badge bg-light text-dark">
                      {instance.vcpus}
                    </span>
                  </td>
                  <td className="border-0 text-center">
                    <span className="fw-semibold">{instance.memoryGb} GB</span>
                  </td>
                  <td className="border-0 text-center">
                    <div>
                      {instance.storageGb ? `${instance.storageGb} GB` : "N/A"}
                      {instance.storageType && (
                        <div>
                          <small className="text-muted">
                            {instance.storageType}
                          </small>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="border-0 text-center">
                    {instance.gpuCount ? (
                      <div>
                        <div className="fw-semibold text-warning">
                          {instance.gpuCount}x {instance.gpuType || "GPU"}
                        </div>
                        {instance.gpuMemoryGb && (
                          <small className="text-muted">
                            {instance.gpuMemoryGb} GB
                          </small>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted">None</span>
                    )}
                  </td>
                  <td className="border-0 text-center">
                    {!isNaN(minPrice) ? (
                      <span className="fw-bold text-success">
                        ${minPrice.toFixed(2)}/hr
                      </span>
                    ) : (
                      <span className="text-muted">Contact</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SecurityComplianceSection: React.FC<{
  security: PlatformInformation["securityFeatures"];
  compliance: PlatformInformation["complianceCertifications"];
}> = ({ security, compliance }) => (
  <div
    className="card mb-4 border-0 shadow-sm"
    style={{ backgroundColor: "var(--custom-card-bg)" }}
  >
    <div className="card-header bg-transparent border-0 py-3">
      <h2 className="mb-0" style={{ color: "var(--bs-body-color)" }}>
        <i className="bi bi-shield-check text-info me-3"></i>
        Security & Compliance
      </h2>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-lg-6 mb-4">
          <h5 className="text-info mb-3">
            <i className="bi bi-lock-fill me-2"></i>
            Security Features
          </h5>
          <div className="row g-2">
            {Object.entries(security).map(([key, value]) => (
              <div key={key} className="col-sm-6">
                <div
                  className="d-flex align-items-center p-2 rounded"
                  style={{ backgroundColor: "var(--bs-secondary-bg)" }}
                >
                  <span
                    className={`me-2 ${value ? "text-success" : "text-danger"}`}
                  >
                    <i
                      className={`bi ${
                        value ? "bi-check-circle-fill" : "bi-x-circle-fill"
                      }`}
                    ></i>
                  </span>
                  <span className="small">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          <h5 className="text-warning mb-3">
            <i className="bi bi-award-fill me-2"></i>
            Compliance Certifications
          </h5>
          <div className="row g-3">
            {compliance.map((cert, index) => (
              <div key={index} className="col-12">
                <div
                  className="card border-1 hover-shadow-lg"
                  style={{
                    backgroundColor: "var(--bs-secondary-bg)",
                    borderColor: "var(--custom-card-border)",
                  }}
                >
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="card-title mb-1 fw-bold text-primary">
                          {cert.certificationName}
                        </h6>
                        {cert.certifyingBody && (
                          <p className="small text-muted mb-1">
                            <i className="bi bi-building me-1"></i>
                            {cert.certifyingBody}
                          </p>
                        )}
                        {cert.certificationDate && (
                          <p className="small text-muted mb-0">
                            <i className="bi bi-calendar-check me-1"></i>
                            Certified:{" "}
                            {new Date(
                              cert.certificationDate
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span
                        className={`badge ${
                          cert.status === "Certified"
                            ? "bg-success"
                            : cert.status === "In Progress"
                            ? "bg-warning"
                            : cert.status === "Planned"
                            ? "bg-info"
                            : "bg-secondary"
                        }`}
                      >
                        {cert.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProprietaryTechSection: React.FC<{
  software: ProprietarySoftware[];
  hardware: ProprietaryHardware[];
}> = ({ software, hardware }) => (
  <div
    className="card mb-4 border-0 shadow-sm"
    style={{ backgroundColor: "var(--custom-card-bg)" }}
  >
    <div className="card-header bg-transparent border-0 py-3">
      <h2 className="mb-0" style={{ color: "var(--bs-body-color)" }}>
        <i className="bi bi-gear-fill text-warning me-3"></i>
        Proprietary Technology
      </h2>
    </div>
    <div className="card-body">
      <div className="row">
        {software.length > 0 && (
          <div className="col-lg-6 mb-4">
            <h5 className="text-primary mb-3">
              <i className="bi bi-code-slash me-2"></i>
              Software
            </h5>
            <div className="row g-3">
              {software.map((sw, index) => (
                <div key={index} className="col-12">
                  <div
                    className="card border-1 hover-shadow-lg"
                    style={{
                      backgroundColor: "var(--bs-secondary-bg)",
                      borderColor: "var(--custom-card-border)",
                    }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title mb-1 fw-bold">
                          {sw.softwareName}
                        </h6>
                        <span
                          className={`badge ${
                            sw.openSource ? "bg-success" : "bg-warning"
                          }`}
                        >
                          {sw.openSource ? "Open Source" : "Proprietary"}
                        </span>
                      </div>
                      <p className="card-text small text-muted mb-2">
                        {sw.description}
                      </p>
                      <div className="small">
                        <span className="text-muted">Type:</span>
                        <span className="fw-semibold ms-1">
                          {sw.softwareType}
                        </span>
                        {sw.version && (
                          <>
                            <span className="text-muted ms-3">Version:</span>
                            <span className="fw-semibold ms-1">
                              {sw.version}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hardware.length > 0 && (
          <div className="col-lg-6">
            <h5 className="text-success mb-3">
              <i className="bi bi-cpu-fill me-2"></i>
              Hardware
            </h5>
            <div className="row g-3">
              {hardware.map((hw, index) => (
                <div key={index} className="col-12">
                  <div
                    className="card border-1 hover-shadow-lg"
                    style={{
                      backgroundColor: "var(--bs-secondary-bg)",
                      borderColor: "var(--custom-card-border)",
                    }}
                  >
                    <div className="card-body p-3">
                      <h6 className="card-title mb-1 fw-bold text-success">
                        {hw.hardwareName}
                      </h6>
                      <p className="card-text small text-muted mb-2">
                        {hw.description}
                      </p>
                      <div className="small">
                        <span className="text-muted">Type:</span>
                        <span className="fw-semibold ms-1">
                          {hw.hardwareType}
                        </span>
                        {hw.generation && (
                          <>
                            <span className="text-muted ms-3">Generation:</span>
                            <span className="fw-semibold ms-1">
                              {hw.generation}
                            </span>
                          </>
                        )}
                        {hw.manufacturingPartner && (
                          <>
                            <span className="text-muted ms-3">Partner:</span>
                            <span className="fw-semibold ms-1">
                              {hw.manufacturingPartner}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const SupportSection: React.FC<{ supportTiers: SupportTier[] }> = ({
  supportTiers,
}) => (
  <div
    className="card mb-4 border-0 shadow-sm"
    style={{ backgroundColor: "var(--custom-card-bg)" }}
  >
    <div className="card-header bg-transparent border-0 py-3">
      <h2 className="mb-0" style={{ color: "var(--bs-body-color)" }}>
        <i className="bi bi-headset text-info me-3"></i>
        Support Options
      </h2>
    </div>
    <div className="card-body">
      <div className="row">
        {supportTiers.map((tier, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div
              className="card h-100 border-1 hover-shadow-lg"
              style={{
                backgroundColor: "var(--bs-secondary-bg)",
                borderColor: "var(--custom-card-border)",
              }}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary mb-3">
                  <i className="bi bi-award-fill me-2"></i>
                  {tier.tierName}
                </h5>

                <div className="mb-3">
                  {tier.averageResponseTime && (
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-clock text-warning me-2"></i>
                      <span className="small">Response Time:</span>
                      <span className="fw-semibold ms-1">
                        {tier.averageResponseTime}
                      </span>
                    </div>
                  )}

                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-calendar-range text-info me-2"></i>
                    <span className="small">Hours:</span>
                    <span className="fw-semibold ms-1">{tier.hours}</span>
                  </div>

                  {tier.price && (
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-currency-dollar text-success me-2"></i>
                      <span className="fw-bold text-success">{tier.price}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h6 className="text-muted mb-2">
                    <i className="bi bi-chat-dots me-1"></i>
                    Support Channels:
                  </h6>
                  <div className="d-flex flex-wrap gap-1">
                    {tier.channels.map((channel, i) => (
                      <span
                        key={i}
                        className="badge bg-outline-secondary border small"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AdditionalInfoSection: React.FC<{ platform: PlatformInformation }> = ({
  platform,
}) => (
  <div
    className="card mb-4 border-0 shadow-sm"
    style={{ backgroundColor: "var(--custom-card-bg)" }}
  >
    <div className="card-header bg-transparent border-0 py-3">
      <h2 className="mb-0" style={{ color: "var(--bs-body-color)" }}>
        <i className="bi bi-info-circle-fill text-primary me-3"></i>
        Additional Information
      </h2>
    </div>
    <div className="card-body">
      <div className="row">
        {platform.specializations && platform.specializations.length > 0 && (
          <div className="col-lg-6 mb-4">
            <h6 className="text-primary mb-3">
              <i className="bi bi-star-fill me-2"></i>
              Specializations
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {platform.specializations.map((spec, index) => (
                <span key={index} className="badge bg-primary">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {platform.targetMarkets && platform.targetMarkets.length > 0 && (
          <div className="col-lg-6 mb-4">
            <h6 className="text-success mb-3">
              <i className="bi bi-bullseye me-2"></i>
              Target Markets
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {platform.targetMarkets.map((market, index) => (
                <span key={index} className="badge bg-success">
                  {market}
                </span>
              ))}
            </div>
          </div>
        )}

        {platform.notableCustomers && platform.notableCustomers.length > 0 && (
          <div className="col-lg-6 mb-4">
            <h6 className="text-warning mb-3">
              <i className="bi bi-people-fill me-2"></i>
              Notable Customers
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {platform.notableCustomers.map((customer, index) => (
                <span key={index} className="badge bg-warning text-dark">
                  {customer}
                </span>
              ))}
            </div>
          </div>
        )}

        {platform.partnerships && platform.partnerships.length > 0 && (
          <div className="col-lg-6 mb-4">
            <h6 className="text-info mb-3">
              <i className="bi bi-handshake me-2"></i>
              Partnerships
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {platform.partnerships.map((partnership, index) => (
                <span key={index} className="badge bg-info">
                  {partnership}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr
        className="my-4"
        style={{ borderColor: "var(--custom-card-border)" }}
      />

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-clock-history text-muted me-2"></i>
            <div>
              <small className="text-muted">Last Updated</small>
              <div className="fw-semibold">
                {new Date(platform.lastUpdated).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {platform.foundedDate && (
          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-event text-muted me-2"></i>
              <div>
                <small className="text-muted">Founded</small>
                <div className="fw-semibold">
                  {new Date(platform.foundedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {platform.headquarters && (
          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt text-muted me-2"></i>
              <div>
                <small className="text-muted">Headquarters</small>
                <div className="fw-semibold">{platform.headquarters}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Platform;
