/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Edit page', () => {

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    let userId

    beforeEach(() => {
        cy.register(username, password, firstName, lastName)
            .then(id => userId = id)
        cy.login(username, password)
    })

    afterEach(() => {
        cy.deleteUser(userId)
    })

    it('should edit user', () => {
        // given
        const newFirstName = getRandomString()
        const newLastName = getRandomString()
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('ul li').contains(`${newFirstName} ${newLastName}`).should('be.visible')
        cy.get('ul li').contains(`${firstName} ${lastName}`).should('not.exist')
    })

    it('should fill in correct data', () => {
        // when
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()

        // then
        cy.get('[name=firstName]').should('have.value', firstName)
        cy.get('[name=lastName]').should('have.value', lastName)
        cy.get('[name=username]').should('have.value', username)
        cy.get('[name=password]').should('have.value', password)
        cy.get('[name=password]').should('have.attr', 'type', 'password')
    })

})
