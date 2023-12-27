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
      image={{
        src: `https://res.cloudinary.com/dv6tzjgu4/image/upload/v1703690169/${
          place.position === info?.position ? 'clicked' : 'unclicked'
        }-marker.png`,
        size: {
          width: 30,
          height: 30,
        },
      }}
    />
  );
};

export default KakaoMapMarker;
