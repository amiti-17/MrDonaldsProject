import React from 'react';
import styled from 'styled-components';
import trash from '../../image/trash.svg';
import { toLocaleCurrency } from '../functions/secondaryfunctions';
import { totalPriceItems } from '../functions/secondaryfunctions';

const OrderItemStyled = styled.li`
  display: flex;
  margin: 15px 0px 0px 0px;
  flex-wrap: wrap;
`;

const ItemName = styled.span`
  flex-grow: 1;
  min-width: 45px;
  max-width: 175px;
`;

const ItemPrice = styled.span`
  margin-left: 20px;
  margin-right: 12px;
  width: 97px;
  text-align: right;
`;

const TrashButton = styled.button`
  width: 24px;
  height: 24px;
  border-color: transparent;
  background-color: transparent;
  background-image: url(${trash});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Toppings = styled.div`
  color: #9a9a9a;
  font-size: 14px;
  width: 100%;
`;

export const OrderListItem = ({ order, setOrders, orders }) => {

  const deleteItem = (e) => {
    const newOrders = orders.slice();
    const index = orders.indexOf(order);
    newOrders.splice(index, 1)
    // const newOrder = orders[index + 1] ? orders.concat(orders.slice(0, index), orders.slice(index + 1)) : orders.slice(0, index);
    setOrders(newOrders)

  }

  const topping = order.topping.filter(dop => dop.checked).map(dop => dop.name).join(', ');
  console.log('order: ', order)
  console.log('orders: ', orders)
  console.log('setOrders: ', setOrders)
  return (
    <>
      < OrderItemStyled key={order.name}>
        <ItemName>{order.name} {order.choice}</ItemName>
        <span>{order.count}</span>
        <ItemPrice>{toLocaleCurrency(totalPriceItems(order))}</ItemPrice>
        <TrashButton onClick={deleteItem} />
        {order.topping.filter(dop => dop.checked).length > 0 && order.topping ?
          <Toppings >
            {topping}
          </Toppings> : <></>}
      </ OrderItemStyled>

    </>
  )
}