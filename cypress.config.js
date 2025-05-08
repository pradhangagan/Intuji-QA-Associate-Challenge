const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8atufg',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://automationexercise.com/",
    experimentalStudio: true,
  },
});
