import React from 'react';
import styled from 'styled-components';
import banner from '../../image/banner.png';

const BannerMenuStyled = styled.div`
  width: 100%;
  height: 210px;
  background-image: url(${banner});
  background-position: center;
  background-size: cover;
  @media (max-width: 450px) {
    height: 150px;
  }
`;
export const BannerMenu = () => (
  <BannerMenuStyled />
)