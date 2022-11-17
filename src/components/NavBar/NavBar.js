import React from 'react';
import styled from 'styled-components';
import logoImg from '../../image/logo.svg';
import signInImg from '../../image/sign.svg';

const NavBarStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #299B01;
  color: white;
  height: 80px;
`;

const Logo = styled.div`
  display: flex;
`;

const H1 = styled.h1`
  font-size: 24px;
  margin-left: 15px;
`;

const ImgLogo = styled.img`
  width: 50px;
`;


const Button = styled.button`
  background-color: transparent;
  color: inherit;
  border: transparent;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.1875;
  padding: 0;
  margin: 0;
  text-transform: uppercase;

`;

export const NavBar = () => (
  <NavBarStyled>
    <Logo>
      <ImgLogo src={logoImg} alt="logo" />
      <H1>MrDonald's</H1>
    </Logo>
    <Button>
      <img src={signInImg} alt="userIcon" />
      <p>Войти</p>
    </Button>
  </NavBarStyled>
);