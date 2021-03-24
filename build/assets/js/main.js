'use strict';

var masks = function masks() {
  $('.js-card-4').mask('0000');
  $('.js-card-3').mask('000');
  $('.js-date').mask('00/00');
};

var calc = function calc() {
  var cart = {
    totalPriceNode: document.querySelector('.js-total-price'),
    totalGetPrice: function totalGetPrice() {
      cart.totalPrice = parseInt(cart.totalPriceNode.innerText);
    },
    subTotalPriceNode: document.querySelector('.js-subtotal-price'),
    taxNode: document.querySelector('.js-tax-price'),
    taxGetPrice: function taxGetPrice() {
      cart.taxPrice = parseInt(cart.taxNode.innerText);
    },
    shippingNode: document.querySelector('.js-shipping-price'),
    shippingGetPrice: function shippingGetPrice() {
      cart.shippingPrice = parseInt(cart.shippingNode.innerText);
    },
    dataArr: [],
    dataArrInit: [],
    getData: function getData() {
      // Получение данных при загрузке страницы
      cart.taxGetPrice();
      cart.shippingGetPrice();
      cart.totalGetPrice();

      var productCardNodes = document.querySelectorAll('.js-product-card');
      productCardNodes.forEach(function (productCardNode) {
        var itemId = productCardNode.getAttribute('data-id');
        var cardObj = {};
        var cardObjInit = {};
        var number = parseInt(productCardNode.querySelector('.js-number').innerText);
        var priceNode = productCardNode.querySelector('.js-card-price');
        var priceNumber = parseInt(priceNode.innerText);
        cardObj.number = number;
        cardObj.priceNumber = priceNumber;
        cardObj.id = itemId;
        cart.dataArr.push(cardObj);

        cardObjInit.number = number;
        cardObjInit.priceNumber = priceNumber;
        cardObjInit.id = itemId;
        cart.dataArrInit.push(cardObjInit);

        // события на каунтере
        var counterNode = productCardNode.querySelector('.js-counter');
        var btnMinus = counterNode.querySelector('.js-minus');
        var btnPlus = counterNode.querySelector('.js-plus');
        var numberNode = counterNode.querySelector('.js-number');

        btnPlus.addEventListener('click', function () {
          cart.countPlus(numberNode, priceNode);
        });

        btnMinus.addEventListener('click', function () {
          cart.countMinus(numberNode, priceNode);
        });

        // события на remove кнопке
        var btnRemove = productCardNode.querySelector('.js-btn-cancel');
        btnRemove.addEventListener('click', function () {
          cart.removeItem(productCardNode);
        });
      });
    },
    countPlus: function countPlus(numberNode, priceNode) {
      var itemIdNode = numberNode.closest('.js-product-card').getAttribute('data-id');
      var itemId = cart.dataArr.filter(function (x) {
        return x.id === itemIdNode;
      });
      itemId[0].number++;
      numberNode.innerText = itemId[0].number;
      cart.calc(itemId, priceNode, itemIdNode);
    },
    countMinus: function countMinus(numberNode, priceNode) {
      var itemIdNode = numberNode.closest('.js-product-card').getAttribute('data-id');
      var itemId = cart.dataArr.filter(function (x) {
        return x.id === itemIdNode;
      });
      itemId[0].number--;
      var isNegativeNumber = itemId[0].number < 1;

      if (isNegativeNumber) {
        itemId[0].number = 1;
      }

      numberNode.innerText = itemId[0].number;
      cart.calc(itemId, priceNode, itemIdNode);
    },
    removeItem: function removeItem(itemNode) {
      var itemIdNode = itemNode.getAttribute('data-id');
      var itemRemoveIndex = cart.dataArr.findIndex(function (x) {
        return x.id === itemIdNode;
      });
      cart.dataArr.splice(itemRemoveIndex, 1);
      itemNode.parentElement.remove();
      cart.calc(itemIdNode);
    },
    calc: function calc(itemId, priceNode, itemIdNode) {
      if (priceNode) {
        // обновить цену одного товара
        var getSingleItemPrice = function getSingleItemPrice(itemIdNode) {
          var itemIdInit = cart.dataArrInit.filter(function (x) {
            return x.id === itemIdNode;
          });
          var quantity = itemIdInit[0].number;
          var priceNumber = itemIdInit[0].priceNumber;
          var singleItemPrice = priceNumber / quantity;

          return singleItemPrice;
        };

        var singleItemPrice = getSingleItemPrice(itemIdNode);
        var itemSumm = singleItemPrice * itemId[0].number;
        itemId[0].priceNumber = itemSumm;
        priceNode.innerText = itemId[0].priceNumber;
      }

      // обновить итоговую стоимость продуктов
      var productPrices = [];
      productPrices = [];
      cart.dataArr.forEach(function (item) {
        var singleItemPrice = item.priceNumber;
        productPrices.push(singleItemPrice);
      });
      var isArrayEmpty = productPrices.length === 0;

      if (isArrayEmpty) {
        cart.subTotalPriceNode.innerText = '0';
        cart.totalPriceNode.innerText = cart.taxPrice + cart.shippingPrice;
      } else {
        cart.productsSum = productPrices.reduce(function (total, amount) {
          return total + amount;
        });
        cart.subTotalPriceNode.innerText = cart.productsSum;

        // обновить общую стоимость товаров с учетём налога и доставки
        cart.orderSumm = cart.productsSum + cart.taxPrice + cart.shippingPrice;
        cart.totalPriceNode.innerText = cart.orderSumm;
      }
    }
  };

  cart.getData();
};
var SP = {};
SP.body = document.querySelector('body');
SP.ESC_CODE = 27;
SP.siteContent = document.querySelector('.site-content');
SP.isIe11 = !!window.MSInputMethodContext && !!document.documentMode;

if (SP.isIe11) {
  SP.body.classList.add('ie11');
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function top_walker(node, test_func, last_parent) {
  while (node && node !== last_parent) {
    if (test_func(node)) {
      return node;
    }
    node = node.parentNode;
  }
}

// siblings
var getSiblings = function getSiblings(elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

// utility
masks();
calc();

// specific
//# sourceMappingURL=main.js.map
