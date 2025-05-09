export default class CartPage {
  elements = {
    cartItems: () => cy.get(".cart_items"),
  };

  visit() {
    cy.visit("/view_cart");
  }
}
