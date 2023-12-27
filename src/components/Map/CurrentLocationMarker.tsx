import { MapMarker } from 'react-kakao-maps-sdk';

type Props = {
  location: { lat: number; lng: number };
};

const CurrentLocationMarker = ({ location }: Props) => {
  return (
    <MapMarker
      position={{
        lat: Number(location.lat),
        lng: Number(location.lng),
      }}
      image={{
        src: 'https://res.cloudinary.com/dv6tzjgu4/image/upload/v1703690165/rec_1_dvsa2h.png',
        size: {
          width: 50,
          height: 50,
        },
      }}
    />
  );
};

export default CurrentLocationMarker;
