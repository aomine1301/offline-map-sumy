import React from "react";
import { Layers, Search, Download, Map as MapIcon } from "lucide-react";

interface SidebarProps {
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  mapStats: { zoom: number; center: [number, number] };
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOffline,
  setIsOffline,
  mapStats,
}) => {
  return (
    <aside className="sidebar" style={{ width: '300px', borderRight: '1px solid #ccc', padding: '1rem', backgroundColor: '#f9f9f9', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div className="sidebar-header" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MapIcon size={24} />
        <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Офлайн карта</h1>
      </div>

      <div className="sidebar-content">
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', marginBottom: '0.5rem' }}>
            <Layers size={18} />
            Офлайн режим
          </h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isOffline}
              onChange={(e) => setIsOffline(e.target.checked)}
            />
            <span>{isOffline ? "Увімкнено" : "Вимкнено"}</span>
          </label>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', marginBottom: '0.5rem' }}>
            <Search size={18} />
            Пошук міст
          </h2>
          <select style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="">Виберіть місто...</option>
            <option value="sumy">Суми</option>
            <option value="konotop">Конотоп</option>
            <option value="shostka">Шостка</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', marginBottom: '0.5rem' }}>
            <Download size={18} />
            Завантажувач
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            Зум: {mapStats.zoom}<br />
            Центр: {mapStats.center[0].toFixed(4)}, {mapStats.center[1].toFixed(4)}
          </div>
        </div>
      </div>
    </aside>
  );
};
