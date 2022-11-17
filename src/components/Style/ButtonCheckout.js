import styled from 'styled-components';


export const ButtonCheckout = styled.button`
  display: block;
  background-color: #299B01;
  color: white;
  width: 250px;
  height: 65px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  font-size: 21px;
  line-height: 1.19;
  border: 2px solid #299B01;
  border-radius: 5px;
  z-index: 21;
  transition-property: color, background-color, border-color, border-radius;
  transition-duration: .3s;
  &:hover {
    background-color: #fff;
    color: #299B01;
    border-color: #299B01;
    border-radius: 10px;
  }
  &:disabled {
    color: #bbb;
    background-color: #ccc;
    border-color: #aaa;
  }
`;




