/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/register')
    })

    it('should successfully register', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert-success')
            .should('have.text', 'Registration successful')
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

    it.only('should come back to login page', () => {
        cy.get('a').contains('Cancel').click()
        cy.url().should('contain', 'login')
        cy.get('h2').should('have.text', 'Login')
    })

})
