import { Place } from './../types/party';
import { useEffect, useState } from 'react';

type ILocation = {
  lat: number;
  lng: number;
};

const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState('');

  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      lat: latitude,
      lng: longitude,
    });
  };

  const handleError = (error: GeolocationPositionError) =>
    setError(error.message);

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 1000 * 10,
      maximumAge: 1000 * 3600 * 24,
    });
  }, []);

  return { location, error };
};

export default useGeoLocation;
