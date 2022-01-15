/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('add user page', () => {
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
        cy.visit('/add-user')
    })

    it('should add new user', () => {
        const firstName = getRandomString()
        const lastName = getRandomString()
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()

        cy.get('.alert').should('contain.text', 'Adding new user successful')
        cy.get('ul li').contains(`${firstName} ${lastName}`).should('be.visible')

    })

})