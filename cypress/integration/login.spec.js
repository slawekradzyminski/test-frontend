/// <reference types="cypress" />

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import { getRandomString } from "../util/random"

const loginPage = new LoginPage()
const homePage = new HomePage()

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () =>  {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()
        cy.register(username, password, firstName, getRandomString())

        loginPage.attemptLogin(username, password)
        homePage.verifyWelcomeMessage(firstName)
    })

    it('should fail to login', () => {
        loginPage.attemptLogin('wrong', 'wrong')
        loginPage.verifyLoginError();
    })

    it('should open register page', () => {
        loginPage.clickRegister()
        cy.url().should('contain', 'register')
    })
})
