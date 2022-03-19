/// <reference types="cypress" />

describe('home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
        cy.login('slawenty', 'password')
    })

    it('should display at least one user', () => { 
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should log user out', () => {
        cy.get('#logout').click()    
        cy.url().should('contain', 'login')
        cy.get('h2').should('have.text', 'Login')
    })

    
})
