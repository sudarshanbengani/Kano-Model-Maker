import React, { createContext, useContext, useState, useEffect } from 'react';

export type FeatureType = 'Basic' | 'Performance' | 'Excitement';

export interface Feature {
  id: string;
  name: string;
  type: FeatureType;
  weightage: number;
}

interface KanoModelContextType {
  features: Feature[];
  addFeature: (feature: Omit<Feature, 'id'>) => void;
  updateFeature: (id: string, feature: Omit<Feature, 'id'>) => void;
  deleteFeature: (id: string) => void;
}

const KanoModelContext = createContext<KanoModelContextType | undefined>(undefined);

export const useKanoModel = (): KanoModelContextType => {
  const context = useContext(KanoModelContext);
  if (!context) {
    throw new Error('useKanoModel must be used within a KanoModelProvider');
  }
  return context;
};

export const KanoModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<Feature[]>([]);

  // Load features from localStorage on initial mount
  useEffect(() => {
    const savedFeatures = localStorage.getItem('kanoFeatures');
    if (savedFeatures) {
      try {
        setFeatures(JSON.parse(savedFeatures));
      } catch (error) {
        console.error('Error parsing saved features:', error);
      }
    }
  }, []);

  // Save features to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kanoFeatures', JSON.stringify(features));
  }, [features]);

  const addFeature = (feature: Omit<Feature, 'id'>) => {
    const newFeature: Feature = {
      ...feature,
      id: Date.now().toString(),
    };
    setFeatures((prev) => [...prev, newFeature]);
  };

  const updateFeature = (id: string, updatedFeature: Omit<Feature, 'id'>) => {
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...updatedFeature, id } : feature
      )
    );
  };

  const deleteFeature = (id: string) => {
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));
  };

  return (
    <KanoModelContext.Provider
      value={{ features, addFeature, updateFeature, deleteFeature }}
    >
      {children}
    </KanoModelContext.Provider>
  );
};