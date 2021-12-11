/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.login('slawenty', 'password')
    })

    it('should show at least 1 user', () => {
        // then
        cy.get('ul li').should('have.length.at.least', 1)
    })


    it('logout button should work', () => {
        // when
        cy.get('#logout').click()

        // then
        cy.url().should('contain', 'login')
    })


    it('add more button should work', () => {
        // when
        cy.get('#addmore').click()

        // then
        cy.url().should('contain', 'add-user')
        cy.get('h2').should('have.text', 'Add user')
    })

})
