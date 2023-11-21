const { defineConfig } = require("cypress");
const cyAwaitPreprocessor = require('cypress-await/src/preprocessor')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    pageLoadTimeout: 100000 ,
    defaultCommandTimeout : 70000 ,
    testIsolation : false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', cyAwaitPreprocessor())
      // implement node event listeners here
    },
  },
});
