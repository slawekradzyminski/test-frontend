/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.visit('')
    })

    it('should display at least 1 user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()

        cy.url().should('contain', 'login')
        cy.get('h2').should('have.text', 'Login')
    })

    it('should redirect to add user page', () => {
        cy.get('#addmore').click()

        cy.url().should('contain', 'add-user')
        cy.get('h2').should('have.text', 'Add user')
    })


    it('should edit an user', () => {
        cy.get('ul li').contains('Slawomir').find('.edit').click()
        cy.get('h2').should('have.text', 'Edit user')
    })

    it('should delete all users except Slawomir', () => {
        cy.get('ul li').each($el => {
            if (!$el.text().includes('Slawomir')) {
                cy.wrap($el).find('.delete').click()
            }
        })
    })

    it('should display correct text in window alert', () => {
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Are you sure you wish to delete this item?')
            return false
          })
        cy.get('.delete').last().click()
    })

})
