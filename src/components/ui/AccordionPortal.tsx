import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  id: string;
};

const AccordionPortal = ({ children, id }: Props) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById(`accordion${id}`) as Element;
  return createPortal(children, node);
};

export default AccordionPortal;
