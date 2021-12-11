/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Login page', () => {

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()

    beforeEach(() => {
      cy.visit('')
    })
  
    it('should successfully login', () => {
        // given
        cy.register(username, password, firstName, getRandomString())
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', firstName)
    })

    it('should show error message on failed login', () => {
        // given
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-danger').should('contain.text', 'Login failed')
    })

    it('should open register page', () => {
        // when
        cy.get('a.btn-link').click()

        // then
        cy.url().should('contain', 'register')
        cy.get('h2').should('have.text', 'Register')
    })

    it('should validate empty input', () => {
        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Password is required')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })
  
  })
  