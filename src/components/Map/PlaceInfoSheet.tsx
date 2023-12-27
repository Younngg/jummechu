import { Place } from '@/types/party';

const PlaceInfoSheet = ({ place }: { place: Place }) => {
  return (
    <div className='absolute bottom-7 right-1/2 translate-x-1/2 bg-white p-1 border rounded-md'>
      <p className='text-sm font-bold'>{place.content}</p>
    </div>
  );
};

export default PlaceInfoSheet;
