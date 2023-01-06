import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GlobalStyle } from './components/Style/GlobalSyle';
import { NavBar } from './components/NavBar/NavBar';
import { Menu } from './components/Menu/Menu';
import { ModalItem } from './components/Modal/ModalItem';
import { Order } from './components/Order/Order';
import { useOpenItem } from './components/Hooks/useOpenItem';
import { useOrders } from './components/Hooks/useOrders';
import { useAuth } from './components/Hooks/useAuth';
import { getDatabase } from "firebase/database";
import { useTitle } from './components/Hooks/useTitle';
import { OrderConfirm } from './components/Order/OrderConfirm';
import { useOrderConfirm } from './components/Hooks/useOrderConfirm';
import { Context } from './components/Functions/context';

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
  const orders = useOrders();
  useTitle(openItem.openItem);
  const authFirebase = getAuth(firebaseApp);
  const database = getDatabase(firebaseApp);
  const auth = useAuth(authFirebase);
  const orderConfirm = useOrderConfirm()
  // console.log('auth:', auth)

  return (
    <Context.Provider value={{ auth, openItem, orders, orderConfirm, database }}>
      <GlobalStyle />
      <NavBar />
      <Order />
      <Menu />
      {openItem.openItem && <ModalItem />}
      {orderConfirm.openOrderConfirm && <OrderConfirm />}
    </Context.Provider>
  );
}

export default App;
