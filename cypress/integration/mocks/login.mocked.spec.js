/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('Mocked login page', () => {

    const firstName = getRandomString()

    beforeEach(() => {
      cy.visit('')
    })
  
    it('should successfully login', () => {
        // given
        cy.mockSuccessfulLogin(firstName)
        
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', firstName)
    })

    it('should show error message on failed login', () => {
        // given
        const errorMessage = 'Login failed - bad username or password'
        cy.mockFailedLogin()
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-danger').should('have.text', errorMessage)
    })

    it('should show spinner while waiting for response', () => {
        // given
        cy.intercept('POST', '**/users/authenticate', { delay: 3000 })
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })
  
  })
  