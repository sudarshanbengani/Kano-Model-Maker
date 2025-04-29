import React from 'react';
import { LineChart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <LineChart className="h-8 w-8 text-primary-600" aria-hidden="true" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Kano Model Visualizer</h1>
            <p className="text-sm text-slate-500">
              Analyze product features based on functionality and customer delight
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;