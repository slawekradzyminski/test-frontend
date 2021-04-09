/// <reference types="cypress" />

import { homePage } from "../pages/homepage"
import { loginPage } from "../pages/loginpage"

context('Login test', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should login', () => {
        loginPage.loginUser('slawenty', 'password')
        homePage.verifyUserNameInfo('Slawomir')
    })
  
    it('should fail to login', () => {
        loginPage.loginUser('slawenty', 'passwordssss')
        loginPage.verifyErrorMessage()
    })
    
  })
  