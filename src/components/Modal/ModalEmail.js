import { useContext } from "react";
import { Context } from "../Functions/context";
import { OverLay } from "./ModalItem";


export const ModalEmail = () => {
  const { useModalEmail } = useContext(Context)
  return (
    <OverLay onClick={useModalEmail(false)} />
  )
}