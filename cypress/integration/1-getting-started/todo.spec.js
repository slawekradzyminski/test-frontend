/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2)
    cy.get('.todo-list li').eq(0).should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').eq(1).should('have.text', 'Walk the dog')
  })

})
