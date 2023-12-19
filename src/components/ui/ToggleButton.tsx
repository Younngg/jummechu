type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onText: string;
  offText: string;
};

const ToggleButton = ({ toggled, onToggle, onText, offText }: Props) => {
  return (
    <button onClick={() => onToggle(!toggled)}>
      {toggled ? onText : offText}
    </button>
  );
};

export default ToggleButton;
