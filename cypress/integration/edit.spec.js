/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('home page', () => {
    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()

    let userId

    afterEach(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.register(username, password, firstName, lastName)
            .then(returnedId => userId = returnedId)
        cy.login(username, password)
        cy.visit('')
    })

    it('should correctly autofill user data', () => {
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()
        cy.get('[name=firstName]').should('have.value', firstName)
        cy.get('[name=lastName]').should('have.value', lastName)
        cy.get('[name=username]').should('have.value', username)
        cy.get('[name=password]').should('have.value', password)
    })


})