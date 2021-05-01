/// <reference types="cypress" />

context('Register page', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should register', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('.btn-primary').click()
        cy.get('.alert-success').should('have.text', 'Registration successful')
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

})
