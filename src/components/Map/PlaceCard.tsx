import { Place } from '@/types/party';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import PlaceIcon from '../ui/icons/PlaceIcon';

type Props = {
  place: Place;
  info: Place | undefined;
  onClick: (place: Place) => void;
};

const PlaceCard = ({ place, info, onClick }: Props) => {
  const placeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (info) {
      const placeId = placeRef.current?.getAttribute('id');

      if (`${info.position.lat},${info.position.lng}` === placeId) {
        placeRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [info]);

  return (
    <div
      id={`${place.position.lat},${place.position.lng}`}
      className={`w-48 h-28 p-3 flex flex-col justify-between border rounded-md text-sm bg-black text-white ${
        info?.position === place.position && 'border-4 border-red-500'
      }`}
      ref={placeRef}
      onClick={() => onClick(place)}
    >
      <p className='font-bold'>{place.content}</p>
      {info?.position === place.position && (
        <Link
          href={`https://map.kakao.com/link/to/${place.content},${place.position.lat},${place.position.lng}`}
          className='flex items-center bg-red-500 px-1 py-1 rounded-md w-fit'
        >
          <PlaceIcon /> 길찾기
        </Link>
      )}
    </div>
  );
};

export default PlaceCard;
