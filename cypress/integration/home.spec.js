/// <reference types="cypress" />

describe('login page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
  
    it('should successfully login', () => {
        cy.get('.form-group input').eq(0).type('slawenty')
        cy.get('.form-group input').eq(1).type('password')
        cy.get('button').click()
        cy.get('h1').should('contain.text', 'Hi Slawomir')
    })

    it('should show error message on failed login', () => {
        cy.get('.form-group input').eq(0).type('slawenty')
        cy.get('.form-group input').eq(1).type('passwo')
        cy.get('button').click()
        cy.get('.alert').should('contain.text', 'Login failed - bad username or password')        
    })
  
  })