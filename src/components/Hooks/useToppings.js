import { useState } from "react";

const getTopping = toppings => {
  if (toppings != undefined) {
    return toppings.map(item => ({
      name: item,
      checked: false,
    }))
  } else {
    return [];
  }

}

export function useToppings(openItem) {

  // const readyTopping = openItem.toppings ? getTopping(openItem.toppings) : [];
  // const [toppings, setToppings] = useState(readyTopping);
  const [toppings, setToppings] = useState(getTopping(openItem.toppings));

  const checkToppings = index => {
    setToppings(toppings.map((item, i) => {
      const newItem = { ...item };
      if (i === index) {
        newItem.checked = !newItem.checked;
      }
      return newItem;
    }))
  }

  return { toppings, checkToppings };
}