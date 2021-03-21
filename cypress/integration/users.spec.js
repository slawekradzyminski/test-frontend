/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    cy.setLocalStorage("cookies-accepted", "true")
    cy.reload()
  })

  it('should login', () => {
    cy.get('ul li').last().contains(`${randomFirstName} ${randomLastName}`)
  })

})
