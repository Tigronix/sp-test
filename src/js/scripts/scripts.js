const SP = {};
SP.body = document.querySelector('body');
SP.ESC_CODE = 27;
SP.siteContent = document.querySelector('.site-content');
SP.isIe11 = !!window.MSInputMethodContext && !!document.documentMode;


if(SP.isIe11){
  SP.body.classList.add('ie11');
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function top_walker (node, test_func, last_parent) {
	while ( node && node !== last_parent ) {
		if ( test_func(node) ) {
			return node;
		}
		node = node.parentNode;
	}
}

// siblings
var getSiblings = function (elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling
  }

  return siblings;

};

// utility
masks();
calc();

// specific
