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
      
      const productCardNodes = document.querySelectorAll('.js-product-card');
      productCardNodes.forEach((productCardNode) => {
        const itemId = productCardNode.getAttribute('data-id');
        const cardObj = {};
        const cardObjInit = {};
        const number = parseInt(productCardNode.querySelector('.js-number').innerText);
        const priceNode = productCardNode.querySelector('.js-card-price');
        const priceNumber = parseInt(priceNode.innerText);
        cardObj.number = number;
        cardObj.priceNumber = priceNumber;
        cardObj.id = itemId;
        cart.dataArr.push(cardObj);

        cardObjInit.number = number;
        cardObjInit.priceNumber = priceNumber;
        cardObjInit.id = itemId;
        cart.dataArrInit.push(cardObjInit);

        // события на каунтере
        const counterNode = productCardNode.querySelector('.js-counter');
        const btnMinus = counterNode.querySelector('.js-minus');
        const btnPlus = counterNode.querySelector('.js-plus');
        const numberNode = counterNode.querySelector('.js-number');

        btnPlus.addEventListener('click', () => {
          cart.countPlus(numberNode, priceNode);
        });

        btnMinus.addEventListener('click', () => {
          cart.countMinus(numberNode, priceNode);
        });

        // события на remove кнопке
        const btnRemove = productCardNode.querySelector('.js-btn-cancel');
        btnRemove.addEventListener('click', () => {
          cart.removeItem(productCardNode);
        });
      });
    },
    countPlus: (numberNode, priceNode) => {
      const itemIdNode = numberNode.closest('.js-product-card').getAttribute('data-id');
      const itemId = cart.dataArr.filter(x => x.id === itemIdNode);
      itemId[0].number++;
      numberNode.innerText = itemId[0].number;
      cart.calc(itemId, priceNode, itemIdNode);
    },
    countMinus: (numberNode, priceNode) => {
      const itemIdNode = numberNode.closest('.js-product-card').getAttribute('data-id');
      const itemId = cart.dataArr.filter(x => x.id === itemIdNode);
      itemId[0].number--;
      const isNegativeNumber = itemId[0].number < 1;

      if (isNegativeNumber) {
        itemId[0].number = 1;
      }

      numberNode.innerText = itemId[0].number;
      cart.calc(itemId, priceNode, itemIdNode);
    },
    removeItem: (itemNode) => {
      const itemIdNode = itemNode.getAttribute('data-id');
      const itemRemoveIndex = cart.dataArr.findIndex(x => x.id === itemIdNode);
      cart.dataArr.splice(itemRemoveIndex, 1);
      itemNode.parentElement.remove();
      cart.calc(itemIdNode);
    },
    calc: (itemId, priceNode, itemIdNode) => {
      if (priceNode) {
        // обновить цену одного товара
        const getSingleItemPrice = (itemIdNode) => {
          const itemIdInit = cart.dataArrInit.filter(x => x.id === itemIdNode);
          const quantity = itemIdInit[0].number;
          const priceNumber = itemIdInit[0].priceNumber;
          const singleItemPrice = priceNumber / quantity;

          return singleItemPrice;
        };

        const singleItemPrice = getSingleItemPrice(itemIdNode);
        const itemSumm = singleItemPrice * itemId[0].number;
        itemId[0].priceNumber = itemSumm;
        priceNode.innerText = itemId[0].priceNumber;
      }

      // обновить итоговую стоимость продуктов
      let productPrices = [];
      productPrices = [];
      cart.dataArr.forEach((item) => {
        const singleItemPrice = item.priceNumber;
        productPrices.push(singleItemPrice);
      });
      const isArrayEmpty = productPrices.length === 0;

      if (isArrayEmpty) {
        cart.subTotalPriceNode.innerText = '0';
        cart.totalPriceNode.innerText = cart.taxPrice + cart.shippingPrice;
      } else {
        cart.productsSum = productPrices.reduce((total, amount) => total + amount);
        cart.subTotalPriceNode.innerText = cart.productsSum;

        // обновить общую стоимость товаров с учетём налога и доставки
        cart.orderSumm = cart.productsSum + cart.taxPrice + cart.shippingPrice;
        cart.totalPriceNode.innerText = cart.orderSumm;
      }
    }
  };

  cart.getData();
};