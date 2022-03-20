/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import { getRandomString } from "../util/random"

const registerPage = new RegisterPage()
const loginPage = new LoginPage()

describe('register page', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        const username = getRandomString()
        const password = getRandomString()

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('.alert-success')
            .should('have.text', 'Registration successful')

        cy.login(username, password)
    })

    it('should fail to register', () => {
        const username = getRandomString()
        cy.register(username, getRandomString(), getRandomString(), getRandomString())

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert-danger')
            .should('have.text', 'User already exists')
    })

    it('should come back to login page', () => {
        // when
        registerPage.clickCancel()

        // then
        loginPage.verifyHeader('Login')
        cy.url().should('contain', 'login')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 4)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'First Name is required')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Last Name is required')
        cy.get('.invalid-feedback').eq(2).should('have.text', 'Username is required')
        cy.get('.invalid-feedback').eq(3).should('have.text', 'Password is required')
        cy.get("input[name='firstName']").should('have.class', 'is-invalid')
        cy.get("input[name='lastName']").should('have.class', 'is-invalid')
        cy.get("input[name='username']").should('have.class', 'is-invalid')
        cy.get("input[name='password']").should('have.class', 'is-invalid')
    })

})
