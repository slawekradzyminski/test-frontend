/// <reference types="cypress" />

import LoginPage from "../pages/loginPage"
import RegisterPage from "../pages/registerPage"
import { getRandomString } from "../util/random"

const registerPage = new RegisterPage()
const loginPage = new LoginPage()

describe('register page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('should successfully register', () => {
        registerPage.register(getRandomString(), getRandomString(), getRandomString(), getRandomString())
        loginPage.verifyRegisterSuccessfulAlert()
    })

    it('should fail to register if username already exists', () => {
        registerPage.register('slawenty', getRandomString(), getRandomString(), getRandomString())
        registerPage.verifyUserAlreadyExistsError()
    })

    it('cancel button should navigate back to login page', () => {
        registerPage.clickCancel()
        cy.url().should('contain', 'login')
    })

    it('frontend validation should work', () => {
        registerPage.clickRegister()
        registerPage.verifyFrontendValidation()
    })

  })