import React from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { BannerMenu } from './BannerMenu';
import { useDB } from '../Hooks/useDB';
import { Order } from '../Order';
import { isMobile } from 'react-device-detect';

const MenuStyled = styled.main`
  background-color: #fff;
  margin-top: 80px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  & li {
    border-radius: 5px;
  }
`;

const FlexBoxMobile = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionMenu = styled.section`
  padding: 30px;
`;

const SectionContainer = isMobile ? FlexBoxMobile : FlexBox;

export const Menu = () => {

  const res = useDB()


  const dbMenu = res.response
  return (
    <MenuStyled>
      <BannerMenu />
      <FlexBox>
        {!isMobile && <Order />}
        {
          res.response ?
            <SectionContainer>
              <SectionMenu>
                <h2>Бургери</h2>
                <ListItem itemList={dbMenu.burger} />
              </SectionMenu>
              <SectionMenu>
                <h2>Закуски / Напої</h2>
                <ListItem itemList={dbMenu.other} />
              </SectionMenu>
            </SectionContainer>
            : res.error ?
              <div>Sorry, we will fix it soon...</div>
              : <div>Loading...</div>
        }
      </FlexBox>
    </MenuStyled >
  )
}