import { User } from '@/types/user';
import UserProfile from './UserProfile';

type Props = {
  voters: User[];
};

const VoterList = ({ voters }: Props) => {
  return (
    <ul className='border w-96 rounded-md bg-gray-100'>
      {voters.map((voter, index) => (
        <li
          key={voter.id}
          className={`px-4 py-2 ${index !== voters.length - 1 && 'border-b'}`}
        >
          <UserProfile user={voter} size='small' />
        </li>
      ))}
    </ul>
  );
};

export default VoterList;
