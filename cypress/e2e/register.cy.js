// import { faker } from "@faker-js/faker";
// import LoginPage from "../support/register";

// describe("Signup with fakerJs data", () => {
//   it("successfully sign in with dynamically generated data and verifies logout", () => {
//     const fullName = faker.person.fullName();
//     const email = faker.internet.email();

//     const loginPage = new LoginPage();
//     loginPage.visit();
//     loginPage.fillUsername(fullName);
//     loginPage.fillEmail(email);
//     loginPage.submit();

//     cy.url().should("include", "/");
//     cy.get(".clearfix");
//   });
// });

// cypress/e2e/register.cy.js
import { faker } from "@faker-js/faker";
import LoginPage from "../support/register";
import AccountInfoPage from "../support/account_info";

describe("Complete Registration Flow", () => {
  it("successfully registers user with all details", () => {
    // Generate test data
    // Generate FIRST/LAST names FIRST
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const userData = {
      // firstName: faker.person.firstName(),
      // lastName: faker.person.lastName(),
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
      dob: {
        day: faker.number.int({ min: 1, max: 28 }).toString(),
        month: faker.date.month(),
        year: faker.number.int({ min: 1900, max: 2000 }).toString(),
      },

      company: faker.company.name(),
      address: faker.location.streetAddress(),
      country: "United States",
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobile: faker.phone.number(),
    };

    // const fullName = `${userData.firstName} ${userData.lastName}`;

    const loginPage = new LoginPage();
    const accountPage = new AccountInfoPage();

    // Initial registration
    loginPage.visit();
    loginPage.fillUsername(userData.fullName);
    loginPage.fillEmail(userData.email);
    loginPage.submit();

    // Handle email exists error
    cy.get("body").then(($body) => {
      if ($body.text().includes("Email Address already exist!")) {
        userData.email = faker.internet.email();
        loginPage.fillEmail(userData.email);
        loginPage.submit();
      }
    });

    // Fill account details
    accountPage.fillFirstName(firstName); // Use individual names
    accountPage.fillLastName(lastName);
    accountPage.fillAccountInfo(userData);
    accountPage.submit();

    // Verify account creation
    cy.url().should("include", "/account_created");
    cy.contains("Account Created!").should("be.visible");
    cy.contains("Continue").click();

    // Verify logged in state
    cy.get(":nth-child(10) > a")
      .contains(`Logged in as ${userData.fullName}`)
      .should("be.visible"); //needed to resolve userData.fullName is undefined in your assertion issue

    // Store session cookies after successful registration
    cy.getCookies().then((cookies) => {
      cy.writeFile("cypress/fixtures/sessionCookies.json", cookies);
    });
  });
});
