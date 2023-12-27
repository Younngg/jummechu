import { BASE_URL_DEV } from '@/constants/url';

const ShareBar = () => {
  const onClickShare = () => {
    navigator.clipboard
      .writeText(`${BASE_URL_DEV}${window.location.pathname}`)
      .then(() => alert('링크가 복사되었습니다'));
  };

  return (
    <div>
      <button onClick={onClickShare}>공유하기</button>
    </div>
  );
};

export default ShareBar;
