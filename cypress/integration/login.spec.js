/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        cy.get('.form-control').eq(0).type(Cypress.env('username'))
        cy.get('.form-control').eq(1).type(Cypress.env('password'))
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Hi Slawomir')
    })

    it('should fail to login', () => {
        cy.get('.form-control').eq(0).type('wrong')
        cy.get('.form-control').eq(1).type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Login failed - bad username or password')
            .should('have.class', 'alert-danger')
    })
})
