/// <reference types="cypress" />

import {getRandomString} from "../util/random";

describe('Home page', () => {
    const username = getRandomString()
    const password = getRandomString()
    let userId

    before(() => {
        cy.register(username, password, getRandomString(), getRandomString()).then((id) => {
            userId = id
        })
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.login(username, password)
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('logout should work', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

})