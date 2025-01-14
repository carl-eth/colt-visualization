import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TripData {
  TripID: string;
  LeaderID: number;
  LeaderCountry: string;
  LeaderCountryISO: string;
  LeaderFullName: string;
  Country: string;
  CountryISO: string;
  Region: string;
  SubRegion: string;
  TripYear: number;
  TripStartDate: string;
  TripEndDate: string;
}

const tripData: TripData[] = [
  {
    TripID: '224-AFG-SUN-33083',
    LeaderID: 224,
    LeaderCountry: 'Afghanistan',
    LeaderCountryISO: 'AFG',
    LeaderFullName: 'Mohammad Najibullah',
    Country: 'Soviet Union',
    CountryISO: 'SUN',
    Region: 'Europe',
    SubRegion: 'Eastern',
    TripYear: 1990,
    TripStartDate: '07/29/1990',
    TripEndDate: '08/25/1990',
  },
  {
    TripID: '1683-AFG-USA-37283',
    LeaderID: 1683,
    LeaderCountry: 'Afghanistan',
    LeaderCountryISO: 'AFG',
    LeaderFullName: 'Hamid Karzai',
    Country: 'United States',
    CountryISO: 'USA',
    Region: 'North America',
    SubRegion: 'Northern',
    TripYear: 2002,
    TripStartDate: '01/27/2002',
    TripEndDate: '01/30/2002',
  },
  // Add additional objects from your data as needed
];

const MapComponent: React.FC = () => {
  useEffect(() => {
    let map = L.map('map', { center: [20, 0], zoom: 2 });

    if (!map) {
      map = L.map('map').setView([20, 0], 2);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    tripData.forEach((trip) => {
      // Example coordinates, customize with real data or a geocoding service
      const coordinates: { [key: string]: [number, number] } = {
        AFG: [33.9391, 67.7100],
        USA: [37.0902, -95.7129],
        SUN: [55.7558, 37.6173],
      };

      const coords = coordinates[trip.CountryISO];
      if (coords) {
        L.marker(coords)
          .addTo(map)
          .bindPopup(
            `${trip.LeaderFullName} (${trip.LeaderCountry}) visited ${trip.Country} (${trip.TripStartDate} to ${trip.TripEndDate})`
          );
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{width: '1200px', height: '600px'}} id="map">
    </div>
  );
};

export default MapComponent;
