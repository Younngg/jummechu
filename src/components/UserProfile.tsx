import { User } from '@/types/user';

type Props = {
  user: User;
  size?: 'small' | 'default';
};

const UserProfile = ({ user, size = 'default' }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <img
        className={`rounded-full w-9 h-9 ${size === 'small' && 'w-6 h-6'}`}
        src={user.image ?? undefined}
        alt='user profile'
        referrerPolicy='no-referrer'
      />
      <p className='text-sm'>{user.name}</p>
    </div>
  );
};

export default UserProfile;
