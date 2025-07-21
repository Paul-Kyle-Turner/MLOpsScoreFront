import React from 'react';
import { type SupportTier } from '../../model/platform';

interface SupportTierFormProps {
  supportTiers: SupportTier[];
  onChange: (supportTiers: SupportTier[]) => void;
}

export const SupportTierForm: React.FC<SupportTierFormProps> = ({ supportTiers, onChange }) => {
  
  const addSupportTier = () => {
    const newTier: SupportTier = {
      tierName: '',
      averageResponseTime: '',
      channels: [],
      hours: '',
      price: '',
      premiumFeatures: []
    };
    
    onChange([...supportTiers, newTier]);
  };

  const updateSupportTier = (index: number, field: keyof SupportTier, value: unknown) => {
    const updatedTiers = supportTiers.map((tier, i) => 
      i === index ? { ...tier, [field]: value } : tier
    );
    onChange(updatedTiers);
  };

  const removeSupportTier = (index: number) => {
    onChange(supportTiers.filter((_, i) => i !== index));
  };

  const updateChannels = (index: number, value: string) => {
    const channels = value.split(',').map(item => item.trim()).filter(item => item);
    updateSupportTier(index, 'channels', channels);
  };

  const updatePremiumFeatures = (index: number, value: string) => {
    const features = value.split(',').map(item => item.trim()).filter(item => item);
    updateSupportTier(index, 'premiumFeatures', features);
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>Support Tiers</label>
        <button
          type="button"
          onClick={addSupportTier}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Support Tier
        </button>
      </div>
      
      {supportTiers.map((tier, index) => (
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
              placeholder="Tier Name"
              value={tier.tierName}
              onChange={(e) => updateSupportTier(index, 'tierName', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Average Response Time"
              value={tier.averageResponseTime || ''}
              onChange={(e) => updateSupportTier(index, 'averageResponseTime', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Price"
              value={tier.price || ''}
              onChange={(e) => updateSupportTier(index, 'price', e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Hours"
              value={tier.hours}
              onChange={(e) => updateSupportTier(index, 'hours', e.target.value)}
              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <textarea
              placeholder="Support Channels (comma-separated) e.g., Email, Phone, Chat"
              value={tier.channels.join(', ')}
              onChange={(e) => updateChannels(index, e.target.value)}
              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '40px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <textarea
              placeholder="Premium Features (comma-separated)"
              value={tier.premiumFeatures?.join(', ') || ''}
              onChange={(e) => updatePremiumFeatures(index, e.target.value)}
              style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '40px' }}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => removeSupportTier(index)}
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove Support Tier
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
