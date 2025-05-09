export default class CartPage {
  elements = {
    cartItems: () => cy.get(".cart_items"),
  };

  visit() {
    cy.visit("/view_cart");
  }

  proceedToCheckout() {
    cy.contains("Proceed To Checkout").click();
  }
}
