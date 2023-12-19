type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onText: string;
  offText: string;
  disabled: boolean;
};

const VoteToggleButton = ({
  toggled,
  onToggle,
  onText,
  offText,
  disabled,
}: Props) => {
  return (
    <button
      className={`px-2 py-1 rounded-md disabled:bg-gray-300 ${
        toggled ? 'bg-red-200' : 'bg-sky-100'
      }`}
      onClick={() => onToggle(!toggled)}
      disabled={disabled && !toggled}
    >
      {toggled ? onText : offText}
    </button>
  );
};

export default VoteToggleButton;
