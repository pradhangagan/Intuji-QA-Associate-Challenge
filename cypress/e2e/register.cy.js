//Sign up using faker.js  for registration
import { faker } from "@faker-js/faker";
import AccountInfoPage from "../page/account_info";
import SignupPage from "../page/register";

describe("Complete Initial Registration Flow", () => {
  it("successfully registers user with all details", () => {
    // Generate FIRST/LAST names FIRST
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const userData = {
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

    const loginPage = new SignupPage();
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

//restore session and set cookies for further tests
describe("Restoring Session", () => {
  beforeEach(() => {
    cy.restoreSession();
  });

  it("should verify the user is still logged in after restoring session", () => {
    cy.visit("/");
    cy.get(":nth-child(10) > a").should("contain", "Logged in as");
  });
});
