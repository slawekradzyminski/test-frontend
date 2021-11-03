/// <reference types="cypress" />

import { homePage } from "../../pages/homePage"

const userResponse = require('../../fixtures/getAllUsers.json')

describe('Home page tests with mocks', () => {
    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('**/users', { fixture: 'getAllUsers.json' })
        cy.visit('/')
    })

    it('should display users', () => {
        // then
        homePage.verifyNumberOfUsers(2)
    })

    it('should logout', () => {
        // when
        homePage.clickLogout()

        // then
        cy.url().should('include', '/login')
    })

    it('should go to add user', () => {
        // when
        homePage.clickAddMoreUsers()

        // then
        cy.url().should('include', '/add-user')
    })

    it('should delete first user', () => {
        // given
        cy.intercept('DELETE', `**/users/${userResponse[0].id}`, {
            statusCode: 204
        }).as('deleteRequest')

        // when
        homePage.deleteUserByIndex(0)

        // then
        cy.wait('@deleteRequest')
    })

})