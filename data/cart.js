export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (productId == cartItem.productId) {
      cartItem.quantity = newQuantity;
    }
  });

  saveToStorage();
}

export function updateCartQuantity(className) {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  className === ".js-return-to-home-link"
    ? (document.querySelector(`${className}`).innerHTML =
        cartQuantity + " items")
    : (document.querySelector(`${className}`).innerHTML = cartQuantity);
}

export function addToCart(productId, quantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}
