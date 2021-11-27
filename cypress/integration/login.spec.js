/// <reference types="cypress" />

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })
  
    it('should successfully login', () => {
        cy.get('[name=username]').type('slawenty')
        cy.get('[name=password]').type('password')
        cy.get('button').click()
        cy.get('h1').should('have.text', 'Hi Slawomir!')
        cy.get('#app p').first().should('contain.text', 'Congratulations')
    })

    it('should show error failed message', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('button').click()
        cy.get('.alert-danger').should('have.text', 'Login failed - bad username or password')
    })
  
  })
  