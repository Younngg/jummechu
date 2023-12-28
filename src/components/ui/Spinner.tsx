const Spinner = () => {
  return (
    <div role='status'>
      <span className='loading loading-spinner loading-lg text-primary'></span>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Spinner;
