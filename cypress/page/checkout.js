export default class CheckoutPage {
  fillAddress() {
    // Fill address fields if editable, or verify auto-filled
    cy.get('[data-qa="address"]').should("be.visible");
    // Add logic to fill if fields are empty/editable
  }
  enterPaymentDetails({ name, cardNumber, cvc, expiryMonth, expiryYear }) {
    cy.get('input[name="name_on_card"]').type(name);
    cy.get('input[name="card_number"]').type(cardNumber);
    cy.get('input[name="cvc"]').type(cvc);
    cy.get('input[name="expiry_month"]').type(expiryMonth);
    cy.get('input[name="expiry_year"]').type(expiryYear);
  }
  confirmOrder() {
    cy.contains("Pay and Confirm Order").click();
  }
  verifyOrderConfirmation(msg) {
    cy.contains(msg).should("be.visible");
  }
}
