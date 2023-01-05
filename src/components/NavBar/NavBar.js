import React, { useContext } from 'react';
import styled from 'styled-components';
import logoImg from '../../image/logo.svg';
import signInImg from '../../image/sign.svg';
import { Context } from '../Functions/context';

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

const User = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;

`;

const LogOut = styled.span`
  font-size: 25px;
  font-weight: 700px;
  cursor: pointer;
  margin-right: 30px;
`;

const Figure = styled.figure`
  margin: 0px 25px;
`;

const Login = styled.button`
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

export const NavBar = () => {

  const { auth: { authentication, logIn, logOut } } = useContext(Context);

  return (
    <NavBarStyled>
      <Logo>
        <ImgLogo src={logoImg} alt="logo" />
        <H1>MrDonald's</H1>
      </Logo>
      {authentication ?
        <User>
          <Figure>
            <img src={signInImg} alt={authentication.displayName} />
            <figcaption>{authentication.displayName}</figcaption>
          </Figure>
          <LogOut title="Вийти" onClick={logOut}>X</LogOut>
        </User>
        :
        <Login onClick={logIn}>
          <Figure>
            <img src={signInImg} alt="userIcon" />
            <figcaption>Увійти</figcaption>
          </Figure>
        </Login>
      }
    </NavBarStyled>
  )

};