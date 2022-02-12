/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Register page', () => {
    let id

    beforeEach(() => {
        cy.visit('/register')
    })

    afterEach(() => {
        if (typeof (id) !== 'undefined') {
            cy.deleteUser(id)
        }
    })

    it('should successfully register', () => {
        const username = getRandomString()
        cy.get('[name=username]').type(username)
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .should('not.have.class', 'alert-danger')

        cy.request('http://localhost:4000/users').then(resp => {
            id = resp.body.find(entry => entry.username === username).id;
        })
    })

    it('should fail to register', () => {
        const username = getRandomString()
        cy.register(username, getRandomString(), getRandomString(), getRandomString())
            .then(returnedId => id = returnedId)

        cy.get('[name=username]').type(username)
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'User already exists')
            .should('have.class', 'alert-danger')
    })

    it('should redirect back to login page', () => {
        cy.get('.btn-link').click()
        cy.url().should('contain', 'login')
    })

    it('should not be able to register without username', () => {
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback')
            .should('have.text', 'Username is required')
        cy.get('[name=username]').should('have.class', 'is-invalid')
    })

    it('should not be able to register without first name', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback')
            .should('have.text', 'First Name is required')
        cy.get('[name=firstName]').should('have.class', 'is-invalid')
    })

    it('should not be able to register without last name', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback')
            .should('have.text', 'Last Name is required')
        cy.get('[name=lastName]').should('have.class', 'is-invalid')
    })

    it('should not be able to register without password', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.invalid-feedback')
            .should('have.text', 'Password is required')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })

})
