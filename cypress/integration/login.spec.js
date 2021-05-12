/// <reference types="cypress" />

import {loginPage, loginPageCss} from "../pages/loginPage";

context('Login', () => {

    const getRandomString = () => {
        return Math.random().toString(36).substring(7)
    }

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    let userId

    beforeEach(() => {
        cy.visit('/')
        cy.register(username, password, firstName, lastName).then((id) => {
            userId = id
        })
    })

    it('should work', () => {
        loginPage.login(username, password)
        cy.get('h1').should('have.text', `Hi ${firstName}!`)
        cy.get('h1').contains('Hi')
    })

    afterEach(() => {
        cy.deleteUser(userId)
    })

})
