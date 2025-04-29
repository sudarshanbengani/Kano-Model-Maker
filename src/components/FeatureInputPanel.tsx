import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useKanoModel, Feature, FeatureType } from '../context/KanoModelContext';
import FeatureList from './FeatureList';

const FeatureInputPanel: React.FC = () => {
  const { addFeature } = useKanoModel();
  const [name, setName] = useState('');
  const [type, setType] = useState<FeatureType>('Performance');
  const [weightage, setWeightage] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    addFeature({
      name: name.trim(),
      type,
      weightage,
    });
    
    setName('');
    setType('Performance');
    setWeightage(5);
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="bg-white rounded-xl elevation-2 overflow-hidden transition-all" role="region" aria-label="Feature Input Panel">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4" id="feature-input-heading">Feature Input</h2>
        <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="feature-input-heading">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Feature Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus-high-contrast transition duration-200"
              placeholder="Enter feature name"
              required
              aria-required="true"
              aria-invalid={name.trim() === ''}
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as FeatureType)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus-high-contrast transition duration-200"
              aria-required="true"
            >
              <option value="Basic">Basic</option>
              <option value="Performance">Performance</option>
              <option value="Excitement">Excitement</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="weightage" className="block text-sm font-medium text-slate-700 mb-1">
              Weightage (1-10)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="weightage"
                min="1"
                max="10"
                value={weightage}
                onChange={(e) => setWeightage(parseInt(e.target.value))}
                className="w-full accent-primary-600"
                aria-valuemin="1"
                aria-valuemax="10"
                aria-valuenow={weightage}
                aria-valuetext={`Weightage: ${weightage}`}
              />
              <span className="text-sm font-medium w-8 text-center" aria-hidden="true">{weightage}</span>
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md
              hover:bg-primary-700 focus-high-contrast transition duration-200
              disabled:opacity-75 disabled:cursor-not-allowed`}
            disabled={isSubmitting || !name.trim()}
            aria-busy={isSubmitting}
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Feature
          </button>
        </form>
      </div>
      
      <div className="border-t border-slate-200">
        <div className="p-6">
          <h3 className="text-md font-medium mb-3">Feature List</h3>
          <FeatureList />
        </div>
      </div>
    </div>
  );
};

export default FeatureInputPanel;