/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Register page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('should successfully register', () => {
      // given
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
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type('slawenty')
        cy.get('[name=password]').type(getRandomString())
        // when
        cy.get('.btn-primary').click()
        // then
        cy.get('.alert-danger').should('have.text', 'User already exists')
      })
  
  })