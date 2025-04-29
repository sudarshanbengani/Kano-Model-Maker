import React, { useState } from 'react';
import { Edit2, Save, Trash2, X } from 'lucide-react';
import { useKanoModel, Feature, FeatureType } from '../context/KanoModelContext';

const FeatureList: React.FC = () => {
  const { features, updateFeature, deleteFeature } = useKanoModel();
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<FeatureType>('Performance');
  const [editWeightage, setEditWeightage] = useState(5);

  const startEdit = (feature: Feature) => {
    setEditId(feature.id);
    setEditName(feature.name);
    setEditType(feature.type);
    setEditWeightage(feature.weightage);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = () => {
    if (editId) {
      updateFeature(editId, {
        name: editName.trim(),
        type: editType,
        weightage: editWeightage,
      });
      setEditId(null);
    }
  };

  if (features.length === 0) {
    return (
      <div className="text-center py-4 text-slate-500 text-sm">
        No features added yet. Add your first feature above.
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
      {features.map((feature) => (
        <div 
          key={feature.id} 
          className="p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200 group"
        >
          {editId === feature.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <div className="flex space-x-2">
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as FeatureType)}
                  className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Performance">Performance</option>
                  <option value="Excitement">Excitement</option>
                </select>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editWeightage}
                  onChange={(e) => setEditWeightage(parseInt(e.target.value))}
                  className="w-16 px-2 py-1 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={cancelEdit}
                  className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
                  aria-label="Cancel"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  onClick={saveEdit}
                  className="p-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                  aria-label="Save"
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{feature.name}</div>
                <div className="text-xs text-slate-500 flex items-center space-x-2">
                  <span>{feature.type}</span>
                  <span>•</span>
                  <span>Weight: {feature.weightage}</span>
                </div>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => startEdit(feature)}
                  className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
                  aria-label="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteFeature(feature.id)}
                  className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeatureList;