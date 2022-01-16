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
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type('slawenty')
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()

        cy.get('.alert-danger').should('contain.text', 'User already exists')
    })

    it('cancel button should navigate back to login page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'login')
    })

    it('frontend validation should work', () => {
        cy.get('button').click()
        cy.get('.invalid-feedback').eq(0).should('contain.text', 'First Name is required')        
        cy.get('.invalid-feedback').eq(1).should('contain.text', 'Last Name is required')        
        cy.get('.invalid-feedback').eq(2).should('contain.text', 'Username is required')        
        cy.get('.invalid-feedback').eq(3).should('contain.text', 'Password is required')  
        cy.get('.is-invalid').should('have.length', 4)
    })


  })