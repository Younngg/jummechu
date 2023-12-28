type Props = {
  color?: 'white' | 'blue';
  size?: 'lg' | 'xs';
};

const COLOR_TEXT = {
  white: 'text-base-100',
  blue: 'text-primary',
};

const LoadingDots = ({ color = 'white', size = 'lg' }: Props) => {
  return (
    <div role='status'>
      <span
        className={`loading loading-dots loading-${size} ${COLOR_TEXT[color]}`}
      ></span>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default LoadingDots;
