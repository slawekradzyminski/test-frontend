/// <reference types="cypress" />

describe('Awesome Testing', () => {

    beforeEach(() => {
        cy.visit('https://www.awesome-testing.com')
        cy.setCookie('displayCookieNotice', 'y')
        cy.reload()
        cy.get('#cookieChoiceInfo').should('not.exist')
    })

    it('should find 4 posts about Cypress', () => {
        cy.get('.gsc-input input').type('Cypress')
        cy.get('.gsc-search-button input').click()
        cy.get('h1').should('have.length', 4)
    })

})
