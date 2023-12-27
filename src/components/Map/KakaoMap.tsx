import { ReactNode, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

type Props = {
  children?: ReactNode;
  onCreate: (map: kakao.maps.Map | undefined) => void;
  location: { lat: number; lng: number } | undefined;
};

const KakaoMap = ({ children, onCreate, location }: Props) => {
  if (location)
    return (
      <Map
        center={{ lat: location.lat, lng: location.lng }}
        style={{ width: '100%', height: '360px' }}
        onCreate={onCreate}
      >
        {children}
      </Map>
    );
};

export default KakaoMap;
