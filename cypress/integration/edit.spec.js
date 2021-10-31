/// <reference types="cypress" />

import { getRandomString } from '../util/randomUtil'

describe('Edit user', () => {
    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    let userId

    before(() => {
        cy.register(username, password, firstName, lastName).then((id) => {
            userId = id
        })
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.login(username, password)
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