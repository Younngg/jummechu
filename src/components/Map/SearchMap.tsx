import { Food, Place } from '@/types/party';
import KakaoMap from './KakaoMap';
import { useEffect, useState } from 'react';
import KakaoMapMarker from './KakaoMapMarker';
import useGeoLocation from '@/hooks/geoLocation';
import CurrentLocationMarker from './CurrentLocationMarker';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import PlaceList from './PlaceList';
import PlaceInfoSheet from './PlaceInfoSheet';

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
            setInfo(markers[0]);
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
    <section className='mt-10'>
      <h2 className='text-xl font-bold text-center mb-5'>
        근처 {foodName}집😋
      </h2>
      <div className='relative'>
        <KakaoMap onCreate={setMap} location={location}>
          {markers.map((marker) => (
            <div key={`${marker.position.lat},${marker.position.lng}`}>
              <KakaoMapMarker
                place={marker}
                onClick={() => setInfo(marker)}
                info={info}
              />
              {info && info.position === marker.position && (
                <CustomOverlayMap
                  position={{
                    lat: Number(marker.position.lat),
                    lng: Number(marker.position.lng),
                  }}
                >
                  <PlaceInfoSheet place={marker} />
                </CustomOverlayMap>
              )}
            </div>
          ))}
          {location && <CurrentLocationMarker location={location} />}
          <div className='absolute bottom-0 z-10 left-0 right-0'>
            <PlaceList places={markers} info={info} setInfo={setInfo} />
          </div>
        </KakaoMap>
      </div>
    </section>
  );
};

export default SearchMap;
