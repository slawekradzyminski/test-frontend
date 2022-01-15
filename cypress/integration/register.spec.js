/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('register page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('should successfully register', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()

        cy.get('.alert').should('contain.text', 'Registration successful')
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


  })