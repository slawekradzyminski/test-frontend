/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('should successfully login', () => {
        const firstName = getRandomString()
        const username = getRandomString()
        const password = getRandomString()
        const lastName = getRandomString()

        cy.register(username, password, firstName, lastName)

        cy.get("input[name='username']").type(username)
        cy.get("input[name='password']").type(password)
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', firstName)
    })

    it('should fail to login', () => {
        cy.get("input[name='username']").type('wrong')
        cy.get("input[name='password']").type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Login failed - bad username or password')
            .should('have.class', 'alert-danger')
    })

    it('should open register page', () => {
        cy.get('a').contains('Register').click()
        cy.url().should('contain', 'register')
        cy.get('h2').should('have.text', 'Register')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Password is required')
        cy.get("input[name='username']").should('have.class', 'is-invalid')
        cy.get("input[name='password']").should('have.class', 'is-invalid')
    })

})
