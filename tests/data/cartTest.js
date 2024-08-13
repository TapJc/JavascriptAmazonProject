import { cart } from "../../data/cart-class.js";

describe("Test Suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("Adds an existing product to the cart", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
  });

  it("Adds a new product to the cart", () => {
    cart.cartItems = [];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
  });
});

describe("Test Suite: removeFromCart", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  });

  it("Removes an existing product from the cart", () => {
    // Checks if cart array is updated
    cart.removeFromCart(productId1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ])
    );
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it("Removes a non-existing product from cart", () => {
    cart.removeFromCart("hello");
    expect(cart.cartItems.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ])
    );
    expect(cart.cartItems[0].productId).toEqual(productId1);
  });
});

describe("Test Suite: updateDeliveryOption", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const deliveryOptionId = "3";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
    ];
  });

  it("Updating delivery option of a product", () => {
    cart.updateDeliveryOption(productId1, deliveryOptionId);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("3");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "3",
        },
      ])
    );
  });

  it("Updating delivery option of a non-existing product", () => {
    cart.updateDeliveryOption("hello", deliveryOptionId);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("Updating delivery option with a non-existing delivery option", () => {
    cart.updateDeliveryOption(productId1, "4");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
