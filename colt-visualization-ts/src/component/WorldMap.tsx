import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from '../data/map.geo.json';

// Define the structure for country data
interface CountryData {
    [key: string]: number;
}

// Example data with country counts
const countryData: CountryData = {
    "US": 93, "FR": 23, "CN": 30, "IN": 17, "BR": 14
};

// Function to determine the fill color based on the count
const getColor = (count: number): string => {
    return count > 50 ? '#08519c' :
           count > 20 ? '#3182bd' :
           count > 10 ? '#6baed6' :
           count > 5 ? '#bdd7e7' :
           count > 0 ? '#eff3ff' :
                       '#f7f7f7';
};

const WorldMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);  // Reference for the map container
    const mapInstance = useRef<L.Map | null>(null); // To store Leaflet map instance

    useEffect(() => {
        // Initialize map only once
        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current!).setView([20, 0], 2);

            // Add a tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 15,
            }).addTo(mapInstance.current);

            // Add GeoJSON layer
            const geoJsonLayer = L.geoJSON(geoData as any, {
                style: (feature) => {
                    const countryCode = feature?.properties?.ISO_A2;
                    const count = countryData[countryCode] || Math.floor(Math.random() * 100);
                    // const count = countryData[countryCode] || 0;
                    return {
                        fillColor: getColor(count),
                        weight: 1,
                        opacity: 1,
                        color: 'white',
                        fillOpacity: 0.7
                    };

                },
                onEachFeature: (feature, layer) => {
                    const countryCode = feature.properties.ISO_A2;
                    const count = countryData[countryCode] || 0;
                    layer.bindPopup(`${feature.properties.ADMIN}: ${count}`);
                }
            });
            (geoData as any).features.forEach((feature: any) => {
                if (feature.geometry.type === 'Point') {
                    const [longitude, latitude] = feature.geometry.coordinates;
                    const circle = L.circle([latitude, longitude], {
                        color: 'red',
                        radius: 50000
                    });
                    circle.addTo(mapInstance.current!);
                }
            });

            // Add lines between points with random weight
            const points = (geoData as any).features.filter((feature: any) => feature.geometry.type === 'Point');
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    if (Math.random() > 0.5) continue; // Skip some lines randomly

                    const [lon1, lat1] = points[i].geometry.coordinates;
                    const [lon2, lat2] = points[j].geometry.coordinates;
                    const weight = Math.random() * 5 + 1; // Random weight between 1 and 6

                    const polyline = L.polyline([[lat1, lon1], [lat2, lon2]], {
                        color: 'blue',
                        weight: weight
                    });

                    polyline.addTo(mapInstance.current!);
                }
            }
            geoJsonLayer.addTo(mapInstance.current);
        }

        // Cleanup the map instance when the component unmounts
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    return <div ref={mapRef} style={{ height: '800px', width: '800px' }} />;
};

export default WorldMap;
