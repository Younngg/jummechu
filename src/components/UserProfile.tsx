import { AuthUser } from '@/types/user';

type Props = {
  user: AuthUser;
};

const UserProfile = ({ user }: Props) => {
  return (
    <div className='flex'>
      <img className='rounded-full w-9 h-9' src={user.image ?? undefined} alt='user profile' referrerPolicy='no-referrer'/>
    </div>
  );
};

export default UserProfile;
