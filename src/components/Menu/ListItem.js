import React, { useContext } from 'react';
import styled from 'styled-components';
import { toLocaleCurrency } from '../Functions/secondaryfunctions';
import { Context } from '../Functions/context';

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 12px;
`;

const Item = styled.li`
  position: relative;
  width: 400px;
  height: 155px;
  background-image: ${({ img }) => `url(${img})`};
  margin-top: 30px;
  padding: 20px;
  color: white;
  z-index: 1;
  font-size: 30px;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: black;
    opacity: 30%;
    z-index: -1;
  }
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 50px 30px rgba(0,0,0,0.4);
    &:after {
      opacity: 0;
    }
  }
`;


export const ListItem = ({ itemList }) => {
  const { openItem: { setOpenItem } } = useContext(Context)
  return (
    <List>
      {itemList.map(item => (
        <Item key={item.id} img={item.img} onClick={() => setOpenItem(item)}>
          <p>{item.name}</p>
          <p>{toLocaleCurrency(item.price)}</p>
        </Item>
      ))}
    </List>
  )
}