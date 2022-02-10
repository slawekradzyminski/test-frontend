/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })

    it('should successfully login', () => {
        cy.get('.form-control').eq(0).type('slawenty')
        cy.get('.form-control').eq(1).type('password')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Hi Slawomir')
    })
})
