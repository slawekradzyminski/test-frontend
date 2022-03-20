/// <reference types="cypress" />

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import { getRandomString } from "../util/random"

const loginPage = new LoginPage()
const homePage = new HomePage()
const registerPage = new RegisterPage()

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('should successfully login', () => {
        // given
        const firstName = getRandomString()
        const username = getRandomString()
        const password = getRandomString()
        const lastName = getRandomString()
        cy.register(username, password, firstName, lastName)

        // when
        loginPage.attemptLogin(username, password)

        // then
        homePage.verifyHeaderContains(firstName)
    })

    it('should fail to login', () => {
        // when
        loginPage.attemptLogin('wrong', 'wrong')

        // then
        loginPage.verifyLoginFailedMessage()
    })

    it('should open register page', () => {
        // when
        loginPage.clickRegister()

        // then
        registerPage.verifyHeader()
        cy.url().should('contain', 'register')
    })

    it('should trigger frontend validation', () => {
        // when
        loginPage.clickLogin()

        // then
        loginPage.verifyValidationErrorDisplayed()
    })

})
