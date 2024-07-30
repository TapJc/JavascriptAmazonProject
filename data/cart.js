export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
  },
];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
  if (newQuantity > 0 && newQuantity < 1000) {
    cart.forEach((cartItem) => {
      if (productId == cartItem.productId) {
        cartItem.quantity = newQuantity;
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          newQuantity;
      }
    });

    saveToStorage();
  }
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
      deliveryOptionId: "1",
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
