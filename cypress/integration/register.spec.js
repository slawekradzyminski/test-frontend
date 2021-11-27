/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/register')
    })
  
    it('should successfully register', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('button').click()
        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
    })

    it('should validate empty inputs', () => {
        cy.get('button').click()

        cy.get('.invalid-feedback').should('have.length', 4)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'First Name is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Last Name is required')
        cy.get('.invalid-feedback').eq(2).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(3).should('have.text', 'Password is required')

        cy.get('.is-invalid').should('have.length', 4)
        cy.get("[name='firstName']").should('have.class', 'is-invalid')
        cy.get("[name='lastName']").should('have.class', 'is-invalid')
        cy.get("[name='username']").should('have.class', 'is-invalid')
        cy.get("[name='password']").should('have.class', 'is-invalid')
    })

  })
  