/// <reference types="cypress" />

context('Register tests', () => {

    beforeEach(() => {
      cy.visit('/register')
    })

    it('Should register', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.url().should('include', 'login')
        cy.get('.alert').should('have.text', 'Registration successful')
    })
  
    it('register should not work - empty fields validation', () => {
        cy.get('.btn-primary').click()
        cy.get(".form-group").first().find('.invalid-feedback').contains('First Name is required')
        cy.get(".form-group").eq(1).find('.invalid-feedback').contains('Last Name is required')
        cy.get(".form-group").eq(2).find('.invalid-feedback').contains('Username is required')
        cy.get(".form-group").eq(3).find('.invalid-feedback').contains('Password is required')
        cy.get(".invalid-feedback").should('have.length', 4)

        cy.get("[name=firstName]").should('have.class', 'is-invalid')
        cy.get("[name=lastName]").should('have.class', 'is-invalid')
        cy.get("[name=username]").should('have.class', 'is-invalid')
        cy.get("[name=password]").should('have.class', 'is-invalid')
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

  })
  