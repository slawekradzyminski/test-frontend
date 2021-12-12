/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('Mocked register page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('should successfully register', () => {
      // given
      cy.mockSuccessfulRegister()
      cy.get('[name=firstName]').type(getRandomString())
      cy.get('[name=lastName]').type(getRandomString())
      cy.get('[name=username]').type(getRandomString())
      cy.get('[name=password]').type(getRandomString())
      // when
      cy.get('.btn-primary').click()
      // then
      cy.get('.alert-success').should('have.text', 'Registration successful')
    })

    it('should show user already exists error message', () => {
        // given
        cy.mockFailedRegister()
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        // when
        cy.get('.btn-primary').click()
        // then
        cy.get('.alert-danger').should('have.text', 'User already exists')
      })

      it('should show loading indicator', () => {
        // given
        cy.intercept('POST', '**/users/register', { delay: 3000 })
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        // when
        cy.get('.btn-primary').click()
        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
      })
  
  })