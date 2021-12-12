/// <reference types="cypress" />

describe('Awesome testing blog tests', () => {

    beforeEach(() => {
        cy.visit('https://www.awesome-testing.com')
    })

    it('should find 4 posts', () => {
        // when
        cy.viewport(1720, 1080)
        cy.get('.gsc-input input').type('Cypress{enter}')

        // then
        cy.get('.post-title').should('have.length', 4)
    })

})
