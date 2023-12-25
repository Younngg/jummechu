import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};

const ModalPortal = ({ children }: Props) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById(`modal`) as Element;
  return createPortal(children, node);
};

export default ModalPortal;
