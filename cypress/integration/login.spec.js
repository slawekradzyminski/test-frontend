/// <reference types="cypress" />

import {loginPage, loginPageCss} from "../pages/loginpage";

context('Login page', () => {

    const firstName = getRandomString()
    const lastName = getRandomString()
    const username = getRandomString()
    const password = getRandomString()

    let id

    beforeEach(() => {
        cy.visit('/')
    })

    before(() => {
        cy.register(firstName, lastName, username, password).then((userId) => {
            id = userId
        })
    })

    after(() => {
        cy.deleteUser(id)
    })

    it('should login', () => {
        loginPage.login(username, password)
        cy.get('h1').should('have.text', `Hi ${firstName}!`).as('Krzysztof')
    })

    it('Should show error message if login failed', () => {
        loginPage.login(username, 'wrongPassword')
        cy.get('.alert-danger').should('exist')
    })

    it('Register page should be displayed', () => {
        cy.get('.btn-link').click()
        cy.url().should('include', '/register')
        cy.get('h2').contains('Register')
    })

    it('login should not work - empty fields validation', () => {
        cy.get('.btn-primary').click()
        cy.get(".form-group").first().find('.invalid-feedback').contains('Username is required')
        cy.get(".form-group").eq(1).find('.invalid-feedback').contains('Password is required')
        cy.get(".invalid-feedback").should('have.length', 2)

        cy.get("[name=username]").should('have.class', 'is-invalid')
        cy.get("[name=password]").should('have.class', 'is-invalid')
    })

    function getRandomString() {
        return Math.random().toString(36).substring(7)
    }

})
