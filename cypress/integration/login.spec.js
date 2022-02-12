/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () =>  {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.request({
            method: 'POST',
            url: 'http://localhost:4000/users/register',
            body: {
                firstName: firstName,
                username: username,
                password: password,
                lastName: getRandomString()
            }
        }).then(resp => {
            expect(resp.status).to.eq(201)
        })


        cy.get('.form-control').eq(0).type(username)
        cy.get('.form-control').eq(1).type(password)
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', `Hi ${firstName}`)
    })

    it('should fail to login', () => {
        cy.get('.form-control').eq(0).type('wrong')
        cy.get('.form-control').eq(1).type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Login failed - bad username or password')
            .should('have.class', 'alert-danger')
    })

    it('should open register page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'register')
    })
})
