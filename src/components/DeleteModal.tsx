import DefaultButton from './ui/DefaultButton';

type Props = {
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal = ({ onClose, onDelete }: Props) => {
  return (
    <section className='flex flex-col items-center gap-10'>
      <p>이 모임을 삭제하시겠습니까?</p>
      <div className='flex gap-5'>
        <DefaultButton text='예' color='red' onClick={onDelete} />
        <DefaultButton text='아니오' color='gray' onClick={onClose} />
      </div>
    </section>
  );
};

export default DeleteModal;
