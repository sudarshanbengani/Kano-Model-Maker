import React from 'react';
import FeatureInputPanel from './FeatureInputPanel';
import KanoChart from './KanoChart';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fadeIn">
      <div className="w-full lg:w-1/3">
        <FeatureInputPanel />
      </div>
      <div className="w-full lg:w-2/3">
        <KanoChart />
      </div>
    </div>
  );
};

export default Layout;