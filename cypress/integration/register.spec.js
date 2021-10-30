/// <reference types="cypress" />

describe('Register page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    const getRandomString = () => {
        return Math.random().toString(36).substring(7)
    }

    it('should successfully register', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())    
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('.btn-primary').click()
        cy.get('.alert-success').should('have.text', 'Registration successful')      
    })

    it('frontend validation works', () => {
        cy.viewport(390, 844)
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 4)
        cy.get('input.is-invalid').should('have.length', 4)
    })
  
  })