import React from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { BannerMenu } from './BannerMenu';
import { useDB } from '../Hooks/useDB';

const MenuStyled = styled.main`
  background-color: #ccc;
  margin-top: 80px;
`;

const SectionMenu = styled.section`
  padding: 30px;
`;

export const Menu = () => {


  const res = useDB()


  const dbMenu = res.response
  return (
    <MenuStyled>
      <BannerMenu />
      {
        res.response ?
          <>
            <SectionMenu>
              <h2>Бургеры</h2>
              <ListItem itemList={dbMenu.burger} />
            </SectionMenu>
            <SectionMenu>
              <h2>Закуски / Напитки</h2>
              <ListItem itemList={dbMenu.other} />
            </SectionMenu>
          </>
          : res.error ?
            <div>Sorry, we will fix it soon...</div>
            : <div>Loading...</div>
      }
    </MenuStyled >
  )
}