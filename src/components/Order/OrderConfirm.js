import React, { useContext } from "react";
import styled from "styled-components";
import { OverLay } from "../Modal";
import { OrderTitle, Total, TotalPrice } from "/";
import { ButtonCheckout } from "../Style/ButtonCheckout";
import { projection } from '../Functions/secondaryfunctions';
import { totalPriceItems } from '../Functions/secondaryfunctions';
import { toLocaleCurrency } from '../Functions/secondaryfunctions';
import { ref, set } from "firebase/database";
import { Context } from "../Functions/context";

const Modal = styled.div`
    background-color: white;
    width: 600px;
    padding: 30px;
`;

const Text = styled.h3`
    text-align: center;
    margin-bottom: 30px;
`;


export const OrderConfirm = () => {
    const {
        orders: { orders, setOrders },
        auth: { authentication },
        orderConfirm: { setOpenOrderConfirm },
        database: firebaseDatabase,
        setModalEmail,
        setShowModal,
    } = useContext(Context)

    const total = orders.reduce((result, order) => totalPriceItems(order) + result, 0);

    function writeUserData(userId, name, email, order) {
        let userNameId = name + "-" + userId;
        set(ref(firebaseDatabase, 'orders/' + userNameId), {
            username: name,
            email: email,
            order,
        }).then(() => {
            console.log('Data saved successfully!');
            setOrders([]);
            console.log("order was cleaned")
        }).catch((error) => {
            console.log('The write failed...');
        });
    }

    const sendOrder = (orders, authentication) => {
        const newOrder = orders.map(projection(rulesData))
        writeUserData(authentication.uid, authentication.displayName, authentication.email, newOrder)
    };

    const rulesData = {
        name: ['name'],
        price: ['price'],
        count: ['count'],
        toppings: ['topping', arr => arr.filter(obj => obj.checked), arr => arr.map(obj => obj.name), arr => arr.length ? arr : 'no toppings'],
        choice: ['choice', item => item ? item : 'no choices'],
    }


    const closeModal = e => {
        try {
            if (e.target.id === 'overlayOrderConfirm') {
                setOpenOrderConfirm(false);
            }
        } catch (e) {
            console.error('err: ', e)
        }

    };

    return (
        <OverLay id="overlayOrderConfirm" onClick={closeModal} style={{ zIndex: '31' }}>
            <Modal style={{ zIndex: '32' }}>
                <OrderTitle>{authentication.displayName + `'s (your) order`}</OrderTitle>
                <Text>Підтвердження замовлення</Text>
                <Total>
                    <span>Total:</span>
                    <TotalPrice>{toLocaleCurrency(total)}</TotalPrice>
                </Total>
                <ButtonCheckout onClick={() => {
                    sendOrder(orders, authentication);
                    setOrders([]);
                    setOpenOrderConfirm(false);
                    setModalEmail(true);
                    setShowModal(false);
                }}>Замовити</ButtonCheckout>

            </Modal>
        </OverLay>
    )
}