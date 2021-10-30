/// <reference types="cypress" />

import { getRandomString } from '../util/randomUtil'

describe('Login page', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should login correctly', () => {
        const username = getRandomString()
        const password = getRandomString()
        cy.register(username, password, getRandomString(), getRandomString())
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('.col-lg-8 > p').first().should('contain.text', "You're logged in!")
    })

    it('should have correct header', () => {
        cy.get('h2').should('have.text', 'Login')
    })

    it('frontend validation works', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('input.is-invalid').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Password is required')
    })

})
