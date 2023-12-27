import { Food, Place } from '@/types/party';
import KakaoMap from './KakaoMap';
import { useEffect, useState } from 'react';
import KakaoMapMarker from './KakaoMapMarker';
import useGeoLocation from '@/hooks/geoLocation';
import CurrentLocationMarker from './CurrentLocationMarker';

type Props = {
  foodName: string;
};

const SearchMap = ({ foodName }: Props) => {
  const { location } = useGeoLocation();
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<Place[]>([]);
  const [info, setInfo] = useState<Place>();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (foodName) {
      ps.keywordSearch(
        foodName,
        (result, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            let markers = [];

            for (var i = 0; i < result.length; i++) {
              // @ts-ignore
              markers.push({
                position: {
                  lat: result[i].y,
                  lng: result[i].x,
                },
                content: result[i].place_name,
              });
              // @ts-ignore
              bounds.extend(new kakao.maps.LatLng(result[i].y, result[i].x));
            }
            setMarkers(markers);
            map.setBounds(bounds);
          }
        },
        {
          x: location?.lng,
          y: location?.lat,
        }
      );
    }
  }, [map, foodName, location?.lng, location?.lat]);

  return (
    <KakaoMap onCreate={setMap} location={location}>
      {markers.map((marker) => (
        <KakaoMapMarker
          key={marker.content}
          place={marker}
          onClick={() => setInfo(marker)}
          info={info}
        />
      ))}
      {location && <CurrentLocationMarker location={location} />}
    </KakaoMap>
  );
};

export default SearchMap;
