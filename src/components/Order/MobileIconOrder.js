import styled from 'styled-components';
import bagIcon from '../../image/bag.png';
import { Order } from '.';
import { useContext } from 'react';
import { Context } from '../Functions/context';

const Container = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: fixed;
  right: 10px;
  bottom: 10px;
  border: 0px;
  z-index: 30;
`;

const ImageBagIcon = styled.img`
  width 100%;
`;

const OrderContainer = styled.div`
    position: fixed !important;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 21;
    width: 100%;
    max-width: 100%;
    height: calc(100% - 80px);
    
    & section {
      max-width: 100%;
      height: 100%;
    }
`;

const BagIcon = () => {

  const { showModal, setShowModal } = useContext(Context);

  return (
    <>
      <Container onClick={() => setShowModal(prev => !prev)}>
        <ImageBagIcon src={bagIcon} alt="bag for items" />
      </Container>
      {showModal &&
        (<OrderContainer>
          <Order />
        </OrderContainer>)
      }
    </>
  )
}

export default BagIcon;