/// <reference types="cypress" />

describe('home page cleanup', () => {
    beforeEach(() => {
        cy.login('slawenty', 'password')
        cy.visit('')
    })

    it('should should delete all users except Slawek', () => {
        cy.get('ul li').each($element => {
            if (!$element.text().includes('Slawomir Radzyminski')) {
                cy.wrap($element).find('.delete').click()
            }
        })
    })

})