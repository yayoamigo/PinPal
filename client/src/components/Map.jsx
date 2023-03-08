import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

function Map({ lng, lat, zoom }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=0qxb23lNWq3SH458gZbM',
      center: [lng, lat],
      zoom,
    });

    const marker = new maplibregl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);

    return () => map.current.remove();
  }, [lng, lat, zoom]);

  return (
    <div
      ref={mapContainer}
      style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
    />
  );
}

export default Map;
