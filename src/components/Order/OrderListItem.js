import React, { useRef, useContext } from 'react';
import styled from 'styled-components';
import trash from '../../image/trash.svg';
import { toLocaleCurrency } from '../Functions/secondaryfunctions';
import { totalPriceItems } from '../Functions/secondaryfunctions';
import { Context } from '../Functions/context';

const OrderItemStyled = styled.li`
  display: flex;
  margin: 15px 0px 0px 0px;
  flex-wrap: wrap;
  cursor: pointer;
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

export const OrderListItem = ({ order, /*setOrders, orders*/ index, deleteItem }) => {


  const { openItem: { setOpenItem } } = useContext(Context)

  const refDeleteButton = useRef(null);

  const topping = order.topping.filter(dop => dop.checked).map(dop => dop.name).join(', ');
  return (
    <>
      < OrderItemStyled key={order.name} onClick={(e) => (e.target !== refDeleteButton.current) && setOpenItem({ ...order, index })}>
        <ItemName>{order.name} {order.choice}</ItemName>
        <span>{order.count}</span>
        <ItemPrice>{toLocaleCurrency(totalPriceItems(order))}</ItemPrice>
        <TrashButton ref={refDeleteButton} onClick={() => deleteItem(index)} />
        {order.topping.filter(dop => dop.checked).length > 0 && order.topping ?
          <Toppings >
            {topping}
          </Toppings> : <></>}
      </ OrderItemStyled>

    </>
  )
}