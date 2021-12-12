/// <reference types="cypress" />

import { homePage } from "../pages/homePage"
import { loginPage } from "../pages/loginPage"
import { registerPage } from "../pages/registerPage"
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

        // when
        loginPage.attemptLogin(username, password)

        // then
        homePage.verifyWelcomeMessageContains(firstName)
    })

    it('should show error message on failed login', () => {
        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        loginPage.verifyErrorMessageWasDisplayed()
    })

    it('should open register page', () => {
        // when
        loginPage.clickRegister()

        // then
        cy.url().should('contain', 'register')
        registerPage.verifyHeaderDisplayed()
    })

    it('should validate empty input', () => {
        // when
        loginPage.clickLogin()

        // then
        loginPage.assertThatEmptyInputValidationWasDisplayed()
    })
  
  })
  