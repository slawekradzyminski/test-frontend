/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('login page', () => {
    beforeEach(() => {
      cy.visit('')
    })
  
    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()

        cy.register(username, password, firstName, lastName)

        cy.get('.form-group').within(() => {
            cy.get('input').eq(0).type(username)
            cy.get('input').eq(1).type(password)
            cy.get('button').click()
        })

        cy.get('h1').should('contain.text', `Hi ${firstName}`)
    })

    it('should show error message on failed login', () => {
        cy.get('.form-group input').eq(0).type('slawenty')
        cy.get('.form-group input').eq(1).type('passwo')
        cy.get('.form-group button').click()
        cy.get('.alert').should('contain.text', 'Login failed - bad username or password')        
    })

    it('register button should navigate to register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'register')
    })

    it('frontend validation should work', () => {
        cy.get('.form-group button').click()
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Password is required')
        cy.get('.form-group input').eq(0).should('have.class', 'is-invalid')
        cy.get('.form-group input').eq(1).should('have.class', 'is-invalid')
    })
  
  })