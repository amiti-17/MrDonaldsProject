import React, { useContext } from 'react';
import styled from 'styled-components';
import { ButtonCheckout } from '../Style/ButtonCheckout';
import { CountItem } from './CountItem';
import { useCount } from '../Hooks/useCount';
import { toLocaleCurrency } from '../Functions/secondaryfunctions';
import { totalPriceItems } from '../Functions/secondaryfunctions';
import { Toppings } from './Toppings';
import { Choices } from './Choices';
import { useToppings } from '../Hooks/useToppings';
import { useChoices } from '../Hooks/useChoices';
import { Context } from '../Functions/context';

export const OverLay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 20;
`;

export const Modal = styled.div`
  background-color: #fff;
  width: 600px;
  height: 600px;
`;

const Banner = styled.div`
  height: 200px;
  width: 100%;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 200px);
  padding: 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  //align-item: flex-start;
  width: 100%;
`;

const NameOfItem = styled.p`
  display: inline-block;
  font-family: Pacifico;
  font-size: 30px;
  line-height: 1.76;
  //margin: 20px 0px 0px 37px;
`;

const PriceOfItem = styled.p`
  display: inline-block;
  font-family: Pacifico, cursive;
  font-size: 30px;
  line-height: 1.76;
  //margin: 20px 53px 0px 0px;
`;

const TotalPriceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ModalItem = () => {
  const { orders: { orders, setOrders }, openItem: { setOpenItem, openItem } } = useContext(Context);

  const counter = useCount(openItem.count);
  const toppings = useToppings(openItem);
  const choices = useChoices(openItem);
  const isEdit = openItem.index > -1;

  const editOrder = (e) => {
    const newOrders = [...orders];
    newOrders[openItem.index] = order;
    setOrders(newOrders);
    setOpenItem(null)
  }

  const closeModal = e => {
    if (e.target.id === 'overlayModalItem') {
      setOpenItem(null);
    }
  };

  const order = {
    ...openItem,
    count: counter.count,
    topping: toppings.toppings,
    choice: choices.choice,
  };

  const addToOrder = (e) => {
    setOrders([...orders, order]);
    setOpenItem(null);
  }

  return (
    <OverLay id="overlayModalItem" onClick={closeModal}>
      <Modal>
        <Banner img={openItem.img} />
        <Content>
          <HeaderContent>
            <NameOfItem>{openItem.name}</NameOfItem>
            <PriceOfItem>{toLocaleCurrency(openItem.price)}</PriceOfItem>
          </HeaderContent>
          <CountItem orders count={order.count} setCount={counter.setCount} onChange={counter.onChange} />
          {openItem.toppings && <Toppings {...toppings}></Toppings>}
          {openItem.choices && <Choices {...choices} openItem={openItem}></Choices>}
          <TotalPriceItem>
            <span>Ціна: </span>
            <span>{toLocaleCurrency(totalPriceItems(order))}</span>
          </TotalPriceItem>
          <ButtonCheckout onClick={isEdit ? editOrder : addToOrder} disabled={order.choices && !order.choice}>{isEdit ? "Редагувати" : "Додати"}</ButtonCheckout>
        </Content>
      </Modal>
    </OverLay >
  )

};
