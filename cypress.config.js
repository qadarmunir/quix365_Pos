const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 100000 ,
    defaultCommandTimeout : 70000 ,
    testIsolation : false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
