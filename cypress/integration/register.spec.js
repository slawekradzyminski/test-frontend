/// <reference types="cypress" />

import { loginPage } from "../pages/loginpage"
import { registerPage } from "../pages/registerpage"

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should register', () => {
    const randomFirstName = getRandomString()
    const randomLastName = getRandomString()
    const randomUsername = getRandomString()
    const password = 'password'

    loginPage.clickRegister()
    registerPage.registerUser(randomFirstName, randomLastName, randomUsername, password) 
    loginPage.verifyRegistrationSuccessfulAlert()
    loginPage.loginUser(randomUsername, password) 

    cy.get('ul li').last().contains(`${randomFirstName} ${randomLastName}`)
  })


  function getRandomString() {
    return Math.random().toString(36).substring(7)
  }

})
