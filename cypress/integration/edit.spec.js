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

    it('should correctly edit user', () => {
        const newFirstName = getRandomString()
        const newLastName = getRandomString()
        const newUsername = getRandomString()
        const newPassword = getRandomString()

        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=username]').clear().type(newUsername)
        cy.get('[name=password]').clear().type(newPassword)
        cy.get('button').click()

        cy.get('ul li').contains(`${firstName} ${lastName}`).should('not.exist')
        cy.get('ul li').contains(`${newFirstName} ${newLastName}`).should('be.visible')

        cy.request(`http://localhost:4000/users/${userId}`)
            .then(resp => {
                cy.wrap(resp.body.firstName).should('eq', newFirstName)
                cy.wrap(resp.body.lastName).should('eq', newLastName)
                cy.wrap(resp.body.username).should('eq', newUsername)
                cy.wrap(resp.body.password).should('eq', newPassword)
            })
    })


})