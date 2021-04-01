/// <reference types="cypress" />

import { loginPage } from "../pages/loginpage"
import { registerPage } from "../pages/registerpage"

context('With mocks', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should register', () => {
    const randomFirstName = getRandomString()
    const randomLastName = getRandomString()
    const randomUsername = getRandomString()
    const password = 'password'

    loginPage.clickRegister()
    cy.intercept('POST', '**/users/register',{ fixture: 'registerconfirmation.json' }).as('register')
    registerPage.registerUser(randomFirstName, randomLastName, randomUsername, password) 
    loginPage.verifyRegistrationSuccessfulAlert()

    cy.wait('@register')
      .its('request.body.password')
      .should('equal', 'password')
    })

  it('should login', () => {
    const randomFirstName = getRandomString()
    const randomLastName = getRandomString()
    const randomUsername = getRandomString()
    const password = 'password'

    cy.intercept('POST', '**/users/authenticate', {
      body: {
        "id": 3,
        "username": randomUsername,
        "firstName": randomFirstName,
        "lastName": randomLastName,
        "token": "123456"
          }
    })
    loginPage.loginUser(randomUsername, password) 

    cy.get('h1').contains(`${randomFirstName}`)
  })

  function getRandomString() {
    return Math.random().toString(36).substring(7)
  }

})
