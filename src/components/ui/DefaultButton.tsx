import { FormEvent, ReactNode } from 'react';

type Props = {
  color: 'gray' | 'red' | 'sky' | 'green' | 'darkgray' | '';
  // color: string;
  text: string | ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const colorText = {
  gray: 'bg-gray-200',
  red: 'bg-red-200',
  sky: 'bg-sky-100',
  darkgray: 'bg-gray-300',
  green: 'bg-green-200',
  '': '',
};

const DefaultButton = ({
  color = '',
  text,
  onClick,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`px-2 py-1 rounded-md ${colorText[color]}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
