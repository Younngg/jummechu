const ShareBar = () => {
  const onClickShare = () => {
    navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}${window.location.pathname}`
      )
      .then(() => alert('링크가 복사되었습니다'));
  };

  return (
    <div>
      <button className='btn btn-ghost btn-sm' onClick={onClickShare}>
        공유하기
      </button>
    </div>
  );
};

export default ShareBar;
