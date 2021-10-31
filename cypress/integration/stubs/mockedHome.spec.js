/// <reference types="cypress" />

import { homePage } from "../../pages/homePage"

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
  
  })