// provide account information for the user registration
export default class AccountInfoPage {
  elements = {
    titleMr: () => cy.get("#id_gender1"),
    passwordField: () => cy.get('[data-qa="password"]'),
    daysDropdown: () => cy.get('[data-qa="days"]'),
    monthsDropdown: () => cy.get('[data-qa="months"]'),
    yearsDropdown: () => cy.get('[data-qa="years"]'),
    newsletterCheckbox: () => cy.get("#newsletter"),
    specialOffersCheckbox: () => cy.get("#optin"),
    firstNameField: () => cy.get('[data-qa="first_name"]'),
    lastNameField: () => cy.get('[data-qa="last_name"]'),
    companyField: () => cy.get('[data-qa="company"]'),
    addressField: () => cy.get('[data-qa="address"]'),
    countryDropdown: () => cy.get('[data-qa="country"]'),
    stateField: () => cy.get('[data-qa="state"]'),
    cityField: () => cy.get('[data-qa="city"]'),
    zipcodeField: () => cy.get('[data-qa="zipcode"]'),
    mobileField: () => cy.get('[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('[data-qa="create-account"]'),
  };
  fillFirstName(name) {
    cy.get('[data-qa="first_name"]').type(name);
  }

  fillLastName(name) {
    cy.get('[data-qa="last_name"]').type(name);
  }
  fillAccountInfo(userData) {
    this.elements.titleMr().click();
    this.elements.passwordField().type(userData.password);

    // Date of Birth
    this.elements.daysDropdown().select(userData.dob.day);
    this.elements.monthsDropdown().select(userData.dob.month);
    this.elements.yearsDropdown().select(userData.dob.year);

    // Checkboxes
    this.elements.newsletterCheckbox().click();
    this.elements.specialOffersCheckbox().click();

    // Address Information
    // this.elements.firstNameField().type(userData.firstName);
    // this.elements.lastNameField().type(userData.lastName);

    this.elements.companyField().type(userData.company);
    this.elements.addressField().type(userData.address);

    // Location
    this.elements.countryDropdown().select(userData.country);
    this.elements.stateField().type(userData.state);
    this.elements.cityField().type(userData.city);
    this.elements.zipcodeField().type(userData.zipcode);
    this.elements.mobileField().type(userData.mobile);
  }

  submit() {
    this.elements.createAccountButton().click();
  }
}
