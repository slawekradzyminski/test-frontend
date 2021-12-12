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
        const username = getRandomString()
        const password = getRandomString()

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('h1').should('contain.text', firstName)
        cy.wait('@loginRequest').its('request.body')
            .should('deep.equal', { username, password })
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

    it('should correctly handle server error', () => {
        // given
        cy.intercept('POST', '**/users/authenticate', { statusCode: 500 })
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')

        // when
        cy.get('.btn-primary').click()

        // then (we should ask PM/PO/BA what should have happened)
    })

    it('should correctly handle network error', () => {
        // given
        cy.intercept('POST', '**/users/authenticate', { forceNetworkError: true })
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')

        // when
        cy.get('.btn-primary').click()

        // then (we should ask PM/PO/BA what should have happened)
    })

})
