import { useState } from 'react';

export function usePopUp() {
  const [PopUp, setPopUp] = useState(null);
  return { PopUp, setPopUp }
}
