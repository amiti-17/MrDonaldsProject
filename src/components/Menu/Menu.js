import React, { useContext } from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { BannerMenu } from './BannerMenu';
import { useFetch } from '../Hooks/useFetch';
import { Context } from '../Functions/context';
// import { useDB } from '../Hooks/useDB';

const MenuStyled = styled.main`
  background-color: #ccc;
  margin-top: 80px;
  margin-left: 380px;
`;

const SectionMenu = styled.section`
  padding: 30px;
`;

export const Menu = () => {


  // this way use useFetch to recieve data for Menu from server(hosting)
  const res = useFetch();

  // this way use realTime FireBase dataStore to recieve data for Menu
  // const res = useDB()
  // console.log(res)


  const dbMenu = res.response
  const { openItem: { setOpenItem } } = useContext(Context)
  return (
    <MenuStyled>
      <BannerMenu />
      {
        res.response ?
          <>
            <SectionMenu>
              <h2>Бургеры</h2>
              <ListItem itemList={dbMenu.burger} setOpenItem={setOpenItem} />
            </SectionMenu>
            <SectionMenu>
              <h2>Закуски / Напитки</h2>
              <ListItem itemList={dbMenu.other} setOpenItem={setOpenItem} />
            </SectionMenu>
          </>
          : res.error ?
            <div>Sorry, we will fix it soon...</div>
            : <div>Loading...</div>
      }
    </MenuStyled >
  )
}