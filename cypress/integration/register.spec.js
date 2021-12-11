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
  
      it('should validate empty input', () => {
        // when
        cy.get('.btn-primary').click()
    
        // then
        cy.get('.invalid-feedback').should('have.length', 4)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'First Name is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Last Name is required')
        cy.get('.invalid-feedback').eq(2).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(3).should('have.text', 'Password is required')
        cy.get('[name=firstName]').should('have.class', 'is-invalid')
        cy.get('[name=lastName]').should('have.class', 'is-invalid')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
      })
  })