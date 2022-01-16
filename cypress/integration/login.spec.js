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
        cy.get('.form-group input').eq(0).type('slawenty')
        cy.get('.form-group input').eq(1).type('passwo')
        cy.get('.form-group button').click()
        cy.get('.alert').should('contain.text', 'Login failed - bad username or password')        
    })

    it('register button should navigate to register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'register')
    })

    it('frontend validation should work', () => {
        cy.get('.form-group button').click()
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Password is required')
        cy.get('.form-group input').eq(0).should('have.class', 'is-invalid')
        cy.get('.form-group input').eq(1).should('have.class', 'is-invalid')
    })
  
  })