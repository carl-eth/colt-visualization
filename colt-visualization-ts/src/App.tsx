import React from 'react';
// import MapComponent from './component/Map';
import TrendChartComponent from './component/TrendChart';
import DataTableComponent from './component/DataTable';
import WorldMap from './component/WorldMap';

const App: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">COLT visualization</h1>
      {/* <MapComponent /> */}
      <WorldMap />
      <TrendChartComponent />
      <DataTableComponent />
    </div>
  );
};

export default App;
