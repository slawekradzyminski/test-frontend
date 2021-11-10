/// <reference types="cypress" />

import {getRandomString} from "../util/random";

describe('Edit page', () => {
    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()

    let userId

    before(() => {
        cy.register(username, password, firstName, lastName).then((id) => {
            userId = id
        })
    })

    after(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.login(username, password)
        cy.visit('/')
    })

    it('should correctly populate data', () => {
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click();        cy.get('[name=username]').should('have.value', username)
        cy.get('[name=password]').should('have.value', password)
        cy.get('[name=firstName]').should('have.value', firstName)
        cy.get('[name=lastName]').should('have.value', lastName)
    })

})