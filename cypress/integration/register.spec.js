/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .should('not.have.class', 'alert-danger')
    })

    it('should fail to register', () => {
        cy.get('[name=username]').type(Cypress.env('username'))
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'User already exists')
            .should('have.class', 'alert-danger')
    })

    it('should redirect back to login page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'login')
    })
})
