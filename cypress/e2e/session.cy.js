describe("Reusing Session for Tests", () => {
  beforeEach(() => {
    cy.restoreSession();
  });

  it("should verify the user is still logged in", () => {
    cy.visit("/");
    cy.get(":nth-child(10) > a").should("contain", "Logged in as");
  });

  it("should perform another test with the restored session", () => {
    cy.visit("/some-protected-page");
    // Add assertions or actions for the test
  });
});
