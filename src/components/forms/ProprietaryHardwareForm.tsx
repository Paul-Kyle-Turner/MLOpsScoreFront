import React from 'react';
import { type ProprietaryHardware } from '../../model/platform';

interface ProprietaryHardwareFormProps {
  hardware: ProprietaryHardware[];
  onChange: (hardware: ProprietaryHardware[]) => void;
}

export const ProprietaryHardwareForm: React.FC<ProprietaryHardwareFormProps> = ({ hardware, onChange }) => {
  
  const addHardware = () => {
    const newHardware: ProprietaryHardware = {
      hardwareName: '',
      hardwareType: '',
      description: '',
      specifications: {},
      performanceMetrics: {},
      availability: '',
      generation: '',
      manufacturingPartner: '',
      useCases: []
    };
    
    onChange([...hardware, newHardware]);
  };

  const updateHardware = (index: number, field: keyof ProprietaryHardware, value: unknown) => {
    const updatedHardware = hardware.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updatedHardware);
  };

  const removeHardware = (index: number) => {
    onChange(hardware.filter((_, i) => i !== index));
  };

  const updateUseCases = (index: number, value: string) => {
    const useCases = value.split(',').map(item => item.trim()).filter(item => item);
    updateHardware(index, 'useCases', useCases);
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>Proprietary Hardware</label>
        <button
          type="button"
          onClick={addHardware}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Hardware
        </button>
      </div>
      
      {hardware.map((item, index) => (
        <div key={index} style={{ 
          border: '1px solid #eee', 
          padding: '15px', 
          borderRadius: '4px', 
          marginBottom: '10px',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Hardware Name"
              value={item.hardwareName}
              onChange={(e) => updateHardware(index, 'hardwareName', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Hardware Type"
              value={item.hardwareType}
              onChange={(e) => updateHardware(index, 'hardwareType', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Generation"
              value={item.generation || ''}
              onChange={(e) => updateHardware(index, 'generation', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateHardware(index, 'description', e.target.value)}
              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Availability"
              value={item.availability || ''}
              onChange={(e) => updateHardware(index, 'availability', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Manufacturing Partner"
              value={item.manufacturingPartner || ''}
              onChange={(e) => updateHardware(index, 'manufacturingPartner', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <textarea
              placeholder="Use Cases (comma-separated)"
              value={item.useCases?.join(', ') || ''}
              onChange={(e) => updateUseCases(index, e.target.value)}
              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '40px' }}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => removeHardware(index)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove Hardware
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
