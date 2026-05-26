import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface OfflineMapProps {
  isOffline: boolean;
  onMapStatsUpdate: (stats: { zoom: number; center: [number, number] }) => void;
}

export const OfflineMap: React.FC<OfflineMapProps> = ({
                                                        isOffline,
                                                        onMapStatsUpdate,
                                                      }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Ініціалізація карти на координатах Сум
    const map = L.map(mapContainerRef.current, {
      center: [50.9077, 34.7981],
      zoom: 12,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    const updateStats = () => {
      const center = map.getCenter();
      onMapStatsUpdate({
        zoom: map.getZoom(),
        center: [center.lat, center.lng],
      });
    };

    map.on("moveend", updateStats);
    map.on("zoomend", updateStats);
    updateStats();

    return () => {
      map.off("moveend", updateStats);
      map.off("zoomend", updateStats);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Видаляємо старий шар карти перед додаванням нового
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    // ВИПРАВЛЕНО: Стабільне джерело онлайн карти українською мовою (Wikimedia)
    const tileUrl = isOffline
        ? `${window.location.origin}/tiles/{z}/{x}/{y}.png` // примусово беремо адресу вашого сайту (наприклад, localhost:5173)
        : "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png";

    // ВИПРАВЛЕНО: Керування лімітами зуму для запобігання білому екрану в офлайні
    if (isOffline) {
      map.setMinZoom(0);
      map.setMaxZoom(14); // Обмежуємо зум рівнем завантажених тайлів

      // Якщо поточний зум більший за 14, плавно зменшуємо його до 14
      if (map.getZoom() > 14) {
        map.setZoom(14);
      }
    } else {
      map.setMinZoom(1);
      map.setMaxZoom(18); // В онлайні дозволяємо максимальний зум
    }

    // Створюємо та додаємо новий шар карти
    const tileLayer = L.tileLayer(tileUrl, {
      attribution: isOffline
          ? "Локальні офлайн тайли Сумщини"
          : '&copy; <a href="https://wikimediafoundation.org/">Wikimedia</a> contributors',
    });

    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;
  }, [isOffline]);

  return (
      <div
          ref={mapContainerRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#e5e3df", // Приємний сіро-бежевий колір фону під час завантаження
          }}
      />
  );
};