import React, { useState } from 'react';
import { PlatformType } from '../../model/platform';

interface PlatformSelectorProps {
  onPlatformSelected: (platformType: PlatformType, platformName: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ onPlatformSelected }) => {
  const [selectedType, setSelectedType] = useState<PlatformType | ''>('');
  const [platformName, setPlatformName] = useState('');

  const platformTypes = Object.values(PlatformType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType && platformName.trim()) {
      onPlatformSelected(selectedType as PlatformType, platformName.trim());
    }
  };

  const isValid = selectedType && platformName.trim();

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Select Platform to Evaluate
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="platformType" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Platform Type:
          </label>
          <select
            id="platformType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as PlatformType)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
            required
          >
            <option value="">Select a platform type...</option>
            {platformTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="platformName" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Platform Name:
          </label>
          <input
            type="text"
            id="platformName"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            placeholder="e.g., AWS SageMaker, Google Cloud AI Platform, Azure ML..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isValid ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isValid ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
        >
          Start Evaluation
        </button>
      </form>
    </div>
  );
};
