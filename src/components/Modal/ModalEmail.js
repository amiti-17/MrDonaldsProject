import { useContext } from "react";
import { Context } from "../Functions/context";
import { OverLay } from ".";
import styled from "styled-components";
import okSign from '../../image/okSign.png';

const MainModalWindow = styled.div`
  background-color: white;
  width: 80%;
  min-width: 300px;
  max-width: 600px;
  height: 50%;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5%;
  gap: 15px;
`;

const Paragraf = styled.p`
  font-size: 20px;
  text-align: center;
`;

const ImageForOk = styled.img`
  width: 80%;
  max-width: 330px;
  margin: 0px auto;
`;

export const ModalEmail = () => {
  const { setModalEmail } = useContext(Context)
  return (
    <OverLay onClick={() => setModalEmail(false)}>
      <MainModalWindow>
        <Paragraf>You oreder was recieved, checked you mail</Paragraf>
        <ImageForOk src={okSign} />
      </MainModalWindow>
    </OverLay>
  )
}