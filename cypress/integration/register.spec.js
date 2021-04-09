/// <reference types="cypress" />

import { loginPage } from "../pages/loginpage"
import { registerPage } from "../pages/registerPage"

context('Register test', () => {
    beforeEach(() => {
      cy.visit('/register')
    })

    it('should register', () => {
        const randomFirstName = getRandomString()
        const randomLastName = getRandomString()
        const randomUserName = getRandomString()
        const password = 'password'

        registerPage.register(randomFirstName, randomLastName, randomUserName, password)
        loginPage.verifyRegistrationSuccessful()
    })
  
    function getRandomString() {
        return Math.random().toString(36).substring(7)
      }

  })
  