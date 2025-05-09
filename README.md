# Intuji-QA-Associate-Challenge

## Project Overview

This project is an automated end-to-end test suite for [https://automationexercise.com](https://automationexercise.com) using Cypress as part of Intuji QA Associate Challenge. It covers user registration, product filtering, cart management, checkout, and session validation, following best practices such as the Page Object Model (POM), fixtures, and reusable custom commands.

---

## Setup Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/pradhangagan/Intuji-QA-Associate-Challenge.git
   cd Intuji-QA-Associate-Challenge
   ```

2. **Install dependencies**

   ```sh
   npm install cypress
   ```

3. **Verify Cypress is installed**
   ```sh
   npx cypress --version
   ```

---

## How to Run Tests

### Open Cypress Test Runner (GUI)

```sh
npx cypress open
```

- Select a test file from the Cypress UI to run interactively.

### Run All Tests in Headless Mode

```sh
npx cypress run
```

- This will execute all test specs in the `cypress/e2e/` directory.

---

## Tools / Plugins Used

- **Cypress**: Main end-to-end testing framework.
- **@faker-js/faker**: For generating random user data during registration.

---

## Known Limitations

- **Visual Testing**: No visual regression/screenshot comparison is implemented.
- **Negative Scenarios**: The suite focuses on positive flows. Negative/edge case tests (e.g., invalid login, empty cart checkout) are needs to be added.
- **Hardcoded Selectors**: Some selectors (e.g., `:nth-child(10) > a`) may be brittle if the UI changes.

## Directory Structure

```
cypress/
  e2e/         # Test specs for each scenario
  fixtures/    # Test data (user, session cookies)
  page/        # Page Object Model classes
  support/     # Custom commands and Cypress support files
```

---
