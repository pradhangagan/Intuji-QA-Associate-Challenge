import { loginUser } from "../page/login";

// Import the login function from loggedin_page.js

describe("User logout and Re-login", () => {
  beforeEach(() => {
    loginUser();
  });

  it("should logout and re-login", () => {
    cy.visit("/");
    //log out user
    cy.get(".shop-menu > .nav > :nth-child(4) > a").click();

    // Verify that the user is logged out
    cy.url().should("include", "/login");
    cy.get("body").should("contain", "Login");

    // Re-login
    loginUser();

    // Verify that the user is logged in again
    cy.get(":nth-child(10) > a").should("contain", "Logged in as");
  });
});
