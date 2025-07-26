import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlatformType,
  DatacenterTier,
  ComplianceStatus,
  type PlatformInformation,
  type GeographicRegion,
  type ComplianceCertification,
} from "../model/platform";
import { checkPlatformExists, createPlatform } from "../api/platform";
import { ComputeInstanceForm } from "../components/forms/ComputeInstanceForm";
import { ProprietarySoftwareForm } from "../components/forms/ProprietarySoftwareForm";
import { ProprietaryHardwareForm } from "../components/forms/ProprietaryHardwareForm";
import { SupportTierForm } from "../components/forms/SupportTierForm";
import { DidYouMeanPlatformCreate } from "../components/platform";

export const CreatePlatform = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [platformExists, setPlatformExists] = useState<boolean | null>(null);
  const [similarPlatforms, setSimilarPlatforms] = useState<
    PlatformInformation[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<PlatformInformation>>({
    platformName: "",
    platformType: PlatformType.OTHER,
    parentCompany: "",
    foundedDate: "",
    headquarters: "",
    websiteUrl: "",
    documentationUrl: "",
    regions: [],
    primaryDatacenterTier: DatacenterTier.UNKNOWN,
    totalDatacenters: 0,
    edgeLocations: 0,
    complianceCertifications: [],
    computeInstances: [],
    customConfigurationSupport: false,
    bareMetalAvailable: false,
    proprietarySoftware: [],
    proprietaryHardware: [],
    networking: {
      vpcSupport: false,
      loadBalancing: false,
      cdnIntegration: false,
      privateNetworking: false,
    },
    securityFeatures: {
      encryptionAtRest: false,
      encryptionInTransit: false,
      keyManagement: false,
      identityManagement: false,
      networkSecurity: false,
      vulnerabilityScanning: false,
      securityMonitoring: false,
      penetrationTesting: false,
    },
    supportTiers: [],
    slaUptime: 0,
    specializations: [],
    targetMarkets: [],
    notableCustomers: [],
    partnerships: [],
    dataSources: [],
  });

  const checkPlatformName = useCallback(async (name: string) => {
    if (!name.trim()) {
      setPlatformExists(null);
      setSimilarPlatforms([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const results = await checkPlatformExists(name.trim());

      if (results.length > 0) {
        // Check if there's an exact match
        const exactMatch = results.find(
          (platform) =>
            platform.platformName.toLowerCase() === name.trim().toLowerCase()
        );

        if (exactMatch) {
          setPlatformExists(true);
          setSimilarPlatforms([]);
          setShowSuggestions(false);
        } else {
          // Similar platforms found, but no exact match
          setPlatformExists(false);
          setSimilarPlatforms(results);
          setShowSuggestions(true);
        }
      } else {
        // No similar platforms found
        setPlatformExists(false);
        setSimilarPlatforms([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error checking platform name:", error);
      setPlatformExists(null);
      setSimilarPlatforms([]);
      setShowSuggestions(false);
    }
  }, []);

  const handleInputChange = (
    field: keyof PlatformInformation,
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (
    field: keyof PlatformInformation,
    nestedField: string,
    value: unknown
  ) => {
    setFormData((prev) => {
      const currentFieldValue = prev[field];
      if (
        typeof currentFieldValue === "object" &&
        currentFieldValue !== null &&
        !Array.isArray(currentFieldValue)
      ) {
        return {
          ...prev,
          [field]: {
            ...currentFieldValue,
            [nestedField]: value,
          },
        };
      }
      return prev;
    });
  };

  const addRegion = () => {
    const newRegion: GeographicRegion = {
      regionName: "",
      regionCode: "",
      countryCode: "",
      availabilityZones: 1,
      datacenterTier: DatacenterTier.UNKNOWN,
      edgeLocation: false,
    };

    setFormData((prev) => ({
      ...prev,
      regions: [...(prev.regions || []), newRegion],
    }));
  };

  const updateRegion = (
    index: number,
    field: keyof GeographicRegion,
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      regions:
        prev.regions?.map((region, i) =>
          i === index ? { ...region, [field]: value } : region
        ) || [],
    }));
  };

  const removeRegion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions?.filter((_, i) => i !== index) || [],
    }));
  };

  const addComplianceCertification = () => {
    const newCert: ComplianceCertification = {
      certificationName: "",
      status: ComplianceStatus.UNKNOWN,
      certificationDate: "",
      certifyingBody: "",
      certificateUrl: "",
    };

    setFormData((prev) => ({
      ...prev,
      complianceCertifications: [
        ...(prev.complianceCertifications || []),
        newCert,
      ],
    }));
  };

  const updateComplianceCertification = (
    index: number,
    field: keyof ComplianceCertification,
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      complianceCertifications:
        prev.complianceCertifications?.map((cert, i) =>
          i === index ? { ...cert, [field]: value } : cert
        ) || [],
    }));
  };

  const removeComplianceCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      complianceCertifications:
        prev.complianceCertifications?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleArrayFieldChange = (
    field: keyof PlatformInformation,
    value: string
  ) => {
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData((prev) => ({
      ...prev,
      [field]: arrayValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.platformName?.trim()) {
      setError("Platform name is required");
      return;
    }

    if (platformExists) {
      setError("A platform with this name already exists");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const platformData: PlatformInformation = {
        ...formData,
        platformName: formData.platformName!,
        platformType: formData.platformType!,
        websiteUrl: formData.websiteUrl!,
        regions: formData.regions || [],
        primaryDatacenterTier: formData.primaryDatacenterTier!,
        complianceCertifications: formData.complianceCertifications || [],
        computeInstances: formData.computeInstances || [],
        customConfigurationSupport: formData.customConfigurationSupport!,
        bareMetalAvailable: formData.bareMetalAvailable!,
        proprietarySoftware: formData.proprietarySoftware || [],
        proprietaryHardware: formData.proprietaryHardware || [],
        networking: formData.networking!,
        securityFeatures: formData.securityFeatures!,
        supportTiers: formData.supportTiers || [],
        lastUpdated: new Date().toISOString(),
      };

      await createPlatform(platformData);
      setSuccess("Platform created successfully!");

      // Redirect to the platform page or dashboard after a delay
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 2000);
    } catch (error) {
      console.error("Error creating platform:", error);
      setError("Failed to create platform. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Create an MLOps Platform Entry
      </h1>
      <p style={{ textAlign: "center" }}>
        Adding an entry to our database helps to ensure that we have up to date
        information.
      </p>
      <p style={{ textAlign: "center" }}>
        We would like to thank you for your contribution!
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "#fee",
            color: "#c33",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            backgroundColor: "#efe",
            color: "#3c3",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Basic Platform Information */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Basic Information</h2>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Platform Name *
            </label>
            <input
              type="text"
              value={formData.platformName || ""}
              onChange={(e) =>
                handleInputChange("platformName", e.target.value)
              }
              onBlur={(e) => checkPlatformName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                borderColor:
                  platformExists === true
                    ? "#c33"
                    : platformExists === false
                    ? "#3c3"
                    : "#ccc",
              }}
              required
            />
            {platformExists === true && (
              <div
                style={{ color: "#c33", fontSize: "14px", marginTop: "5px" }}
              >
                A platform with this name already exists
              </div>
            )}
            {platformExists === false && !showSuggestions && (
              <div
                style={{ color: "#3c3", fontSize: "14px", marginTop: "5px" }}
              >
                Platform name is available
              </div>
            )}

            {showSuggestions && similarPlatforms.length > 0 && (
              <DidYouMeanPlatformCreate
                platforms={similarPlatforms}
                searchedName={formData.platformName || ""}
                onDismiss={() => setShowSuggestions(false)}
              />
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Platform Type *
            </label>
            <select
              value={formData.platformType || ""}
              onChange={(e) =>
                handleInputChange("platformType", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            >
              {Object.values(PlatformType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Parent Company
            </label>
            <input
              type="text"
              value={formData.parentCompany || ""}
              onChange={(e) =>
                handleInputChange("parentCompany", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Founded Date
            </label>
            <input
              type="date"
              value={formData.foundedDate || ""}
              onChange={(e) => handleInputChange("foundedDate", e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Headquarters
            </label>
            <input
              type="text"
              value={formData.headquarters || ""}
              onChange={(e) =>
                handleInputChange("headquarters", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Website URL *
            </label>
            <input
              type="url"
              value={formData.websiteUrl || ""}
              onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Documentation URL
            </label>
            <input
              type="url"
              value={formData.documentationUrl || ""}
              onChange={(e) =>
                handleInputChange("documentationUrl", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </section>

        {/* Geographic and Infrastructure */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Geographic and Infrastructure</h2>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Primary Datacenter Tier
            </label>
            <select
              value={formData.primaryDatacenterTier || ""}
              onChange={(e) =>
                handleInputChange("primaryDatacenterTier", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {Object.values(DatacenterTier).map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Total Datacenters
              </label>
              <input
                type="number"
                value={formData.totalDatacenters || 0}
                onChange={(e) =>
                  handleInputChange(
                    "totalDatacenters",
                    parseInt(e.target.value) || 0
                  )
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                min="0"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Edge Locations
              </label>
              <input
                type="number"
                value={formData.edgeLocations || 0}
                onChange={(e) =>
                  handleInputChange(
                    "edgeLocations",
                    parseInt(e.target.value) || 0
                  )
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                min="0"
              />
            </div>
          </div>

          {/* Regions */}
          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label style={{ fontWeight: "bold" }}>Geographic Regions</label>
              <button
                type="button"
                onClick={addRegion}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add Region
              </button>
            </div>
            {formData.regions?.map((region, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #eee",
                  padding: "15px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Region Name"
                    value={region.regionName}
                    onChange={(e) =>
                      updateRegion(index, "regionName", e.target.value)
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Region Code"
                    value={region.regionCode || ""}
                    onChange={(e) =>
                      updateRegion(index, "regionCode", e.target.value)
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Country Code"
                    value={region.countryCode}
                    onChange={(e) =>
                      updateRegion(index, "countryCode", e.target.value)
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Availability Zones"
                    value={region.availabilityZones || 1}
                    onChange={(e) =>
                      updateRegion(
                        index,
                        "availabilityZones",
                        parseInt(e.target.value) || 1
                      )
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    min="1"
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <select
                    value={region.datacenterTier}
                    onChange={(e) =>
                      updateRegion(index, "datacenterTier", e.target.value)
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    {Object.values(DatacenterTier).map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={region.edgeLocation}
                      onChange={(e) =>
                        updateRegion(index, "edgeLocation", e.target.checked)
                      }
                    />
                    Edge Location
                  </label>
                  <button
                    type="button"
                    onClick={() => removeRegion(index)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Certifications */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Compliance Certifications</h2>

          <div style={{ marginBottom: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label style={{ fontWeight: "bold" }}>Certifications</label>
              <button
                type="button"
                onClick={addComplianceCertification}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add Certification
              </button>
            </div>
            {formData.complianceCertifications?.map((cert, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #eee",
                  padding: "15px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.certificationName}
                    onChange={(e) =>
                      updateComplianceCertification(
                        index,
                        "certificationName",
                        e.target.value
                      )
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <select
                    value={cert.status}
                    onChange={(e) =>
                      updateComplianceCertification(
                        index,
                        "status",
                        e.target.value
                      )
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    {Object.values(ComplianceStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    placeholder="Certification Date"
                    value={cert.certificationDate || ""}
                    onChange={(e) =>
                      updateComplianceCertification(
                        index,
                        "certificationDate",
                        e.target.value
                      )
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Certifying Body"
                    value={cert.certifyingBody || ""}
                    onChange={(e) =>
                      updateComplianceCertification(
                        index,
                        "certifyingBody",
                        e.target.value
                      )
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="url"
                    placeholder="Certificate URL"
                    value={cert.certificateUrl || ""}
                    onChange={(e) =>
                      updateComplianceCertification(
                        index,
                        "certificateUrl",
                        e.target.value
                      )
                    }
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeComplianceCertification(index)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compute Resources */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Compute Resources</h2>

          <ComputeInstanceForm
            instances={formData.computeInstances || []}
            onChange={(instances) =>
              handleInputChange("computeInstances", instances)
            }
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="checkbox"
                checked={formData.customConfigurationSupport || false}
                onChange={(e) =>
                  handleInputChange(
                    "customConfigurationSupport",
                    e.target.checked
                  )
                }
              />
              Custom Configuration Support
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="checkbox"
                checked={formData.bareMetalAvailable || false}
                onChange={(e) =>
                  handleInputChange("bareMetalAvailable", e.target.checked)
                }
              />
              Bare Metal Available
            </label>
          </div>
        </section>

        {/* Proprietary Technology */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Proprietary Technology</h2>

          <ProprietarySoftwareForm
            software={formData.proprietarySoftware || []}
            onChange={(software) =>
              handleInputChange("proprietarySoftware", software)
            }
          />

          <ProprietaryHardwareForm
            hardware={formData.proprietaryHardware || []}
            onChange={(hardware) =>
              handleInputChange("proprietaryHardware", hardware)
            }
          />
        </section>

        {/* Service and Support */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Service and Support</h2>

          <SupportTierForm
            supportTiers={formData.supportTiers || []}
            onChange={(supportTiers) =>
              handleInputChange("supportTiers", supportTiers)
            }
          />

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              SLA Uptime (%)
            </label>
            <input
              type="number"
              value={formData.slaUptime || ""}
              onChange={(e) =>
                handleInputChange(
                  "slaUptime",
                  parseFloat(e.target.value) || undefined
                )
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </section>

        {/* Technical Capabilities */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Technical Capabilities</h2>

          <div style={{ marginBottom: "20px" }}>
            <h3>Networking Capabilities</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Bandwidth (Gbps)
                </label>
                <input
                  type="number"
                  value={formData.networking?.bandwidthGbps || ""}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "networking",
                      "bandwidthGbps",
                      parseFloat(e.target.value) || undefined
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Network Type
                </label>
                <input
                  type="text"
                  value={formData.networking?.networkType || ""}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "networking",
                      "networkType",
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={formData.networking?.vpcSupport || false}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "networking",
                      "vpcSupport",
                      e.target.checked
                    )
                  }
                />
                VPC Support
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={formData.networking?.loadBalancing || false}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "networking",
                      "loadBalancing",
                      e.target.checked
                    )
                  }
                />
                Load Balancing
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={formData.networking?.cdnIntegration || false}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "networking",
                      "cdnIntegration",
                      e.target.checked
                    )
                  }
                />
                CDN Integration
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={formData.networking?.privateNetworking || false}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "networking",
                      "privateNetworking",
                      e.target.checked
                    )
                  }
                />
                Private Networking
              </label>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3>Security Features</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "15px",
              }}
            >
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={formData.securityFeatures?.encryptionAtRest || false}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "encryptionAtRest",
                      e.target.checked
                    )
                  }
                />
                Encryption at Rest
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={
                    formData.securityFeatures?.encryptionInTransit || false
                  }
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "encryptionInTransit",
                      e.target.checked
                    )
                  }
                />
                Encryption in Transit
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={formData.securityFeatures?.keyManagement || false}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "keyManagement",
                      e.target.checked
                    )
                  }
                />
                Key Management
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={
                    formData.securityFeatures?.identityManagement || false
                  }
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "identityManagement",
                      e.target.checked
                    )
                  }
                />
                Identity Management
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={formData.securityFeatures?.networkSecurity || false}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "networkSecurity",
                      e.target.checked
                    )
                  }
                />
                Network Security
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={
                    formData.securityFeatures?.vulnerabilityScanning || false
                  }
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "vulnerabilityScanning",
                      e.target.checked
                    )
                  }
                />
                Vulnerability Scanning
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={
                    formData.securityFeatures?.securityMonitoring || false
                  }
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "securityMonitoring",
                      e.target.checked
                    )
                  }
                />
                Security Monitoring
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  checked={
                    formData.securityFeatures?.penetrationTesting || false
                  }
                  onChange={(e) =>
                    handleNestedInputChange(
                      "securityFeatures",
                      "penetrationTesting",
                      e.target.checked
                    )
                  }
                />
                Penetration Testing
              </label>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Interconnect Technology
              </label>
              <input
                type="text"
                value={formData.networking?.interconnectTechnology || ""}
                onChange={(e) =>
                  handleNestedInputChange(
                    "networking",
                    "interconnectTechnology",
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Additional Information</h2>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Specializations (comma-separated)
            </label>
            <textarea
              value={formData.specializations?.join(", ") || ""}
              onChange={(e) =>
                handleArrayFieldChange("specializations", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "60px",
              }}
              placeholder="e.g., Machine Learning, Data Analytics, IoT"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Target Markets (comma-separated)
            </label>
            <textarea
              value={formData.targetMarkets?.join(", ") || ""}
              onChange={(e) =>
                handleArrayFieldChange("targetMarkets", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "60px",
              }}
              placeholder="e.g., Enterprise, SMB, Startups, Developers"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Notable Customers (comma-separated)
            </label>
            <textarea
              value={formData.notableCustomers?.join(", ") || ""}
              onChange={(e) =>
                handleArrayFieldChange("notableCustomers", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "60px",
              }}
              placeholder="e.g., Company A, Company B, Company C"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Partnerships (comma-separated)
            </label>
            <textarea
              value={formData.partnerships?.join(", ") || ""}
              onChange={(e) =>
                handleArrayFieldChange("partnerships", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "60px",
              }}
              placeholder="e.g., Partner A, Partner B, Partner C"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Data Sources (comma-separated)
            </label>
            <textarea
              value={formData.dataSources?.join(", ") || ""}
              onChange={(e) =>
                handleArrayFieldChange("dataSources", e.target.value)
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "60px",
              }}
              placeholder="e.g., Official Documentation, Public Reports, Industry Analysis"
            />
          </div>
        </section>

        {/* Submit Button */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="submit"
            disabled={isSubmitting || platformExists === true}
            style={{
              padding: "12px 30px",
              backgroundColor:
                isSubmitting || platformExists === true ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor:
                isSubmitting || platformExists === true
                  ? "not-allowed"
                  : "pointer",
              marginRight: "10px",
            }}
          >
            {isSubmitting ? "Creating Platform..." : "Create Platform"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 30px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
