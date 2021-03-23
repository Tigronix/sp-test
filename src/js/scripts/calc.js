const calc = () => {
  const cart =
  {
    totalPriceNode: document.querySelector('.js-total-price'),
    totalGetPrice: () => {
      cart.totalPrice = parseInt(cart.totalPriceNode.innerText);
    },
    subTotalPriceNode: document.querySelector('.js-subtotal-price'),
    taxNode: document.querySelector('.js-tax-price'),
    taxGetPrice: () => {
      cart.taxPrice = parseInt(cart.taxNode.innerText);
    },
    shippingNode: document.querySelector('.js-shipping-price'),
    shippingGetPrice: () => {
      cart.shippingPrice = parseInt(cart.shippingNode.innerText)
    },
    dataArr: [],
    dataArrInit: [],
    getData: () => {
      // Получение данных при загрузке страницы
      cart.taxGetPrice();
      cart.shippingGetPrice();
      cart.totalGetPrice();

      cart.dataArrInit = [];
      const productCardNodes = document.querySelectorAll('.js-product-card');
      productCardNodes.forEach((productCardNode, arrayIndex) => {
        const cardObj = {};
        const cardObjInit = {};
        const number = parseInt(productCardNode.querySelector('.js-number').innerText);
        const priceNode = productCardNode.querySelector('.js-card-price');
        const priceNumber = parseInt(priceNode.innerText);
        cardObj.number = number;
        cardObj.priceNumber = priceNumber;
        cart.dataArr.push(cardObj);

        cardObjInit.number = number;
        cardObjInit.priceNumber = priceNumber;
        cart.dataArrInit.push(cardObjInit);

        // события на каунтере
        const counterNode = productCardNode.querySelector('.js-counter');
        const btnMinus = counterNode.querySelector('.js-minus');
        const btnPlus = counterNode.querySelector('.js-plus');
        const numberNode = counterNode.querySelector('.js-number');

        btnPlus.addEventListener('click', () => {
          cart.countPlus(numberNode, arrayIndex, priceNode);
        });

        btnMinus.addEventListener('click', () => {
          cart.countMinus(numberNode, arrayIndex, priceNode);
        });

        // события на remove кнопке
        const btnRemove = productCardNode.querySelector('.js-btn-cancel');
        btnRemove.addEventListener('click', () => {
          cart.removeItem(productCardNode, arrayIndex);
        });
      });
    },
    countPlus: (numberNode, arrayIndex, priceNode) => {
      cart.dataArr[arrayIndex].number++;
      numberNode.innerText = cart.dataArr[arrayIndex].number;
      cart.calc(arrayIndex, priceNode);
    },
    countMinus: (numberNode, arrayIndex, priceNode) => {
      cart.dataArr[arrayIndex].number--;
      const isNegativeNumber = cart.dataArr[arrayIndex].number < 1;

      if (isNegativeNumber) {
        cart.dataArr[arrayIndex].number = 1;
      }

      numberNode.innerText = cart.dataArr[arrayIndex].number;
      cart.calc(arrayIndex, priceNode);
    },
    removeItem: (itemNode, arrayIndex) => {
      itemNode.remove();
      cart.dataArr.splice(arrayIndex, 1);
      cart.calc(arrayIndex);

      console.log(cart.dataArr);
    },
    calc: (arrayIndex, priceNode) => {
      if (priceNode) {
        // обновить цену одного товара
        const getSingleItemPrice = (arrayIndex) => {
          const item = cart.dataArrInit[arrayIndex];
          const quantity = item.number;
          const priceNumber = item.priceNumber;
          const singleItemPrice = priceNumber / quantity;

          return singleItemPrice;
        };

        const singleItemPrice = getSingleItemPrice(arrayIndex);
        const itemSumm = singleItemPrice * cart.dataArr[arrayIndex].number;
        priceNode.innerText = itemSumm;
        cart.dataArr[arrayIndex].priceNumber = itemSumm;
      }

      // обновить итоговую стоимость продуктов
      let productPrices = [];
      productPrices = [];
      cart.dataArr.forEach((item) => {
        const singleItemPrice = item.priceNumber;
        productPrices.push(singleItemPrice);
      });

      cart.productsSum = productPrices.reduce((total, amount) => total + amount);
      cart.subTotalPriceNode.innerText = cart.productsSum;

      // обновить общую стоимость товаров с учетём налога и доставки
      cart.orderSumm = cart.productsSum + cart.taxPrice + cart.shippingPrice;
      cart.totalPriceNode.innerText = cart.orderSumm;
    }
  };

  cart.getData();
};