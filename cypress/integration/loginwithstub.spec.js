/// <reference types="cypress" />

import { homePage } from "../pages/homepage"
import { loginPage } from "../pages/loginpage"

context('Login test', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should login', () => {
        const username = 'slawenty'
        const firstname = 'Slawomir'
        const password = 'password'

        cy.intercept('POST', '**/users/authenticate', {
            "id": 3,
            "username": username,
            "firstName": firstname,
            "lastName": "Radzyminski",
            "token": "123456"
        }).as('loginRequest')

        cy.intercept('GET', 'http://localhost:4000/users', { fixture: 'allusers.json' })
        
        loginPage.loginUser(username, password)
        homePage.verifyUserNameInfo(firstname)
        cy.wait('@loginRequest')
            .then(console.log)
            .its('request.body')
            .should('deep.equal', {
                "username": username,
                "password": password
              })
    })
  
    it('should fail to login', () => {
        cy.intercept('POST', '**/users/authenticate', {
             statusCode: 401,
             body: {
                 "message": "Login failed"
             }   
            })

        loginPage.loginUser('slawenty', 'passwordssss')
        loginPage.verifyErrorMessage()
    })

    it('should handle network error', () => {
        cy.simulateNetworkErrorOnLogin()
        loginPage.loginUser('slawenty', 'passwordssss')
        loginPage.verifyErrorMessage()
    })
    
  })