/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  require('@shelex/cypress-allure-plugin/writer')(on, config)
  return config
}
