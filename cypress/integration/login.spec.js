/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })
  
    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()

        cy.request({
            method: 'POST',
            url: 'http://localhost:4000/users/register',
            body: {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
        }).then((resp) => {
            expect(resp.status).to.eq(201)
        })

        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('button').click()
        cy.get('h1').should('have.text', `Hi ${firstName}!`)
        cy.get('#app p').first().should('contain.text', 'Congratulations')
    })

    it('should show error failed message', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('button').click()
        cy.get('.alert-danger').should('have.text', 'Login failed - bad username or password')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', '/register')
        cy.get('h2').should('have.text', 'Register')
    })
  
  })
  