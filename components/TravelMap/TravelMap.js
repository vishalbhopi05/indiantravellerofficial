import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { FiMapPin, FiArrowRight, FiGlobe, FiFlag, FiNavigation } from 'react-icons/fi';
import { destinations } from '@/data/siteData';
import { useTheme } from '@/context/ThemeContext';
import styles from './TravelMap.module.scss';

// Fix Leaflet default icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;

// Create custom marker icon
const createMarkerIcon = (category) => {
  const colors = {
    Mountains: '#c8956c',
    Beaches: '#4ecdc4',
    Cities: '#ff6b6b',
    Forests: '#51cf66',
    Heritage: '#ffd43b',
    default: '#c8956c',
  };
  const color = colors[category] || colors.default;

  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div class="marker-pin" style="--marker-color: ${color}">
        <div class="marker-pulse"></div>
        <div class="marker-dot"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -20],
  });
};

// Map bounds adjuster component
function FitBounds({ destinations: dests }) {
  const map = useMap();

  useEffect(() => {
    if (dests.length === 0) return;

    const bounds = L.latLngBounds(
      dests.map((d) => d.coords)
    );
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
  }, [dests, map]);

  return null;
}

// Animated flight path between destinations (curve arc)
function getFlightPath(start, end) {
  const latlngs = [];
  const offsetX = (end[1] - start[1]) / 3;
  const offsetY = (end[0] - start[0]) / 3;
  const midLat = (start[0] + end[0]) / 2 + Math.abs(offsetY) * 0.5 + 3;
  const midLng = (start[1] + end[1]) / 2;

  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    // Quadratic bezier curve
    const lat =
      (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * midLat + t * t * end[0];
    const lng =
      (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * midLng + t * t * end[1];
    latlngs.push([lat, lng]);
  }
  return latlngs;
}

// Generate select flight paths between destinations
function generateFlightPaths(dests) {
  if (dests.length < 2) return [];
  const paths = [];

  // Create paths connecting destinations in sequence (travel route)
  for (let i = 0; i < dests.length - 1; i++) {
    // Connect to next 1-2 destinations for a nice web effect
    if (dests[i].coords && dests[i + 1].coords) {
      paths.push({
        id: `${dests[i].id}-${dests[i + 1].id}`,
        path: getFlightPath(dests[i].coords, dests[i + 1].coords),
      });
    }
  }

  return paths;
}

export default function TravelMap({ filter = 'all', showFlightPaths = true }) {
  const { isDark } = useTheme();
  const [selectedDest, setSelectedDest] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (!dest.coords) return false;
      if (filter === 'india') return dest.location.toLowerCase().includes('india');
      if (filter === 'world') return !dest.location.toLowerCase().includes('india');
      return true;
    });
  }, [filter]);

  const flightPaths = useMemo(() => {
    if (!showFlightPaths) return [];
    return generateFlightPaths(filteredDestinations);
  }, [filteredDestinations, showFlightPaths]);

  // Tile layer URLs for dark and light themes
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  const tileAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={4}
        scrollWheelZoom={true}
        className={styles.leafletMap}
        ref={mapRef}
        whenReady={() => setMapReady(true)}
        zoomControl={false}
      >
        <TileLayer url={tileUrl} attribution={tileAttribution} />

        <FitBounds destinations={filteredDestinations} />

        {/* Flight path lines */}
        {showFlightPaths &&
          flightPaths.map((fp) => (
            <Polyline
              key={fp.id}
              positions={fp.path}
              pathOptions={{
                color: '#c8956c',
                weight: 1.5,
                opacity: 0.4,
                dashArray: '8, 8',
              }}
            />
          ))}

        {/* Destination markers */}
        {filteredDestinations.map((dest) => (
          <Marker
            key={dest.id}
            position={dest.coords}
            icon={createMarkerIcon(dest.category)}
            eventHandlers={{
              click: () => setSelectedDest(dest),
            }}
          >
            <Popup className={styles.customPopup}>
              <div className={styles.popupContent}>
                <div className={styles.popupImage}>
                  <img src={dest.image} alt={dest.name} />
                </div>
                <div className={styles.popupInfo}>
                  <span className={styles.popupCategory}>{dest.category}</span>
                  <h3 className={styles.popupName}>{dest.name}</h3>
                  <p className={styles.popupLocation}>
                    <FiMapPin size={12} />
                    {dest.location}
                  </p>
                  <Link href={`/blog/${dest.slug}`} className={styles.popupLink}>
                    Read Story <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
