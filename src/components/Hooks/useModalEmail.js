import { useState } from 'react';

export function useModalEmail() {
  const [modalEmail, setModalEmail] = useState(false);
  return { modalEmail, setModalEmail }
}