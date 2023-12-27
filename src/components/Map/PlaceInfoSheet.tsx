import { Place } from '@/types/party';

const PlaceInfoSheet = ({ place }: { place: Place }) => {
  return (
    <div className='absolute bottom-10 right-1/2 translate-x-1/2 bg-white p-3 border rounded-md'>
      <p className='text-sm'>{place.content}</p>
    </div>
  );
};

export default PlaceInfoSheet;
