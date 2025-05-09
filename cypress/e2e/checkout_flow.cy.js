// cypress/e2e/checkout_flow.cy.js
import CartPage from "../page/cart";
import CheckoutPage from "../page/checkout";
import ProductsPage from "../page/product";
import { loginUser } from "../page/login";

describe("Checkout Flow with Fake Payment", () => {
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const productsPage = new ProductsPage();

  before(() => {
    // Ensure user is logged in and cart has at least one item
    loginUser();
    //add item to cart
    productsPage.addToCart("Women", "Dress", 0);

    cartPage.visit();
  });

  it("should complete the checkout process with fake payment", () => {
    //  Proceed to checkout
    cartPage.proceedToCheckout();

    //submit order
    cy.get('[href="/payment"]').click();

    // Step 2: Enter fake card details and confirm the order
    checkoutPage.enterPaymentDetails({
      name: "Test User",
      cardNumber: "4242424242424242",
      cvc: "123",
      expiryMonth: "12",
      expiryYear: "2030",
    });
    checkoutPage.confirmOrder();

    // Step 3: Validate order confirmation message
    checkoutPage.verifyOrderConfirmation(
      "Congratulations! Your order has been confirmed!"
    );
  });
});
