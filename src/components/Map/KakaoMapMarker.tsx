import { Place } from '@/types/party';
import { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import PlaceInfoSheet from './PlaceInfoSheet';

type Props = {
  place: Place;
  onClick?: () => void;
  info?: Place | undefined;
};

const KakaoMapMarker = ({ place, onClick, info }: Props) => {
  return (
    <MapMarker
      position={{
        lat: Number(place.position.lat),
        lng: Number(place.position.lng),
      }}
      onClick={onClick}
    >
      {info && info.position === place.position && (
        <PlaceInfoSheet place={place} />
      )}
    </MapMarker>
  );
};

export default KakaoMapMarker;
