//command to signup new user
export default class SignupPage {
  visit() {
    cy.visit("/login");
  }
  fillUsername(fullName) {
    cy.get('[data-qa="signup-name"]').type(fullName);
  }
  fillEmail(email) {
    cy.get('[data-qa="signup-email"]').type(email);
  }
  submit() {
    cy.get('[data-qa="signup-button"]').click();
  }
}
