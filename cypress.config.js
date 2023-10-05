const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 70000 ,
    defaultCommandTimeout : 50000 ,
    testIsolation : false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
