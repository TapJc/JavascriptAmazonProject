import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";

/**
 * 2 things to test:
 * How the page looks
 * How the page behaves
 */

describe("Test Suited: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // Runs code before each test
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-checkout-header"></div>
    <div class="js-payment-summary"></div>
  `;
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

    renderOrderSummary();
  });

  // Runs code after each test
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("Displays the cart", () => {
    // Testing how the page looks
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain("Intermediate Size Basketball");

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual("$10.90");
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual("$20.95");
  });

  it("Removes a product", () => {
    // Testing how the page behaves
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual("Intermediate Size Basketball");
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual("$20.95");

    // Checks if cart array is updated
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it("Updating delivery option", () => {
    const deliveryOption = 3;
    document
      .querySelector(`.js-delivery-option-${productId1}-${deliveryOption}`)
      .click();

    expect(
      document.querySelector(
        `.js-delivery-option-input-${productId1}-${deliveryOption}`
      ).checked
    ).toEqual(true);
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("3");

    expect(document.querySelector(".js-shipping-price").innerText).toEqual(
      "$14.98"
    );
    expect(document.querySelector(".js-total-price").innerText).toEqual(
      "$63.50"
    );
  });
});
