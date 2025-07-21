import React from "react";
import { type ProprietarySoftware } from "../../model/platform";

interface ProprietarySoftwareFormProps {
  software: ProprietarySoftware[];
  onChange: (software: ProprietarySoftware[]) => void;
}

export const ProprietarySoftwareForm: React.FC<
  ProprietarySoftwareFormProps
> = ({ software, onChange }) => {
  const addSoftware = () => {
    const newSoftware: ProprietarySoftware = {
      softwareName: "",
      softwareType: "",
      description: "",
      version: "",
      openSource: false,
      licenseType: "",
      documentationUrl: "",
      githubUrl: "",
      useCases: [],
    };

    onChange([...software, newSoftware]);
  };

  const updateSoftware = (
    index: number,
    field: keyof ProprietarySoftware,
    value: unknown
  ) => {
    const updatedSoftware = software.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updatedSoftware);
  };

  const removeSoftware = (index: number) => {
    onChange(software.filter((_, i) => i !== index));
  };

  const updateUseCases = (index: number, value: string) => {
    const useCases = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    updateSoftware(index, "useCases", useCases);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Proprietary Software</label>
        <button
          type="button"
          onClick={addSoftware}
          style={{
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Software
        </button>
      </div>

      {software.map((item, index) => (
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
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Software Name"
              value={item.softwareName}
              onChange={(e) =>
                updateSoftware(index, "softwareName", e.target.value)
              }
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              placeholder="Software Type"
              value={item.softwareType}
              onChange={(e) =>
                updateSoftware(index, "softwareType", e.target.value)
              }
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              placeholder="Version"
              value={item.version || ""}
              onChange={(e) => updateSoftware(index, "version", e.target.value)}
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                updateSoftware(index, "description", e.target.value)
              }
              style={{
                width: "100%",
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "60px",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="License Type"
              value={item.licenseType || ""}
              onChange={(e) =>
                updateSoftware(index, "licenseType", e.target.value)
              }
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="url"
              placeholder="Documentation URL"
              value={item.documentationUrl || ""}
              onChange={(e) =>
                updateSoftware(index, "documentationUrl", e.target.value)
              }
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={item.githubUrl || ""}
              onChange={(e) =>
                updateSoftware(index, "githubUrl", e.target.value)
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
              marginBottom: "10px",
            }}
          >
            <textarea
              placeholder="Use Cases (comma-separated)"
              value={item.useCases?.join(", ") || ""}
              onChange={(e) => updateUseCases(index, e.target.value)}
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "40px",
              }}
            />
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                whiteSpace: "nowrap",
              }}
            >
              <input
                type="checkbox"
                checked={item.openSource}
                onChange={(e) =>
                  updateSoftware(index, "openSource", e.target.checked)
                }
              />
              Open Source
            </label>
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="button"
              onClick={() => removeSoftware(index)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Remove Software
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
