/// <reference types="cypress" />

import HomePage from "../pages/homePage"
import LoginPage from "../pages/loginPage"
import { getRandomString } from "../util/random"

const loginPage = new LoginPage()
const homePage = new HomePage()

describe('login page',{
    env: {
      mobile: true,
    },
  }, () => {
    beforeEach(() => {
      cy.visit('')
      if (Cypress.env('mobile')) {
        cy.viewport('iphone-8')
      }
    })
  
    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()

        cy.register(username, password, firstName, lastName)
        loginPage.login(username, password)
        homePage.verifyHeader(firstName)
    })

    it('should show error message on failed login', () => {
        loginPage.login('wrong', 'wrong')
        loginPage.verifyErrorMessage()
    })

    it('register button should navigate to register page', () => {
        loginPage.clickRegister()
        cy.url().should('contain', 'register')
    })

    it('frontend validation should work', () => {
        loginPage.clickLogin()
        loginPage.verifyFrontendValidation()
    })
  
  })