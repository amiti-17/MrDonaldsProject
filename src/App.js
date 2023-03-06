import React, { useState } from 'react';
import BagIcon from './components/Order/MobileIconOrder';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GlobalStyle } from './components/Style/GlobalSyle';
import { NavBar } from './components/NavBar';
import { Menu } from './components/Menu';
import { ModalItem } from './components/Modal';
import { useOpenItem } from './components/Hooks/useOpenItem';
import { useOrders } from './components/Hooks/useOrders';
import { useAuth } from './components/Hooks/useAuth';
import { getDatabase } from "firebase/database";
import { useTitle } from './components/Hooks/useTitle';
import { OrderConfirm } from './components/Order/OrderConfirm';
import { useOrderConfirm } from './components/Hooks/useOrderConfirm';
import { Context } from './components/Functions/context';
import { usePopUp } from './components/Hooks/usePopUp';
import { isMobile } from 'react-device-detect';
import { useModalEmail } from './components/Hooks/useModalEmail';
import { ModalEmail } from './components/Modal/ModalEmail';

const firebaseConfig = {
  apiKey: "AIzaSyBa7qlvpIJ3PU_5esIyF6xMPjs8apMQXGs",
  authDomain: "mrdonalds-23ccc.firebaseapp.com",
  databaseURL: "https://mrdonalds-23ccc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mrdonalds-23ccc",
  storageBucket: "mrdonalds-23ccc.appspot.com",
  messagingSenderId: "426664403662",
  appId: "1:426664403662:web:1354a93acc0952433d669f"
};

const firebaseApp = initializeApp(firebaseConfig);

function App() {

  const openItem = useOpenItem();
  const { PopUp, setPopUp } = usePopUp();
  const orders = useOrders();
  useTitle(openItem.openItem);
  const authFirebase = getAuth(firebaseApp);
  const database = getDatabase(firebaseApp);
  const auth = useAuth(authFirebase);
  const orderConfirm = useOrderConfirm();
  const { modalEmail, setModalEmail } = useModalEmail();
  const [isHaveBeenLogin, setIsHaveBeenLogin] = useState(false);

  return (
    <Context.Provider value={{ auth, openItem, orders, orderConfirm, database, setPopUp, modalEmail, setModalEmail, isHaveBeenLogin, setIsHaveBeenLogin }}>
      <GlobalStyle />
      <NavBar />
      <Menu />
      {openItem.openItem && <ModalItem />}
      {isMobile && <BagIcon>Click</BagIcon>}
      {orderConfirm.openOrderConfirm && <OrderConfirm />}
      {PopUp && <PopUp />}
      {modalEmail && <ModalEmail />}
    </Context.Provider>
  );
}

export default App;
