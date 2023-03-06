import { useState } from "react";

export const useShowModal = () => {
  const [showModal, setShowModal] = useState(false);
  return { showModal, setShowModal };
}