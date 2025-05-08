// Export the login function as a module
export const loginUser = () => {
  cy.fixture("user").then((user) => {
    cy.visit("/login");

    cy.get('[data-qa="login-email"]').should("be.visible").type(user.email);
    cy.get('[data-qa="login-password"]')
      .should("be.visible")
      .type(user.password);
    cy.get('[data-qa="login-button"]').click();

    cy.url().should("not.include", "/login");
    cy.get("body").should("not.contain", "Login");
  });
};
