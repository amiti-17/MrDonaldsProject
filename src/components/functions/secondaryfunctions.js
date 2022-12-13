export function toLocaleCurrency(price) {
  return price.toLocaleString('uk-UA', {
    style: 'currency', currency: 'UAH'
  })
}

export const totalPriceItems = order => {
  const countTopping = order.topping && order.topping.filter(item => item.checked).length;
  const priceTopping = order.price * 0.1 * countTopping;
  return ((order.price + priceTopping) * order.count);
}

export const projection = rules => {
  const keys = Object.keys(rules);
  return obj => keys.reduce((newObj, key) => {
    newObj[key] = rules[key].reduce((val, fn, i) => (i ? fn(val) : obj[fn]), null);
    return newObj;
  }, {})
}
