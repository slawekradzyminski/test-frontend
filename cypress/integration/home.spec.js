/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('home page', () => {
    const username = getRandomString()
    const password = getRandomString()

    let userId

    before(() => {
        cy.register(username, password, getRandomString(), getRandomString())
            .then(returnedId => userId = returnedId)
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should navigate to adduser', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', 'add-user')
    })

})