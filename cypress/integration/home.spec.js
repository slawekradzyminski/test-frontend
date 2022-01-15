/// <reference types="cypress" />

describe('home page', () => {
    beforeEach(() => {
        cy.login('slawenty', 'password')
        cy.visit('')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')    
    })

    it('should navigate to adduser', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })

})