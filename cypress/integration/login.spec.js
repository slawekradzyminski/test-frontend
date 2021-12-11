/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
  
    it('should successfully login', () => {
        cy.get('[name=username]').type('slawenty')
        cy.get('[name=password]').type('password')
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', 'Slawomir')
    })
  
  })
  