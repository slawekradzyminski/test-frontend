/// <reference types="cypress" />

const getRandomString = () => {
    return Math.random().toString(36).substring(7)
}

describe('Edit user', () => {
    const firstName = getRandomString()
    const lastName = getRandomString()

    beforeEach(() => {
        cy.login('slawenty', 'password')
        cy.visit('/')
    })
  
    it('should work', () => {
        cy.get('ul li').first().should('not.contain.text', `${firstName} ${lastName}`)
        cy.get('.edit').first().click()
        cy.get('[name=firstName]').clear().type(firstName)
        cy.get('[name=lastName').clear().type(lastName)
        cy.get('.btn-primary').click()
        cy.get('.alert-success').should('have.text', 'Updating user successful')
        cy.get('ul li').first().should('contain.text', `${firstName} ${lastName}`)
    })

    it('frontend validation should work', () => {
        cy.get('.edit').first().click()
        cy.get('input').clear()
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 4)
        cy.get('input.is-invalid').should('have.length', 4)
    })
  
  })