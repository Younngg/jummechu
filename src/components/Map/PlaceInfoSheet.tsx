import { Place } from '@/types/party';

const PlaceInfoSheet = ({ place }: { place: Place }) => {
  return (
    <div>
      <p>{place.content}</p>
    </div>
  );
};

export default PlaceInfoSheet;
