import Link from 'next/link';

const NotFound = () => {
  return (
    <section className='flex flex-col items-center gap-5 my-48'>
      <p className='text-2xl font-bold'>404</p>
      <p>존재하지 않는 페이지입니다😥</p>
      <Link
        href='/'
        className='px-2 py-1 bg-red-300 font-bold text-white rounded-md'
      >
        홈으로 가기
      </Link>
    </section>
  );
};

export default NotFound;
