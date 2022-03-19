/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/register')
    })

    it('should successfully register', () => {
        const username = getRandomString()
        const password = getRandomString()

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('.alert-success')
            .should('have.text', 'Registration successful')

        cy.login(username, password)
    })

    it('should fail to register', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type('slawenty')
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert-danger')
            .should('have.text', 'User already exists')
    })

    it('should come back to login page', () => {
        cy.get('a').contains('Cancel').click()
        cy.url().should('contain', 'login')
        cy.get('h2').should('have.text', 'Login')
    })

})
