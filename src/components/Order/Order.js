import React from 'react';
import styled from 'styled-components';
import { ButtonCheckout } from '../Style/ButtonCheckout';
import { OrderListItem } from './OrderListItem';
import { totalPriceItems } from '../functions/secondaryfunctions';
import { toLocaleCurrency } from '../functions/secondaryfunctions';
import { projection } from '../functions/secondaryfunctions';
import { ref, set } from "firebase/database";

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

export const Order = ({ orders, setOrders, setOpenItem, authentication, logIn, firebaseDatabase }) => {

  function writeUserData(userId, name, email, order) {
    set(ref(firebaseDatabase, 'orders/' + userId), {
      username: name,
      email: email,
      order,
    }).then(() => {
      console.log('Data saved successfully!');
    })
      .catch((error) => {
        console.log('The write failed...');
      });
  }
  const sendOrder = () => {
    console.log('orders: ', orders)
    const newOrder = orders.map(projection(rulesData))
    console.log('newOrder: ', newOrder)



    writeUserData(authentication.displayName, authentication.displayName, authentication.email, newOrder)
  };

  const rulesData = {
    name: ['name'],
    price: ['price'],
    count: ['count'],
    toppings: ['topping', arr => arr.filter(obj => obj.checked), arr => arr.map(obj => obj.name), arr => arr.length ? arr : 'no toppings'],
    choice: ['choice', item => item ? item : 'no choices'],
  }

  const deleteItem = index => {

    // const newOrders = orders.filter((item, i) => index !== i);

    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders)
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
                orders={orders}
                setOrders={setOrders}
                deleteItem={deleteItem}
                index={index}
                setOpenItem={setOpenItem} />)}
          </OrderList> :
          <EmptyList>Список заказов - пуст</EmptyList>}
      </OrderContent>
      <Total>
        <span>Итого</span>
        <span>{totalCounter}</span>
        <TotalPrice>{toLocaleCurrency(total)}</TotalPrice>
      </Total>
      <ButtonCheckout onClick={() => {
        if (authentication) {
          sendOrder()
        } else {
          logIn();
        }
      }}>Замовити</ButtonCheckout>
    </OrderStyled>
  )
}