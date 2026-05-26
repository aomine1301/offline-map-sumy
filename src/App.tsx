import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { OfflineMap } from './components/OfflineMap';
import { sumyPois, POI } from './data/sumyPois';

function App() {
  const [isOffline, setIsOffline] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [mapStats, setMapStats] = useState<{ zoom: number; center: [number, number] }>({
    zoom: 8,
    center: [50.9077, 34.7981],
  });

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        selectedPoi={selectedPoi}
        onSelectPoi={setSelectedPoi}
        mapStats={mapStats}
      />
      <main className="main-content" style={{ flex: 1, position: 'relative' }}>
        <OfflineMap
          isOffline={isOffline}
          pois={sumyPois}
          selectedPoi={selectedPoi}
          onSelectPoi={setSelectedPoi}
          onMapStatsUpdate={setMapStats}
        />
      </main>
    </div>
  );
}

export default App;
