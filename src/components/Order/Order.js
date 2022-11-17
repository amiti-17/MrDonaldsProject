import React from 'react';
import styled from 'styled-components';
import { ButtonCheckout } from '../Style/ButtonCheckout';
import { OrderListItem } from './OrderListItem';
import { totalPriceItems } from '../functions/secondaryfunctions';
import { toLocaleCurrency } from '../functions/secondaryfunctions';


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


const OrderTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const OrderContent = styled.div`
  flex-grow: 1;
`;


const OrderList = styled.ul`

`;

const Total = styled.div`
  display: flex;
  margin: 0px 35px 30px;
  & span:first-child {
    flex-grow: 1;
  }
`;

const TotalPrice = styled.span`
  text-align: rigth:
  min-width: 65px;
  margin-left: 20px;
`;

const EmptyList = styled.p`
  text-align: center;
`;

export const Order = ({ orders, setOrders }) => {

  const total = orders.reduce((result, order) => totalPriceItems(order) + result, 0);

  const totalCounter = orders.reduce((result, order) => order.count + result, 0);

  return (
    <OrderStyled>
      <OrderTitle>Ваш заказ</OrderTitle>
      <OrderContent>
        {orders.length ?
          <OrderList>
            {orders.map(order => <OrderListItem order={order} orders={orders} setOrders={setOrders} />)}
          </OrderList> :
          <EmptyList>Список заказов - пуст</EmptyList>}
      </OrderContent>
      <Total>
        <span>Итого</span>
        <span>{totalCounter}</span>
        <TotalPrice>{toLocaleCurrency(total)}</TotalPrice>
      </Total>
      <ButtonCheckout></ButtonCheckout>
    </OrderStyled>
  )
}