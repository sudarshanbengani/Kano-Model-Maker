import { Feature, FeatureType } from '../context/KanoModelContext';

// Return a color for each feature type
export const getFeatureColor = (type: FeatureType): string => {
  switch (type) {
    case 'Basic':
      return '#ef4444'; // Red
    case 'Performance':
      return '#3b82f6'; // Blue
    case 'Excitement':
      return '#8b5cf6'; // Purple
    default:
      return '#64748b'; // Gray
  }
};

// Calculate position for a feature on the Kano model
export const getFeaturePosition = (feature: Feature): { x: number, y: number } => {
  // Normalize weightage to 0-1 range
  const normalizedWeight = feature.weightage / 10;
  
  // X is always the normalized weight (representing functionality)
  const x = normalizedWeight;
  
  // Y depends on the feature type (representing customer delight)
  let y: number;
  
  switch (feature.type) {
    case 'Basic':
      // Basic features: Low delight regardless of functionality
      // Small linear increase from 0.05 to 0.2
      y = 0.05 + normalizedWeight * 0.15;
      break;
      
    case 'Performance':
      // Performance features: Linear relationship with functionality
      // Linear increase from 0.1 to 0.8
      y = 0.1 + normalizedWeight * 0.7;
      break;
      
    case 'Excitement':
      // Excitement features: Start low, curve upward significantly
      // Exponential relationship from 0.1 to 0.9
      y = 0.1 + Math.pow(normalizedWeight, 2) * 0.8;
      break;
      
    default:
      y = 0.5;
  }
  
  return { x, y };
};