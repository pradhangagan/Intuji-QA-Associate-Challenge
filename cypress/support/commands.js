//  restore a session by reading cookies from a JSON file and setting them in the browser.
//  cy.restoreSession();

Cypress.Commands.add("restoreSession", () => {
  cy.readFile("cypress/fixtures/sessionCookies.json").then((cookies) => {
    cookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
      });
    });
  });
});
