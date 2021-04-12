/// <reference types="cypress" />

context('Login tests', () => {

    beforeEach(() => {
      cy.visit('/login')
    })

    it('Login page should be displayed', () => {
      cy.get('h2').contains('Login')
    })

    it('Login should work', () => {
      cy.get('[name=username]').type('slawenty')
      cy.get('[name=password]').type('password')
      cy.get('.btn-primary').click()
      cy.get('h1').contains('Hi')
    })

    it('Should show error message if login failed', () => {
      cy.get('[name=username]').type('slawenty')
      cy.get('[name=password]').type('wrongPassword')
      cy.get('.btn-primary').click()
      cy.get('.alert-danger').should('exist')
    })

    it('Login page should be displayed', () => {
       cy.get('.btn-link').click()
       cy.url().should('include', '/register')
       cy.get('h2').contains('Register')
    })
  
    it('login should not work - empty fields validation', () => {
        cy.get('.btn-primary').click()
        cy.get(".form-group").first().find('.invalid-feedback').contains('Username is required')
        cy.get(".form-group").eq(1).find('.invalid-feedback').contains('Password is required')
        cy.get(".invalid-feedback").should('have.length', 2)

        cy.get("[name=username]").should('have.class', 'is-invalid')
        cy.get("[name=password]").should('have.class', 'is-invalid')
    })

  })
  