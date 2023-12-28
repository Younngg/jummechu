import { Place } from '@/types/party';
import { useEffect, useRef } from 'react';
import PlaceCard from './PlaceCard';

type Props = {
  places: Place[];
  info: Place | undefined;
  setInfo: (place: Place) => void;
};

const PlaceList = ({ places, info, setInfo }: Props) => {
  return (
    <ul className='w-full flex overflow-x-auto flex-nowrap gap-3 px-3'>
      {places.map((place) => (
        <li
          key={`${place.position.lat},${place.position.lng}`}
          className={`grow-0 shrink-0 mb-3 ${info !== place && 'opacity-75'}`}
        >
          <PlaceCard info={info} place={place} onClick={setInfo} />
        </li>
      ))}
    </ul>
  );
};

export default PlaceList;
