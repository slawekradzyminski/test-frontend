/// <reference types="cypress" />

context('With mocks', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    const user = { token: '12345' };
    window.localStorage.setItem('user', JSON.stringify({ user }))
    cy.visit('http://localhost:8080')
  })

  it('should display users', () => {
    cy.intercept('GET', '**/users', { fixture: 'allusers.json' })
    cy.get('ul li').first().contains(`Slawomir Radzyminski`)
  })

})
