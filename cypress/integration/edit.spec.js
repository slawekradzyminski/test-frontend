/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('edit page', () => {

    const username = getRandomString()
    const password = getRandomString()
    const firstName = getRandomString()
    const lastName = getRandomString()
    let userId;

    afterEach(() => {
        cy.deleteUser(userId)
    })

    beforeEach(() => {
        cy.register(username, password, firstName, lastName).then(returnedId => userId = returnedId)
        cy.login(username, password)
        cy.visit('http://localhost:8080')
        cy.get('ul li').contains(`${firstName} ${lastName}`).find('.edit').click()
    })

    it('should successfully edit an user', () => {
        const newUsername = getRandomString()
        const newPassword = getRandomString()
        const newFirstName = getRandomString()
        const newLastName = getRandomString()
        cy.get('[name=firstName]').clear().type(newFirstName)
        cy.get('[name=lastName]').clear().type(newLastName)
        cy.get('[name=username]').clear().type(newUsername)
        cy.get('[name=password]').clear().type(newPassword)
        cy.get('.btn-primary').click()

        cy.get('ul li').contains(`${firstName} ${lastName}`).should('not.exist')
        cy.get('ul li').contains(`${newFirstName} ${newLastName}`).should('be.visible')
        cy.login(newUsername, newPassword)
    });

    it('should verify that user data was correctly autofilled', () => {
        cy.get('[name=firstName]').should('contain.value', firstName)
        cy.get('[name=lastName]').should('contain.value', lastName)
        cy.get('[name=username]').should('contain.value', username)
        cy.get('[name=password]').should('contain.value', password)
    });

})
