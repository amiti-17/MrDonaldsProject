import React, { useContext } from 'react';
import styled from 'styled-components';
import { ButtonCheckout } from '../Style/ButtonCheckout';
import { OrderListItem } from './OrderListItem';
import { totalPriceItems } from '../Functions/secondaryfunctions';
import { toLocaleCurrency } from '../Functions/secondaryfunctions';
import { Context } from '../Functions/context';

const OrderStyled = styled.section`
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  background: white;
  min-width: 380px;
  max-width: 380px;
  min-height: 68vh;
  height: 100%;
  box-shadow: 3px 4px 5px rgba(0,0,0, 0.25);
  padding: 20px;
  overflow: auto;
`;

export const OrderTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const OrderContent = styled.div`
  flex-grow: 1;
`;


export const Total = styled.div`
  display: flex;
  margin: 10px 35px 30px;
  & span:first-child {
    flex-grow: 1;
  }
`;

export const TotalPrice = styled.span`
  text-align: rigth:
  min-width: 65px;
  margin-left: 20px;
`;

const EmptyList = styled.p`
  text-align: center;
`;

const LocalButtonCheckout = styled(ButtonCheckout)`
@media (max-width: 768px) {
    position: relative;
    right: 15px;
  }
`

export const Order = () => {

  const {
    orders: { orders, setOrders },
    orderConfirm: { setOpenOrderConfirm },
    auth: { authentication, logIn },
  } = useContext(Context);

  const deleteItem = index => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  }

  const total = orders.reduce((result, order) => totalPriceItems(order) + result, 0);

  const totalCounter = orders.reduce((result, order) => order.count + result, 0);

  return (
    <OrderStyled>
      <OrderTitle>Ваше замовлення</OrderTitle>
      <OrderContent>
        {orders.length ?
          <ul>
            {orders.map((order, index) =>
              <OrderListItem
                key={index}
                order={order}
                deleteItem={deleteItem}
                index={index} />)}
          </ul> :
          <EmptyList>Список замовлення - пустий</EmptyList>}
      </OrderContent>
      {
        orders.length ?
          (<><Total>
            <span>Всього</span>
            <span>{totalCounter}</span>
            <TotalPrice>{toLocaleCurrency(total)}</TotalPrice>
          </Total>
            <LocalButtonCheckout onClick={() => {
              if (authentication) {
                setOpenOrderConfirm(true);
              } else {
                logIn({ isButtonOrder: true, setOpenOrderConfirm });
              }
            }}>Замовити</LocalButtonCheckout></>)
          : null
      }
    </OrderStyled>
  )
}