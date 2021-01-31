import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

// This funciton is used in usePizza hook to attach information of each pizza on order
const attachNamesAndPrices = (order, pizzas) => {
  return order.map((item) => {
    const pizza = pizzas.find((singlePizza) => {
      return singlePizza.id === item.id;
    });

    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
};

export default attachNamesAndPrices;
