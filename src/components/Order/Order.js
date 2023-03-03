import React, { useContext } from 'react';
import styled from 'styled-components';
import { ButtonCheckout } from '../Style/ButtonCheckout';
import { OrderListItem } from './OrderListItem';
import { totalPriceItems } from '../Functions/secondaryfunctions';
import { toLocaleCurrency } from '../Functions/secondaryfunctions';
import { Context } from '../Functions/context';

const OrderStyled = styled.section`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 80px;
  left: 0;
  background: white;
  min-width: 380px;
  max-width: 380px;
  height: calc(100% - 80px);
  box-shadow: 3px 4px 5px rgba(0,0,0, 0.25);
  padding: 20px;
  
`;


export const OrderTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const OrderContent = styled.div`
  flex-grow: 1;
`;


const OrderList = styled.ul`

`;

export const Total = styled.div`
  display: flex;
  margin: 0px 35px 30px;
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

export const Order = () => {
  const {
    orders: { orders, setOrders },
    orderConfirm: { setOpenOrderConfirm },
    auth: { authentication, logIn }
  } = useContext(Context)
  const deleteItem = index => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  }

  const total = orders.reduce((result, order) => totalPriceItems(order) + result, 0);

  const totalCounter = orders.reduce((result, order) => order.count + result, 0);

  return (
    <OrderStyled>
      <OrderTitle>Ваш заказ</OrderTitle>
      <OrderContent>
        {orders.length ?
          <OrderList>
            {orders.map((order, index) =>
              <OrderListItem
                key={index}
                order={order}
                deleteItem={deleteItem}
                index={index} />)}
          </OrderList> :
          <EmptyList>Список заказов - пуст</EmptyList>}
      </OrderContent>
      {
        orders.length ?
          (<><Total>
            <span>Итого</span>
            <span>{totalCounter}</span>
            <TotalPrice>{toLocaleCurrency(total)}</TotalPrice>
          </Total>
            <ButtonCheckout onClick={() => {
              if (authentication) {
                setOpenOrderConfirm(true)
              } else {
                logIn();
              }
            }}>Замовити</ButtonCheckout></>)
          : null
      }
    </OrderStyled>
  )
}