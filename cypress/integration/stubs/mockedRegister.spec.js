/// <reference types="cypress" />

import { getRandomString } from "../../util/randomUtil"

describe('Register page with mocks', () => {

    beforeEach(() => {
        cy.visit('/register')
    })

    it('should register correctly', () => {
        cy.mockSuccessfulRegistration()
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())    
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('.btn-primary').click()
        cy.get('.alert-success').should('have.text', 'Registration successful')      
    })

    const message = getRandomString()

    it(`should show user already exists error ${message}`, () => {
        
        cy.intercept('POST', '**/users/register', {
            statusCode: 400,
            body: {
                message: message
            }, 
        })

        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())    
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('.btn-primary').click()
        cy.get('.alert-danger').should('have.text', message)      
    })

})