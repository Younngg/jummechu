import { ReactNode } from 'react';

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onText: string | ReactNode;
  offText: string | ReactNode;
  disabled?: boolean;
  style?: string;
};

const ToggleButton = ({
  toggled,
  onToggle,
  onText,
  offText,
  disabled = false,
  style,
}: Props) => {
  return (
    <button
      className={style}
      onClick={() => onToggle(!toggled)}
      disabled={disabled && !toggled}
    >
      {toggled ? onText : offText}
    </button>
  );
};

export default ToggleButton;
