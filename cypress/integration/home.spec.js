/// <reference types="cypress" />

describe('home page', () => {
    beforeEach(() => {
        cy.login('slawenty', 'password')
        cy.visit('http://localhost:8080')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should log user out', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
        cy.get('h2').should('have.text', 'Login')
    })

    it('add more users', () => {
        cy.get('#addmore').click();
        cy.url().should("contain", 'add-user');
    });

    it('add should delete all users except Slawomir Radzyminski', () => {
       cy.get('ul li').each($element => {
           if (!$element.text().includes('Slawomir Radzyminski')) {
               cy.wrap($element).find('.delete').click()
           }
       })

       cy.get('ul li').should('have.length', 1)
    });

})
