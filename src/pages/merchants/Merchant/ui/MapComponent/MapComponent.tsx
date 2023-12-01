import bem from 'easy-bem';
import { LatLng, LatLngExpression } from 'leaflet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

import './MapComponent.scss';

interface Props {
  position?: LatLngExpression;
  onClick: (latlng: LatLng) => void;
}

const MapComponent: React.FC<Props> = ({ position, onClick }) => {
  const b = bem('MapComponent');
  const { t } = useTranslation();

  const MapEvents = () => {
    useMapEvents({
      click: (location) => {
        onClick(location.latlng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      className={b()}
      center={position ? position : [42.87, 74.59]}
      zoom={13}
      scrollWheelZoom
      style={{ width: '100%', height: '60vh' }}
    >
      <MapEvents />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      />
      <Marker position={position ? position : [42.87, 74.59]}>
        <Popup>{t('merchants.station_here')}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
