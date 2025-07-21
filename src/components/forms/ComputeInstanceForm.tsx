import React from 'react';
import { 
  PricingType, 
  BillingIncrement,
  type ComputeInstance,
  type PricingModel
} from '../../model/platform';

interface ComputeInstanceFormProps {
  instances: ComputeInstance[];
  onChange: (instances: ComputeInstance[]) => void;
}

export const ComputeInstanceForm: React.FC<ComputeInstanceFormProps> = ({ instances, onChange }) => {
  
  const addInstance = () => {
    const newInstance: ComputeInstance = {
      instanceName: '',
      instanceFamily: '',
      vcpus: 1,
      memoryGb: 1,
      storageGb: 0,
      storageType: '',
      gpuCount: 0,
      gpuType: '',
      gpuMemoryGb: 0,
      networkPerformance: '',
      pricingModels: [],
      architecture: '',
      specializedHardware: ''
    };
    
    onChange([...instances, newInstance]);
  };

  const updateInstance = (index: number, field: keyof ComputeInstance, value: unknown) => {
    const updatedInstances = instances.map((instance, i) => 
      i === index ? { ...instance, [field]: value } : instance
    );
    onChange(updatedInstances);
  };

  const removeInstance = (index: number) => {
    onChange(instances.filter((_, i) => i !== index));
  };

  const addPricingModel = (instanceIndex: number) => {
    const newPricingModel: PricingModel = {
      pricingType: PricingType.ON_DEMAND,
      pricePerHour: 0,
      pricePerMonth: 0,
      minimumCommitment: '',
      billingIncrement: BillingIncrement.PER_HOUR
    };

    const updatedInstances = instances.map((instance, i) => 
      i === instanceIndex 
        ? { ...instance, pricingModels: [...instance.pricingModels, newPricingModel] }
        : instance
    );
    onChange(updatedInstances);
  };

  const updatePricingModel = (instanceIndex: number, pricingIndex: number, field: keyof PricingModel, value: unknown) => {
    const updatedInstances = instances.map((instance, i) => 
      i === instanceIndex 
        ? {
            ...instance,
            pricingModels: instance.pricingModels.map((pricing, j) =>
              j === pricingIndex ? { ...pricing, [field]: value } : pricing
            )
          }
        : instance
    );
    onChange(updatedInstances);
  };

  const removePricingModel = (instanceIndex: number, pricingIndex: number) => {
    const updatedInstances = instances.map((instance, i) => 
      i === instanceIndex 
        ? {
            ...instance,
            pricingModels: instance.pricingModels.filter((_, j) => j !== pricingIndex)
          }
        : instance
    );
    onChange(updatedInstances);
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>Compute Instances</label>
        <button
          type="button"
          onClick={addInstance}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Instance
        </button>
      </div>
      
      {instances.map((instance, instanceIndex) => (
        <div key={instanceIndex} style={{ 
          border: '1px solid #eee', 
          padding: '15px', 
          borderRadius: '4px', 
          marginBottom: '10px',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Instance Name"
              value={instance.instanceName}
              onChange={(e) => updateInstance(instanceIndex, 'instanceName', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Instance Family"
              value={instance.instanceFamily || ''}
              onChange={(e) => updateInstance(instanceIndex, 'instanceFamily', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Architecture"
              value={instance.architecture || ''}
              onChange={(e) => updateInstance(instanceIndex, 'architecture', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input
              type="number"
              placeholder="vCPUs"
              value={instance.vcpus}
              onChange={(e) => updateInstance(instanceIndex, 'vcpus', parseInt(e.target.value) || 1)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
              min="1"
            />
            <input
              type="number"
              placeholder="Memory (GB)"
              value={instance.memoryGb}
              onChange={(e) => updateInstance(instanceIndex, 'memoryGb', parseFloat(e.target.value) || 1)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
              min="0.1"
              step="0.1"
            />
            <input
              type="number"
              placeholder="Storage (GB)"
              value={instance.storageGb || ''}
              onChange={(e) => updateInstance(instanceIndex, 'storageGb', parseFloat(e.target.value) || undefined)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
              min="0"
            />
            <input
              type="text"
              placeholder="Storage Type"
              value={instance.storageType || ''}
              onChange={(e) => updateInstance(instanceIndex, 'storageType', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input
              type="number"
              placeholder="GPU Count"
              value={instance.gpuCount || ''}
              onChange={(e) => updateInstance(instanceIndex, 'gpuCount', parseInt(e.target.value) || undefined)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
              min="0"
            />
            <input
              type="text"
              placeholder="GPU Type"
              value={instance.gpuType || ''}
              onChange={(e) => updateInstance(instanceIndex, 'gpuType', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="GPU Memory (GB)"
              value={instance.gpuMemoryGb || ''}
              onChange={(e) => updateInstance(instanceIndex, 'gpuMemoryGb', parseFloat(e.target.value) || undefined)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
              min="0"
              step="0.1"
            />
            <input
              type="text"
              placeholder="Network Performance"
              value={instance.networkPerformance || ''}
              onChange={(e) => updateInstance(instanceIndex, 'networkPerformance', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Specialized Hardware"
              value={instance.specializedHardware || ''}
              onChange={(e) => updateInstance(instanceIndex, 'specializedHardware', e.target.value)}
              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          {/* Pricing Models */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Pricing Models</label>
              <button
                type="button"
                onClick={() => addPricingModel(instanceIndex)}
                style={{ 
                  padding: '3px 8px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '3px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Add Pricing
              </button>
            </div>
            
            {instance.pricingModels.map((pricing, pricingIndex) => (
              <div key={pricingIndex} style={{
                border: '1px solid #ddd',
                padding: '10px',
                borderRadius: '3px',
                marginBottom: '5px',
                backgroundColor: '#fff'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '8px', alignItems: 'center' }}>
                  <select
                    value={pricing.pricingType}
                    onChange={(e) => updatePricingModel(instanceIndex, pricingIndex, 'pricingType', e.target.value)}
                    style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '12px' }}
                  >
                    {Object.values(PricingType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Price/Hour"
                    value={pricing.pricePerHour || ''}
                    onChange={(e) => updatePricingModel(instanceIndex, pricingIndex, 'pricePerHour', parseFloat(e.target.value) || undefined)}
                    style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '12px' }}
                    min="0"
                    step="0.001"
                  />
                  <input
                    type="number"
                    placeholder="Price/Month"
                    value={pricing.pricePerMonth || ''}
                    onChange={(e) => updatePricingModel(instanceIndex, pricingIndex, 'pricePerMonth', parseFloat(e.target.value) || undefined)}
                    style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '12px' }}
                    min="0"
                    step="0.01"
                  />
                  <button
                    type="button"
                    onClick={() => removePricingModel(instanceIndex, pricingIndex)}
                    style={{ 
                      padding: '3px 6px', 
                      backgroundColor: '#dc3545', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '3px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  <input
                    type="text"
                    placeholder="Minimum Commitment"
                    value={pricing.minimumCommitment || ''}
                    onChange={(e) => updatePricingModel(instanceIndex, pricingIndex, 'minimumCommitment', e.target.value)}
                    style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '12px' }}
                  />
                  <select
                    value={pricing.billingIncrement || BillingIncrement.PER_HOUR}
                    onChange={(e) => updatePricingModel(instanceIndex, pricingIndex, 'billingIncrement', e.target.value)}
                    style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '3px', fontSize: '12px' }}
                  >
                    {Object.values(BillingIncrement).map(increment => (
                      <option key={increment} value={increment}>{increment}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => removeInstance(instanceIndex)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove Instance
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
